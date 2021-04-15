<template>
  <div id="app">
    <router-view/>
    <footer class="footer--stick-bottom"><my-footer></my-footer></footer>
  </div>
</template>

<script>
import myFooter from './components/my-footer.vue';

export default {
  components: {
    myFooter,
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
@font-face { /* import Iran sans font */
  font-family: "IranianSans";
  src: local("IranianSans"),   url(../public/IranianSans.ttf) format("truetype");
}

</style>
