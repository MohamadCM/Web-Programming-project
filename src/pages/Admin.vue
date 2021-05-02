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

    <transition
      name="slide-fade"
    >
      <div style="display: flex; justify-content: center">
        <category-tab v-if="selectedTab === 1" />
        <products-tab v-if="selectedTab === 0" />
        <receipt-tab
          v-if="selectedTab === 2"
          is-admin
          style="width: 95%"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import tabSelector from "../components/core/tab-selector";
import receiptTab from "../views/receipt-tap";
import language from "../../utils/language";
import formatter from "../../utils/formatter";
import categoryTab from "../views/category-tab";
import productsTab from "../views/products-tab";

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
	methods: {
		increaseCredit(){
			console.log("Increase credit");
		}
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
/* Enter and leave animation */
.slide-fade-enter-active {
  transition: all 500ms ease;
}
.slide-fade-leave-active {
  transition: all 300ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
