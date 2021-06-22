<template>
  <div>
    <div>
      <header-hero v-model="searchValue" />
    </div>
    <div class="sort-box--margin">
      <sort-box v-model="sort" />
    </div>
    <div id="main-part">
      <div class="filter-box">
        <filter-box />
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

export default {
	name: "Home",
	components: {
		headerHero,
		sortBox,
		filterBox,
		productCard,
		pagination
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
			searchValue: undefined
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
					name: `name ${i}`,
					category: "دسته بندی",
					price: 10000,
					image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
				});
			}
			this.numberOfPages = Math.ceil(this.fullProducts.length / this.pageLength);
			this.products = [];
			for (let i = 0; i < Math.min(this.pageLength, this.fullProducts.length); i++) {
				this.products.push(this.fullProducts[i]);
			}
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
</style>
