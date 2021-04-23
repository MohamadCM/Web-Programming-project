<template>
  <div id="login-container">
    <p class="title">فروشگاه - ورود</p>
    <form id="login-form">
    <text-field
      class="login-text-field"
      placeholder="ایمیل خود را وارد کنید..."
      title="ایمیل" v-model="email"/>
      <text-field
        class="login-text-field"
        placeholder="پسورد خود را وارد کنید..."
        title="پسورد" v-model="password"/>
      <my-button text="ورود"
                 fill
                 back-ground-color="#FFC80A"
                 color="#e30b5d"
                 class="login-form-button"
      :on-click-function="login"/>
    </form>
  </div>
</template>

<script>
import textField from '../components/core/text-field.vue';
import myButton from '../components/core/my-button.vue';

export default {
  name: 'Login',
  components: {
    textField,
    myButton,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log(this.email + this.password);
    },
  },
};
</script>

<style scoped>
/* Overall Container styling */
#login-container {
  padding-top: 20%;
}
/* Title styling */
.title {
  font-family: inherit;
  font-size: 32px;
  color: #0EBAC5;
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
  margin-bottom: 30px;
}
.login-form-button {
  padding: 16px 90px 16px 90px;
  font-weight: bold;
  -webkit-transition: 300ms;
  font-size: 16px;
}
.login-form-button:hover {
  box-shadow: 5px 10px silver;
}
</style>
