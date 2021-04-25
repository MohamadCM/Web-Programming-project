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
        <div
          v-for="product of products"
          :key="product.id"
          class="product-wrapper"
        >
          <product-card
            :category="product.category"
            :name="product.name"
            :price="product.price"
            :image="product.image"
            class="product-box__item"
          />
        </div>
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
  display: flex;
  flex-wrap: wrap;
}
.product-wrapper {
  margin-left: 15px;
  margin-bottom: 15px;
  min-width: 200px;
  max-width: 30%;
}
.product-box__item {
  margin-bottom: 15px;
}
/* Sizing in smaller screens */
@media (max-width: 768px) {
  #main-part{
    flex-direction: column;
  }
  .filter-box{
    width: 100%;
  }
  .product-container {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .product-wrapper {
    margin-left: 0;
    max-width: 100%;
  }
}
@media (min-width: 1280px) {
  .product-wrapper {
    max-width: 280px;
  }
}
</style>
