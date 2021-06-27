<template>
  <div class="container">
    <div id="category-card">
      <p class="category-card__title">
        دسته بندی
      </p>
      <div class="category-container__all">
        <div
          v-for="category of categories"
          :key="category.name"
          class="category-container"
        >
          <input
            :id="category.id"
            v-model="selectedCategory"
            class="category"
            type="checkbox"
            :value="category.name"
          >
          <label
            :for="category.id"
            class="category__label"
          >{{ category.name }}</label>
        </div>
      </div>
      <br>
    </div>
    <div id="price-card">
      <p class="category-card__title">
        تنظیم قیمت کالا
      </p>
      <div
        class="wrap"
        role="group"
        aria-labelledby="multi-lbl"
        :style="rangeStyle"
      >
        <input
          id="a"
          v-model="max"
          type="range"
          min="0"
          :max="initialSliderMax"
        >
        <input
          id="b"
          v-model="min"
          type="range"
          min="1"
          :max="initialSliderMax"
        >
      </div>
      <div id="range__values">
        <span style="float: right; margin-right: 5px">{{ shownMinMax.min }}</span>
        <span>  تا </span>
        <span style="float: left; margin-left: 5px">{{ shownMinMax.max }}</span>
      </div>

      <button
        class="btn"
        @click="sendPriceRange"
      >
        اعمال
      </button>
    </div>
  </div>
</template>

<script>
import language from "../utils/language";
import category from "../controller/category";

export default {
	name: "FilterBox",
	props: {
		initialSliderMin: {
			type: Number,
			default: 1
		},
		initialSliderMax: {
			type: Number,
			default: 50000
		}
	},
	data() {
		return {
			categories: [],
			selectedCategory: [],
			min: this.initialSliderMin,
			max: this.initialSliderMax,
			result: {}
		};
	},
	computed: {
		rangeStyle() {
			return `--a: ${50}; --b: ${0}; --min: ${0}; --max: ${50}`;
		},
		shownMinMax() {
			return {
				max: language.toFarsiNumber(this.max),
				min: language.toFarsiNumber(this.min)
			};
		}
	},
	watch: {
		selectedCategory(val) {
			this.result.categories = val;
			this.$emit("category", val);
		},
		min(val){
			this.result.min = Number.parseInt(val);
			this.$emit("min", val);
		},
		max(val){
			this.result.max = Number.parseInt(val);
			this.$emit("max", val);
		}
	},
	async mounted(){
		this.categories = await category.getCategories();
	},
	methods: {
	  sendPriceRange(){
	    this.$emit("range", {
	      max: this.max,
	      min: this.min
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

#category-card {
  background: white;
  direction: rtl;
  text-align: right;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
}

/* Creating bottom line for p */
.category-card__title {
  padding-right: 10px;
  padding-bottom: 12px;
  text-align: right;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: solid;
  border-bottom-color: #E8E9ED;
  border-bottom-width: 2px;
  border-left-style: none;
}
/* Category boxing styles */
.category-container__all {
  max-height: 500px;
  overflow: auto;
  direction: rtl;
}
/* Category div styling */
.category-container {
  padding-top: 7px;
  padding-right: 5px;
}
/* Category Checkbox styling */
.category {
  -webkit-appearance: none;
  border: 1px solid #cacece;
  padding: 9px;
  border-radius: 24px;
  position: relative;
  top: 7px;
  margin-left: 10px;
  -webkit-transition: 200ms;
}
/* Active Checkbox styling */
.category:checked {
  background-color: #4491E0;
  border: 3px solid #adb8c0;  // Grey border on selection
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0 -15px 10px -12px rgba(0,0,0,0.05),
  inset 15px 10px -12px rgba(255,255,255,0.1);
  color: #99a1a7;
}
/* Category label styling */
.category__label {
  font-size: 16px;
  font-family: inherit;
}

/* Price Card styling */
#price-card {
  background: white;
  direction: rtl;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}
/* Sliders wrapper */
.wrap {
  display: grid;
  grid-template-rows: max-content 15px;
  margin: 1em auto;
  width: 90%;
  overflow: hidden; // in case <label> elements overflow
  position: relative;
  background: /* emulate track with wrapper background */
    linear-gradient(0deg, #ccc 15px, transparent 0);
  grid-template: repeat(2, max-content) #{15px}/ 1fr 1fr;

}
/* Slider track styles */
@mixin track() {
  background: none; /* get rid of Firefox track background */
  height: 100%;
  width: 100%;
  border-radius: 25px;
}
/* Slider Thump styles */
@mixin thumb() {
  background: currentcolor;
  border: none; /* get rid of Firefox thumb border */
  pointer-events: auto; /* catch clicks */
  width: 15px; height: 15px;
  border-radius: 100px;
  background: #019CFC;
}
/*Range input styles*/
input[type='range'] {
  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb, & { -webkit-appearance: none; }
  background: none; /* get rid of white Chrome background */
  color: #000;
  font: inherit; /* fix too small font-size in both Chrome & Firefox */
  margin: 0;
  pointer-events: none; /* let clicks pass through */
  &::-webkit-slider-runnable-track { @include track; }
  &::-moz-range-track { @include track; }
  &::-webkit-slider-thumb { @include thumb; }
  &::-moz-range-thumb { @include thumb; }
  grid-column: 1/ span 2;
  grid-row: 3;
}
/* Output styles */
#range__values {
  text-align: center;
  margin: 5%;
  background: #4491E04D;
  border-radius: 24px;
  font-family: inherit;
  font-size: 16px;
  direction: rtl;
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
  width: 120px;
  margin: 10px;
}

/* Button shadow on hover */
.btn:hover {
  box-shadow: 0 0 3pt 0.5pt #00A1FF;
}
</style>
