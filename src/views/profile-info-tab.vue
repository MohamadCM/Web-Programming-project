<template>
  <div>
    <modal
      :key="showModal"
      v-model="showModal"
      :show="showModal"
    >
      <p style="white-space: pre-line">
        {{ modalInfo }}
      </p>
    </modal>
    <div class="text-field__row">
      <text-field
        v-model="info.name"
        class="profile-tab__text-field"
        :placeholder="profileInfo.name"
        title="نام"
        :min-length="6"
        :max-length="255"
        pattern=""
      />
      <text-field
        v-model="info.lastName"
        class="profile-tab__text-field"
        :placeholder="profileInfo.lastName"
        title="نام خوانوادگی"
        :min-length="6"
        :max-length="255"
        pattern=""
      />
    </div>
    <template>
      <text-field
        v-model="info.password"
        style="width: 89.1%"
        class="profile-tab__text-field"
        placeholder="پسورد خود را وارد کنید..."
        :is-password="true"
        title="پسورد"
        :min-length="6"
        :max-length="255"
      />
    </template>
    <template>
      <text-field
        v-model="info.address"
        area
        style="height: 128px; width: 89%"
        class="profile-tab__text-field"
        :placeholder="info.address"
        title="آدرس"
        :min-length="6"
        :max-length="1000"
        pattern=""
      />
    </template>
    <my-button
      text="ویرایش اطلاعات"
      fill
      back-ground-color="#FFC80A"
      color="#E30B5D"
      class="profile-tab__button"
      :on-click-function="changeUserInfo"
    />
  </div>
</template>

<script>
import textField from "../components/core/text-field.vue";
import myButton from "../components/core/my-button.vue";
import authorization from "../controller/authorization";
import modal from "../components/core/modal";
export default {
	name: "ProfileInfoTab",
	components: {
		textField,
		myButton,
		modal
	},
	props: {
	  profileInfo: {
	    type: Object,
			default: () => ({name: "", lastName: "", address:""})
		}
	},
	data() {
	  return {
			info: {},
			showModal:false,
			modalInfo: ""
		};
	},
	watch: {
	  "profileInfo.address"(val) {
	    console.log(val);
		},
		"profileInfo.name"(val) {
			console.log(val);
		},
		"profileInfo.lastName"(val) {
			console.log(val);
		},
		"profileInfo.password"(val) {
			console.log(val);
		}
	},
	mounted() {
		for (const [key, value] of Object.entries(this.profileInfo)) {
			this.info[key] = value;
		}
	},
	methods: {
	  changeUserInfo(){
	    this.showModal = true;
			if(authorization.updateInfo(this.info.name, this.info.lastName,this.info.password, this.info.address))
				this.modalInfo = "اطلاعات پروفایل شما با موفقیت به روز رسانی شد!";
			else
				this.modalInfo = "به روز رسانی ناموفق بود!";
		}
	}
};
</script>

<style scoped>
/*Text fields styling*/
.profile-tab__text-field {
  height: 48px;
  width: 50%;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
}

/* my-buttons specific styling */
.profile-tab__button {
  padding: 16px 70px 16px 70px;
  font-weight: bold;
  -webkit-transition: 300ms;
  font-size: 16px;
}

/* my-buttons specific styling on hover */
.profile-tab__button:hover {
  box-shadow: 5px 10px silver;
}

/* Putting text-fields in a row */
.text-field__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
}
</style>
