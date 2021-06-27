<template>
  <div>
    <modal
      :key="showModal"
      v-model="showModal"
      :show="showModal"
    >
      <div style="display: flex; flex-direction: column; margin-left: 10px; align-items: center">
        <p style="white-space: pre-line;">
          <i
            class="fas fa-info-circle"
            style="color: #FFC80C; font-size: 20px"
          />
          خرید محصول
          "{{ selectedProduct.name }}"
        </p>
        <p style="white-space: pre-line;">
          <i
            class="fas fa-money-bill-wave"
            style="color: green; font-size: 20px"
          />
          قیمت واحد:
          {{ formattedPrice(selectedProduct.price) }}
        </p>
        <p>
          <i
            class="fas fa-flag"
            style="color: red; font-size: 20px"
          />
          تعداد خرید:
          {{ orderAmount }}
        </p>
        <input
          id="myRange"
          v-model="orderAmount"
          type="range"
          :min="1"
          :max="selectedProduct.inventory"
          class="slider"
        >
        <p style="margin-top: 30px">
          قیمت کل:
          {{ formattedPrice(orderAmount * selectedProduct.price) }}
        </p>
        <button
          class="btn"
          @click="completeOrder"
        >
          ارسال سفارش
        </button>
        <p
          v-if="postInfo"
          style="color: #FFC80A"
        >
          {{ postInfo }}
        </p>
      </div>
    </modal>
    <div>
      <header-hero v-model="searchValue" />
    </div>
    <div class="sort-box--margin">
      <sort-box v-model="sort" />
    </div>
    <div id="main-part">
      <div class="filter-box">
        <filter-box
          :key="initialMax"
          :initial-slider-min="initialMin"
          :initial-slider-max="initialMax"
          @range="setRange"
          @category="categoryFunc"
        />
      </div>
      <div class="product-container">
        <product-card
          v-for="product of products"
          :key="product.name"
          :category="product.category"
          :name="product.name"
          :price="product.price"
          :image="product.image"
          class="product-box__item"
          :button-function="() => order(product)"
        />
      </div>
    </div>
    <span
      @mouseover="hover = true"
    >
      <pagination
        v-model="page"
        style="  margin-left: 10px; margin-right: 10px;"
        :length="numberOfPages"
      />
    </span>
    <div
      v-if="hover"
    >
      تعداد محصولات هر صفحه:
      <select
        id="eachPageLength"
        v-model="pageLength"
        name="تعداد محصول در هر صفحه"
      >
        <option
          v-for="val of [10,15,20]"
          :key="val"
          :value="val"
        >
          {{ val }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import headerHero from "../components/header-hero.vue";
import sortBox from "../components/sort-box.vue";
import filterBox from "../components/filter-box.vue";
import productCard from "../components/product-card.vue";
import pagination from "../components/core/pagination";
import modal from "../components/core/modal";
import language from "../utils/language";
import formatter from "../utils/formatter";
import authorization from "../controller/authorization";
import product from "../controller/product";
import receipt from "../controller/receipt";

export default {
	name: "Home",
	components: {
		headerHero,
		sortBox,
		filterBox,
		productCard,
		pagination,
		modal
	},
	data() {
		return {
			page: 1,
			fullProducts: [],
			pageLength: 15,
			numberOfPages: 3,
			products: [],
			hover: false,
			sort: 0,
			searchValue: undefined,
			showModal: false,
			selectedProduct: {},
			orderAmount: 1,
			min: 1,
			max: Number.MAX_SAFE_INTEGER,
			initialMin: 1,
			initialMax: 50000,
			category: [],
			sortObject: {"_soldCount": -1},
			firstTime: true,
			postInfo: undefined
		};
	},
	watch: {
		page(val) {
			this.products = [];
			for (let i = (val - 1) * this.pageLength;
				i < Math.min(val * this.pageLength, this.fullProducts.length); i++) {
				this.products.push(this.fullProducts[i]);
			}
		},
		pageLength() {
			this.page = 1;
			this.init();
		},
		sort(val){
		  // 0: Most sold
			// 1: Cost upward
			// 2: Cost downward
			// 3: Date
			switch (val){
				case 0:
				  this.sortObject = {"_soldCount": -1};
					break;
				case 1:
					this.sortObject = {"_price": -1};
					break;
				case 2:
					this.sortObject = {"_price": +1};
					break;
				case 3:
					this.sortObject = {"_date": -1};
					break;
			}
		  this.init();
		},
		searchValue(){
		  this.init();
		},
		category(){
		  this.init();
		},
		showModal(val){
		  if(val) {
				this.orderAmount = 1;
				this.postInfo = undefined;
			}
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			this.fullProducts = await product.getProducts(Number.MAX_SAFE_INTEGER, 0,
				this.searchValue, this.category, this.min, this.max, this.sortObject);
			if(this.firstTime) {
				this.initialMax = 0;
				for (const product of this.fullProducts) {
					if (product.price > this.initialMax) {
						this.initialMax = product.price;
					}
				}
			}
			this.numberOfPages = Math.ceil(this.fullProducts.length / this.pageLength);
			this.products = [];
			for (let i = 0; i < Math.min(this.pageLength, this.fullProducts.length); i++) {
				this.products.push(this.fullProducts[i]);
			}
			this.firstTime = false;
		},
		async order(product){
		  const logged = await authorization.isLoggedIn();
		  if(!logged || logged.role !== 0)
		    alert("برای ثبت سفارش، ابتدا به پروفایل کاربری خود وارد شوید!");
		  else {
				this.showModal = true;
				this.selectedProduct = product;
			}
		},
		formattedPrice(val) {
			return language.toFarsiNumber(formatter.formatToRial(val));
		},
		async completeOrder(){
		  const result = await receipt.createOrder(this.selectedProduct.name, Number.parseInt(this.orderAmount));
		  if(result === true){
		    this.postInfo = "سفارش شما با موفقیت به ثبت رسید";
		    setTimeout(()=>{
		      this.showModal = false;
		      }, 5000);
			} else {
				this.postInfo = result.message;
			}
		},
		setRange(val){
		  this.min = Number.parseInt(val.min);
		  this.max = Number.parseInt(val.max);
			this.init();
		},
		categoryFunc(val){
		  this.category = val;
			this.init();
		}
	}
};
</script>

<style scoped>
.sort-box--margin {
  margin-left: 10px;
  margin-right: 10px;
}

/* Overall spacing */
#main-part {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

/* Filter box sizing */
.filter-box {
  min-width: 360px;
  margin-left: 15px;
}

/* Product container sizing */
.product-container {
  display: grid;
  grid-template-columns: auto auto auto; /* Three columns */
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}

@media (max-width: 990px) {
  .product-container {
    grid-template-columns: auto auto; /*Two columns*/
  }
}

/* Sizing in smaller screens */
@media (max-width: 768px) {
  #main-part {
    flex-direction: column;
  }

  .filter-box {
    width: 100%;
  }
}

@media (max-width: 580px) {
  .product-container {
    grid-template-columns: auto; /*One column*/
  }
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
}

.slider::-webkit-slider-thumb {
  border: none;
  -webkit-appearance: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: #00A1FF;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: #00A1FF;
  cursor: pointer;
}
/* Button styles */
.btn {
  color: white;
  background: #00A1FF;
  font-family: inherit;
  font-size: 14px;
  border-radius: 24px;
  border: 0 solid;
  padding: 10px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  -webkit-transition: 300ms;
  /* Position */
  position: relative;
  float: left;
  left: 0;
  bottom: 6px;
  width: 100%;
}

/* Button shadow on hover */
.btn:hover {
  box-shadow: 0 0 3pt 0.5pt green;
}
</style>
