<template>
<div class="header">
  <h1 class="logo">{{logoTitle}}</h1>
  <my-button color="transparent" text="ورود / ثبت نام"/>
</div>
</template>

<script>
import myButton from './core/my-button.vue';

export default {
  name: 'my-header',
  components: {
    myButton,
  },
  data() {
    return {
      logoTitle: 'فروشگاه',
    };
  },
};
</script>

<style scoped>
.header {
  background-color: white;
  text-align: right;
  direction: rtl;
  padding: 65px;
}
.logo {
  font-size: 18px;
  color: #0EBAC5;
}
#loginButton {
  outline-color: gold;
  outline-style: solid;
  -moz-outline-radius: 20px;
}
</style>
