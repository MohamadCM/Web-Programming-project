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
          min="0"
          :max="selectedProduct.inventory"
          value="1"
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
          @min="minFunc"
          @max="maxFunc"
          @category="categoryFunc"
        />
      </div>
      <div class="product-container">
        <product-card
          v-for="product of products"
          :key="product.id"
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
			min: 0,
			max: 50000,
			category: []
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
			// 1: Cost
			// 2: Date
		  console.log(val);
		},
		searchValue(val){
		  console.log(val);
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.fullProducts = [];
			for (let i = 0; i < 40; i++) {
				this.fullProducts.push({
					id: i,
					name: `نام محصول ${i}`,
					category: "دسته بندی",
					price: 10000,
					image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG",
					inventory: 5
				});
			}
			this.numberOfPages = Math.ceil(this.fullProducts.length / this.pageLength);
			this.products = [];
			for (let i = 0; i < Math.min(this.pageLength, this.fullProducts.length); i++) {
				this.products.push(this.fullProducts[i]);
			}
		},
		order(product){ // TODO: Add login logic
		  this.showModal = true;
		  this.selectedProduct = product;
		  console.log(product.inventory);
		},
		formattedPrice(val) {
			return language.toFarsiNumber(formatter.formatToRial(val));
		},
		completeOrder(){
		  console.log("Order has been fulfilled!");
		  this.showModal = false;
		},
		minFunc(val){
		  this.min = val;
		  console.log(val);
		},
		maxFunc(val){
		  this.max = val;
		  console.log(val);
		},
		categoryFunc(val){
		  this.category = val;
		  console.log(val);
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
