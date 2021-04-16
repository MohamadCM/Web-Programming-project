<template>
<div class="header">
  <h1 class="logo header__item">{{logoTitle}}</h1>
  <my-button v-for="button of buttons"
             :key="button.text"
             class="header__item"
             color="transparent"
             :text="button.text"
             :on-click-function="button.onClickFunction"/>
  <div class="header__item" />
  <div class="header__item" />
  <my-button id="loginButton"
             color="transparent"
             text="ورود / ثبت نام"
             on-click-function="button.onClickFunction"/>
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
      buttons: [
        { text: 'صفحه اول', onClickFunction: () => { this.$router.push('/'); } },
        { text: 'تماس با ما', onClickFunction: () => { this.$router.push('/'); } },
        { text: 'پشتیبانی', onClickFunction: () => { this.$router.push('/'); } },
        { text: 'محصولات', onClickFunction: () => { this.$router.push('/'); } },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  background-color: transparent;
  text-align: right;
  direction: rtl;
  height: 65px;
  width: 100%;
}
.logo {
  font-size: 18px;
  color: #0EBAC5;
  margin: auto;
}
#loginButton {
  /*Border's CSS*/
  outline-color: #FFC80A;
  outline-style: solid;
  -moz-outline-radius: 25px;
  /*Location's CSS*/
  width: 10%;
  float: right;
  padding: 15px;
  position: relative;
  margin: auto;
}
* {
  box-sizing: border-box;
  float: right;
}
.header__item {
  width: 12%;
  float: right;
  padding: 15px;
  position: relative;
  margin: auto;
}
</style>
