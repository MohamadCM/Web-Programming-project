<template>
  <div>
    <button
      id="new-product__button"
    >
      <i class="fas fa-plus" />
      ایجاد محصول جدید
    </button>
    <div class="product__container">
      <product-card
        v-for="product of products"
        :key="product.id"
        :category="product.category"
        :name="product.name"
        :price="product.price"
        :image="product.image"
        button-title="ویرایش محصول"
        :amount-badge="product.amountBadge"
        :button-function="product.editProduct"
        class="product-box__item"
      />
    </div>
    <span
      @mouseover="hover = true"
    >
      <pagination
        v-model="page"
        :length="numberOfPages"
      />
    </span>
    <div
      v-if="hover"
      class="custom-select"
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
import productCard from "../components/product-card";
import pagination from "../components/core/pagination";
export default {
	name: "ProductsTab",
	components: {productCard, pagination},
	data(){
	  return{
			page: 1,
			fullProducts: [],
			pageLength: 15,
			numberOfPages: 3,
			products: [],
			hover: false
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
					amountBadge: i,
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
/* New product button styles */
#new-product__button {
  border: none;
  background: #009CFF;
  padding: 17px 22px;
  color: white;
  border-radius: 32px;
  font-family: inherit;
  font-size: 16px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  -webkit-transition: 300ms;
  margin-bottom: 30px;
}
/* Button on hover */
#new-product__button:hover{
  box-shadow: 0 9px 12px rgba(0,0,0,0.16), 0 9px 12px rgba(0,0,0,0.23);
}
/* Grid with three columns in each line */
.product__container {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-items: center;
  grid-column-gap: 5%;
  grid-row-gap: 25px;
  margin-bottom: 48px;
}
@media (max-width: 768px) {
  .product__container{
    grid-template-columns: auto auto; /*Two columns*/
  }
}
@media (max-width: 560px) {
  .product__container{
    grid-template-columns: auto; /*One columns*/
  }
}
</style>
