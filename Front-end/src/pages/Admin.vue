<template>
  <div style="padding-top: 10%;">
    <span class="welcome-name">
      ادمین عزیز، خوش آمدید
    </span>
    <div id="tab-selector__position-center">
      <tab-selector
        id="admin__tab-selector"
        v-model="selectedTab"
        :tabs="tabs"
      />
    </div>
    <div style="display: flex; justify-content: center; height: 100%; margin-left: 10px; margin-right: 10px">
      <transition
        name="slide-fade"
      >
        <category-tab v-if="selectedTab === 1" />
        <products-tab v-if="selectedTab === 0" />
        <receipt-tab
          v-if="selectedTab === 2"
          is-admin
          style="width: 95%"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import tabSelector from "../components/core/tab-selector";
import receiptTab from "../views/receipt-tap";
import language from "../utils/language";
import formatter from "../utils/formatter";
import categoryTab from "../views/category-tab";
import productsTab from "../views/products-tab";
import auth from "../controller/authorization";

export default {
	name: "Admin",
	components: {
		tabSelector,
		receiptTab,
		categoryTab,
		productsTab
	},
	data(){
		return {
			tabs: [
				{name: "لیست کالاها"},
				{name: "لیست دسته‌بندی‌ها"},
				{name: "رسیدها"}
			],
			selectedTab: 0
		};
	},
	computed: {
		credit() {
			return language.toFarsiNumber(formatter.formatToRial(this.profileInfo.credit));
		}
	},
	async created() {
	  const res = await auth.isLoggedIn();
		if(!res || res.role !== 1)
			this.$router.go(-1);
	}
};
</script>

<style scoped>
/* Welcome paragraph styling */
.welcome-name {
  color: rgb(33,33,33);
  font-weight: bold;
  font-size: 26px;
}
/* Centering Tab selector */
#tab-selector__position-center {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
/* Tab selector size and positions */
#admin__tab-selector {
  width: 100%;
  max-width: 560px;
  margin-top: 15px;
  margin-bottom: 30px;
}
@media (max-width: 560px) {
  /* Make Tab selector smaller on smaller screens */
  #admin__tab-selector {
    font-size: 12px;
  }
}
/* Entering animation */
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
