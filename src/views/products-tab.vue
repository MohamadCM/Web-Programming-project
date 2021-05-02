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
  </div>
</template>

<script>
import productCard from "../components/product-card";
export default {
	name: "ProductsTab",
	components: {productCard},
	data(){
	  return{
			products: [{
				id: 0,
				name: "نام",
				category: "دسته بندی",
				price: 1,
				amountBadge: 5,
				editProduct(){
					console.log(0);
				},
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			},
			{
				id: 1,
				name: "نام2",
				category: "دسته بندی2",
				price: 1235,
				amountBadge: 12,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			},
			{
				id: 2,
				name: "نام2",
				category: "دسته بندی2",
				price: 1235,
				amountBadge: 7,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			},

			{
				id: 3,
				name: "نام2",
				category: "دسته بندی2",
				price: 1235,
				amountBadge: 1,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			}
			]
		};
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
  grid-row-gap: 5%;
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
