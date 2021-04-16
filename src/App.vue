<template>
  <div id="app">
    <header class="header--stick-top"><my-header /></header>
    <router-view/>
    <footer class="footer--stick-bottom"><my-footer /></footer>
  </div>
</template>

<script>
import myFooter from './components/my-footer.vue';
import myHeader from './components/my-header.vue';

export default {
  components: {
    myFooter,
    myHeader,
  },
};
</script>
<style lang="scss">
.footer--stick-bottom { /* Stick footer to bottom of the window */
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.header--stick-top {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  margin: 5px;
  font-family: IranianSans,sans-serif;
}
@font-face { /* import Iran sans font */
  font-family: "IranianSans";
  src: local("IranianSans"),   url(../public/IranianSans.ttf) format("truetype");
}

</style>
