<template>
  <div class="header">
    <h1 class="logo header__item">
      {{ logoTitle }}
    </h1>
    <my-button
      v-for="button of buttons"
      :key="button.text"
      class="header__item"
      color="#0EBAC5"
      :text="button.text"
      :on-click-function="button.onClickFunction"
    />
    <div class="header__item" />
    <button-login class="header__item" /> <!-- TODO: Hide this ln login page -->
  </div>
</template>

<script>
import myButton from "./core/my-button.vue";
import buttonLogin from "./button-login.vue";

export default {
	name: "MyHeader",
	components: {
		myButton,
		buttonLogin
	},
	data() {
		return {
			logoTitle: "فروشگاه",
			buttons: [
				{ text: "صفحه اول", onClickFunction: () => { this.$router.push("/"); } },
				{ text: "تماس با ما", onClickFunction: () => { this.$router.push("/"); } },
				{ text: "پشتیبانی", onClickFunction: () => { this.$router.push("/"); } },
				{ text: "محصولات", onClickFunction: () => {
					this.$router.push("/");
					window.location.href = "#main-part";
				} }
			]
		};
	}
};
</script>

<style scoped>
.header {
  background-color: white;
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
/* logo size on smaller screens */
@media screen and (max-width: 767px) {
  .logo {
    font-size: 14px;
  }
}

* {
  box-sizing: border-box;
  float: right;
}
.header__item {
  width: 14%;
  float: right;
  padding: 15px;
  margin: auto;
}
</style>
