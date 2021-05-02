<template>
  <div>
    <div>
      <header-hero />
    </div>
    <div class="sort-box--margin">
      <sort-box />
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
  </div>
</template>

<script>
import headerHero from "../components/header-hero.vue";
import sortBox from "../components/sort-box.vue";
import filterBox from "../components/filter-box.vue";
import productCard from "../components/product-card.vue";

export default {
	name: "Home",
	components: {
		headerHero,
		sortBox,
		filterBox,
		productCard
	},
	data() {
		return {
			products: [{
				id: 0,
				name: "نام",
				category: "دسته بندی",
				price: 1,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			},
			{
				id: 1,
				name: "نام2",
				category: "دسته بندی2",
				price: 1235,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			},
			{
				id: 2,
				name: "نام2",
				category: "دسته بندی2",
				price: 1235,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			},

			{
				id: 3,
				name: "نام2",
				category: "دسته بندی2",
				price: 1235,
				image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG"
			}
			]
		};
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
  #main-part{
    flex-direction: column;
  }
  .filter-box{
    width: 100%;
  }
}
@media (max-width: 580px) {
  .product-container {
    grid-template-columns: auto; /*One column*/
  }
}
</style>
