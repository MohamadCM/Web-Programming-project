<template>
  <div style="padding-top: 17%;">
    <span class="welcome-name">
      {{ profileInfo.name }} عزیز، خوش آمدید
    </span>
    <transition
      name="slide-fade"
    >
      <span
        v-if="selectedTab === 0"
        class="welcome-name"
      >
        |
      </span>
    </transition>
    <transition
      name="slide-fade"
    >
      <span
        v-if="selectedTab === 0"
        id="credit-title"
      >
        موجودی حساب شما: {{ credit }}
      </span>
    </transition>
    <transition
      name="slide-fade"
    >
      <my-button
        v-if="selectedTab === 0"
        id="increase-credit__button"
        color="#e30b5d"
        back-ground-color="#FFC80A"
        text="افزایش موجودی"
        :on-click-function="increaseCredit"
      />
    </transition>
    <div id="tab-selector__position-center">
      <tab-selector
        id="profile__tab-selector"
        v-model="selectedTab"
        :tabs="tabs"
      />
    </div>

    <transition
      name="slide-fade"
    >
      <profile-info-tab
        v-if="selectedTab === 0"
        class="profile-info-edit"
        :profile-info="profileInfo"
      />
      <div style="display: flex; justify-content: center">
        <receipt-tab
          v-if="selectedTab === 1"
          style="width: 95%"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import tabSelector from "../components/core/tab-selector";
import profileInfoTab from "../views/profile-info-tab";
import receiptTab from "../views/receipt-tap";
import language from "../../utils/language";
import formatter from "../../utils/formatter";
import myButton from "../components/core/my-button";

export default {
	name: "Profile",
	components: {
	  tabSelector,
		profileInfoTab,
		receiptTab,
		myButton
	},
	data(){
	  return {
			tabs: [
				{name: "پروفایل"},
				{name: "رسیدها"}
			],
			selectedTab: 0,
			profileInfo: {name: "محمد", lastName: "جمن مطلق", address: "1234", credit: 10000}
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
/* Credit paragraph styling */
#credit-title {
  color: rgb(33,33,33);
  font-weight: bold;
  font-size: 14px;
}
/* Button to increase credit */
#increase-credit__button {
  padding: 5px 10px 5px 10px;
  font-size: 14px;
  -webkit-transition: 400ms;
}
/* my-buttons specific styling on hover */
#increase-credit__button:hover {
  box-shadow: 3px 5px silver;
}
/* Centering Tab selector */
#tab-selector__position-center {
  display: flex;
  align-items: center;
  flex-direction: column;
}
/* Tab selector size and positions */
#profile__tab-selector {
  width: 100%;
  max-width: 300px;
  margin-top: 15px;
  margin-bottom: 30px;
}
/* Profile info tab positioning */
.profile-info-edit {
  padding-right: 10%;
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
