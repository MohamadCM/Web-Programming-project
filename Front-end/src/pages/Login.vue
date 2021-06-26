<template>
  <div id="login-container">
    <modal
      :key="showModal"
      v-model="showModal"
      :show="showModal"
    >
      <p style="white-space: pre-line">
        {{ modalInfo }}
      </p>
    </modal>
    <p class="title">
      {{ isSignupMode ? 'فروشگاه - ثبت نام' : 'فروشگاه - ورود' }}
    </p>
    <form id="login-form">
      <!--Login section-->
      <template v-if="!isSignupMode">
        <text-field
          v-model="email"
          class="profile-tab__text-field"
          placeholder="ایمیل خود را وارد کنید..."
          :max-length="255"
          :min-length="6"
          :pattern="emailPatter"
          title="ایمیل"
        />
        <text-field
          v-model="password"
          :is-password="true"
          :pattern="undefined"
          class="profile-tab__text-field"
          placeholder="پسورد خود را وارد کنید..."
          :min-length="6"
          :max-length="255"
          title="پسورد"
        />
      </template>
      <!--Signup section-->
      <template v-else>
        <div class="text-field__row">
          <text-field
            v-model="name"
            class="profile-tab__text-field"
            placeholder="نام خود را وارد کنید..."
            title="نام"
            :min-length="2"
            :max-length="255"
            pattern=""
          />
          <text-field
            v-model="lastName"
            class="profile-tab__text-field"
            placeholder="نام خانوادگی خود را وارد کنید..."
            title="نام خانوادگی"
            :max-length="255"
            :min-length="6"
            pattern=""
          />
        </div>
        <div class="text-field__row">
          <text-field
            v-model="email"
            class="profile-tab__text-field"
            placeholder="ایمیل خود را وارد کنید..."
            title="ایمیل"
            :max-length="255"
            :min-length="6"
            :pattern="emailPatter"
          />
          <text-field
            v-model="password"
            class="profile-tab__text-field"
            placeholder="پسورد خود را وارد کنید..."
            :is-password="true"
            title="پسورد"
            :min-length="6"
            :max-length="255"
          />
        </div>
        <template>
          <text-field
            v-model="address"
            area
            style="height: 128px; width: 89%"
            class="profile-tab__text-field"
            placeholder="آدرس خود را وارد کنید..."
            title="آدرس"
            :min-length="6"
            :max-length="1000"
            pattern=""
          />
        </template>
      </template>
      <my-button
        :text="isSignupMode ? 'ثبت نام' : 'ورود'"
        fill
        back-ground-color="#FFC80A"
        color="#e30b5d"
        class="login-form-button"
        :on-click-function="isSignupMode ? signup : login"
      />
    </form>
    <p
      v-if="!isSignupMode"
      class="switch__pages"
      @click="isSignupMode = true;"
    >
      حساب کاربری ندارید؟ ثبت نام کنید!
    </p>
    <p
      v-if="isSignupMode"
      class="switch__pages"
      @click="isSignupMode = false;"
    >
      قبلا ثبت نام کرده اید؟ وارد حساب کاربری خود شوید!
    </p>
  </div>
</template>

<script>
import textField from "../components/core/text-field.vue";
import myButton from "../components/core/my-button.vue";
import authorization from "../controller/authorization";
import modal from "../components/core/modal";
import auth from "../controller/authorization";

export default {
	name: "Login",
	components: {
		textField,
		myButton,
		modal
	},
	data() {
		return {
			isSignupMode: false,
			email: "",
			password: "",
			name: "",
			lastName: "",
			address: "",
			emailPatter: "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:" +
        "\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:" +
        "[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\" +
        "[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|" +
        "\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|" +
        "[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:" +
        "[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])",
			showModal:false,
			modalInfo: ""
		};
	},
	async created() {
	  if(await auth.isLoggedIn())
	    this.$router.go(-1);
	},
	methods: {
		async login() {
			this.showModal = true;
			if(await authorization.login(this.email, this.password)) {
				this.modalInfo = "ورود موفقیت آمیز بود!";
				setTimeout(() => this.$router.push("/"), 5000);
			}
			else
				this.modalInfo = "ورود ناموفق بود، ایمیل و پسورد خود را مجددا چک کنید.";
		},
		async signup() {
			this.showModal = true;
			if(await authorization.signup(this.email, this.password, this.name, this.lastName, this.address )) {
				this.modalInfo = "ثبت نام موفقیت آمیز بود!";
				setTimeout(() => this.$router.push("/profile"), 5000);
			}
			else
				this.modalInfo = "ثبت نام ناموفق بود، ایمیل و پسورد خود را مجددا چک کنید."
        +"\n ایمیل شما در سیستم موجود است";
		}
	}
};
</script>

<style scoped>
/* Overall Container styling */
#login-container {
  padding-top: 21%;
}

/* Title styling */
.title {
  font-family: inherit;
  font-size: 32px;
  color: #0EBAC5;
  margin-bottom: 30px;
}

/* Login form */
#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/*Text fields styling*/
.profile-tab__text-field {
  height: 48px;
  width: 50%;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
}

/* my-buttons specific styling */
.login-form-button {
  padding: 16px 90px 16px 90px;
  font-weight: bold;
  -webkit-transition: 300ms;
  font-size: 16px;
}

/* my-buttons specific styling on hover */
.login-form-button:hover {
  box-shadow: 5px 10px silver;
}

/* Putting text-fields in a row */
.text-field__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
}
.switch__pages {
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  -webkit-transition: 300ms;
}
.switch__pages:hover{
  color: #0EBAC5;
}
</style>
