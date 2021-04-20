<template>
  <div id="app" class="container">
    <header class="header--stick-top"><my-header /></header>
    <router-view />
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
#app {
  max-width: 1280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -7px;
  display: block;
}
.footer--stick-bottom { /* Stick footer to bottom of the window */
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 1280px;
}
.header--stick-top {
  top: 0;
  width: 100%;
  max-width: 1280px;
  font-family: IranianSans,sans-serif;
}
@font-face { /* import Iran sans font */
  font-family: "IranianSans";
  src: local("IranianSans"),   url(../public/IranianSans.ttf) format("truetype");
}
/*Flex container*/
.container {
  display: flex;
  flex-direction: row;
}

</style>
