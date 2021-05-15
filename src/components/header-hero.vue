<template>
  <div class="header-hero">
    <div>
      <p id="title">
        در محصولات سایت جستجو کنید...
      </p>
    </div>
    <div>
      <input
        type="text"
        class="text-field"
        onfocus="placeholder = ''"
        onblur="placeholder = 'نام محصول خود را وارد کنید...'"
        :placeholder="placeholder"
      >
    </div>
    <div>
      <button class="search__button">
        جستجو کنید
      </button>
    </div>
    <div>
      <div
        v-if="imageIndex !== imageIndexMax"
        class="arrow__box"
        style="float: right;"
        @click="changeImage(false)"
      >
        <i
          class="fas fa-chevron-right"
        />
      </div>
      <div
        v-if="imageIndex !== 0"
        class="arrow__box"
        style="float: left;"
        @click="changeImage(true)"
      >
        <i class="fas fa-chevron-left" />
      </div>
    </div>
    <div>
      <transition
        name="slide-fade"
      >
        <img
          id="header__image"
          :key="images[imageIndex]"
          :src="images[imageIndex]"
          alt="Header image!!"
        >
      </transition>
    </div>
  </div>
</template>

<script>
import clock from "../assets/clock.png";
import home from "../assets/home.png";
import homer from "../assets/homer.png";
export default {
	name: "HeaderHero",
	data() {
		return {
			placeholder: "نام محصول خود را وارد کنید...",
			imageIndex: 0,
			images:[
				clock,
				homer,
				home
			],
			imageIndexMax: 2
		};
	},
	mounted() {
	  this.imageIndexMax = this.images.length - 1;
	  setInterval(() => {
	    this.imageIndex = (this.imageIndex + 1) % this.images.length;
		}, 10000);
	},
	methods: {
	  changeImage(reduce){
			if(reduce)
				this.imageIndex--;
			else
				this.imageIndex++;
		}
	}
};
</script>

<style scoped>
/*Overall style*/
.header-hero {
  background: #FA583B;
  width: 100%;
  min-height: 85px;
  overflow: hidden;
  text-align: center;
}
/* Title overall style*/
#title {
  font-size: 32px;
  color: white;
  direction: inherit;
  font-family: inherit;
  width: 100%;
}
/* text input overall style */
.text-field {
  border-radius: 24px;
  font-family: inherit;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  width: 55%;
  height: 32px;
  text-align: center;
  outline: none;
  border: 0 solid;
  /* Animation */
  -webkit-transition: 0.5s;
  /* Margin for spacing */
  margin-top: 40px;
}
/* Box shadow on hover */
.text-field:hover {
  box-shadow: 0 0 3pt 0.5pt #D3D3D3;
}
/* Search button overall style */
.search__button{
  background: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  font-family: inherit;
  font-size: 16px;
  border-radius: 24px;
  border: 0 solid;
  background: #FFC80C;
  padding: 13px 3%;
  /* Margin for spacing */
  margin-top: 35px;
  /* Animation */
  -webkit-transition: 0.3s;
}
/* Box shadow on hover */
.search__button:hover{
  box-shadow: 0 0 3pt 0.5pt yellow;
}
/* Image styles and sizing */
#header__image{
  position: relative;
  bottom: -10px;
  max-width: 100%;
  height: auto;
}
/* Left and right arrow box styles */
.arrow__box{
  display: grid;
  align-items: center;
  height: 30px;
  width: 30px;
  margin: 15px;
  background: #FFC80A;
  border-radius: 100%;
  -webkit-transition: 0.3s;
}
/* Arrow box on hover style */
.arrow__box:hover{
  box-shadow: 0 0 3pt 0.5pt #FFC80A;
}
/* Enter image animation */
.slide-fade-enter-active {
  transition: all 1.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
