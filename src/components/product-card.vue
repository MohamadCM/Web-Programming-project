<template>
  <div id="product-card">
    <span>{{name}}{{name}}{{name}}{{name}}
      {{name}}{{name}}{{name}}{{name}}
      {{name}}{{name}}{{name}}{{name}}
      {{name}}{{name}}{{name}}{{name}}{{name}}
      {{name}}{{name}}{{name}}{{name}}{{name}}
      {{name}}{{name}}{{name}}{{name}}{{name}}{{name}}{{name}}</span>

  </div>
</template>

<script>
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
  },
};
</script>

<style scoped>
#product-card {
  background: white;
  direction: rtl;
  text-align: right;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  margin-top: 10px;
  width: 100%;
  height: 100%;
}
</style>
