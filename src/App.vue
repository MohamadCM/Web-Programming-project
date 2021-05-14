<template>
  <div
    id="app"
    class="container"
  >
    <div class="container__top">
      <header class="header__stick-top">
        <my-header />
      </header>
      <router-view />
    </div>
    <footer class="footer__stick-bottom">
      <my-footer />
    </footer>
  </div>
</template>

<script>
import myFooter from "./components/my-footer.vue";
import myHeader from "./components/my-header.vue";

export default {
	components: {
		myFooter,
		myHeader
	}
};
</script>
<style>
#app {
  max-width: 1280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -7px;
  display: block;
}
.footer__stick-bottom { /* Stick footer to bottom of the window */
  position: sticky;
  bottom: 0;
  width: 100%;
  max-width: 1280px;
}
.header__stick-top {
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
/* Fixing upper parts to top */
.container__top {
  min-height: 100vh;
}
</style>
