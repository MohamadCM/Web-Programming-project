<template>
  <div id="product-card">
    <p v-if="amountBadge" class="badge">{{ amountBadge }}</p>
    <div class="product-card--padding-all">
      <img :src="image" :alt='name + " تصویر "' class="product-image">
      <h3>{{ name }}</h3>
      <h4 class="category-title">{{ category }}</h4>
      <div class="bottom">
        <p style="justify-content: center">{{formattedPrice}}
          <button class="btn" @click="buttonFunction">{{buttonTitle}}</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import formatter from '../../utils/formatter';
import language from '../../utils/language';

export default {
  name: 'product-card',
  props: {
    name: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    buttonTitle: {
      type: String,
      default: 'خرید محصول',
    },
    buttonFunction: {
      type: Function,
      default: () => {},
    },
    amountBadge: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    formattedPrice() {
      return language.toFarsiNumber(formatter.formatToRial(this.price));
    },
  },
};
</script>

<style scoped>
/* Overall styles */
#product-card {
  background: white;
  direction: rtl;
  text-align: right;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  width: 100%;
}
/* Inside padding */
.product-card--padding-all {
  padding: 15px;
  align-content: center;
}
/* img styles */
.product-image {
  max-width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
/* Category title style */
.category-title {
  padding-bottom: 45px;
  border-top-style: none;
  border-right-style: none;
}
/* Bottom part styles */
.bottom {
  border-bottom-style: none;
  border-top-style: solid;
  border-top-color: #E8E9ED;
  border-top-width: 2px;
  margin: auto auto -10px;
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
}

/* Button shadow on hover */
.btn:hover {
  box-shadow: 0 0 3pt 0.5pt #00A1FF;
}
/*Change sizes in medium screens*/
@media (max-width: 1240px) and (min-width: 768px){
  .btn {
    font-size: 10px;
    padding: 5px 10px;
    bottom: 2px;
  }
  p {
    font-size: 12px;
  }
}
/* Badge styles */
.badge {
  text-align: center;
  float: left;
  background: white;
  color: #00A1FF;
  border-radius: 100%;
  padding: 15px;
  height: 15px;
  width: 15px;
  box-shadow: 10px 10px 10px rgba(192, 192, 192, 0.99);
  /* Badge position */
  position: relative;
  top: -35px;
  left: -15px;
}
</style>
