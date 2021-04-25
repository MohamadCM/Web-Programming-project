<template>
  <div id="login-container">
    <p class="title">
      {{ isSignupMode ? 'فروشگاه - ثبت نام' : 'فروشگاه - ورود' }}
    </p>
    <form id="login-form">
      <!--Login section-->
      <template v-if="!isSignupMode">
        <text-field
          v-model="email"
          class="login-text-field"
          placeholder="ایمیل خود را وارد کنید..."
          title="ایمیل"
        />
        <text-field
          v-model="password"
          class="login-text-field"
          placeholder="پسورد خود را وارد کنید..."
          title="پسورد"
        />
      </template>
      <!--Signup section-->
      <template v-else>
        <div class="text-field__row">
          <text-field
            v-model="email"
            class="login-text-field"
            placeholder="نام خود را وارد کنید..."
            title="نام"
          />
          <text-field
            v-model="password"
            class="login-text-field"
            placeholder="نام خانوادگی خود را وارد کنید..."
            title="نام خوانوادگی"
          />
        </div>
        <div class="text-field__row">
          <text-field
            v-model="email"
            class="login-text-field"
            placeholder="ایمیل خود را وارد کنید..."
            title="ایمیل"
          />
          <text-field
            v-model="password"
            class="login-text-field"
            placeholder="پسورد خود را وارد کنید..."
            title="پسورد"
          />
        </div>
        <template>
          <text-field
            v-model="address"
            area
            style="height: 128px; width: 89%"
            class="login-text-field"
            placeholder="آدرس خود را وارد کنید..."
            title="آدرس"
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
  </div>
</template>

<script>
import textField from "../components/core/text-field.vue";
import myButton from "../components/core/my-button.vue";

export default {
	name: "Login",
	components: {
		textField,
		myButton
	},
	data() {
		return {
			isSignupMode: true, // TODO: Place link/button to change this (And Change page title)
			email: "", // TODO: Add validation
			password: "",
			name: "",
			lastName: "",
			address: ""
		};
	},
	methods: {
		login() {
			console.log(this.email + this.password);
		},
		signup() {
			console.log(`${this.email}ss${this.password}`);
		}
	}
};
</script>

<style scoped>
/* Overall Container styling */
#login-container {
  padding-top: 22%;
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
.login-text-field {
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
</style>
