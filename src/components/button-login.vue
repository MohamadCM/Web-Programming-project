<template>
  <div v-if="isLogged" class="dropdown hover">
    <a href="#" style="background: #FFC80A;">{{ username }}</a>
    <ul>
      <li><a href="#" style="font-family:  sans-serif !important; ">پروفایل</a></li>
      <li><a href="#">خروج از حساب</a></li>
    </ul>
  </div>
  <button v-else
           id="loginButton"
           @click="loginOnClick">
    ورود / ثبت نام
  </button>
</template>

<script>
import auth from '../controller/authorization';

export default {
  name: 'button-login',
  data() {
    return {
      isLogged: true,
      username: 'محمد',
    };
  },
  mounted() {
    this.isLogged = auth.isLoggedIn();
  },
  methods: {
    loginOnClick() {
      if (!this.$router.currentRoute.path.includes('login')) this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.dropdown {
  display: inline-block;
  margin-right: 10px;
  bottom: 5px;
  position: relative;
  text-align: center;
  font-size: 16px;
}
.dropdown.toggle > input {
  display: none;
}
.dropdown > a, .dropdown.toggle > label {
  border-radius: 20px;
  box-shadow: 0 6px 5px -5px rgba(0,0,0,0.3);
}
/* Arrow */
.dropdown > a::after, .dropdown.toggle > label::after {
  content: '\142F';
  float: left;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 5px solid transparent;
  position: relative;
  left: 5px;
  font-size: 12px;
}
/* Hide arrow on small screens */
@media (max-width: 767px) {
  .dropdown > a::after, .dropdown.toggle > label::after {
    display: none;
  }
}
.dropdown ul {
  list-style-type: none;
  display: block;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  box-shadow: 0 6px 5px -5px rgba(0,0,0,0.3);
  overflow: hidden;
}
.dropdown a, .dropdown.toggle > label {
  display: block;
  padding: 0 0 0 10px;
  text-decoration: none;
  line-height: 40px;
  text-transform: uppercase;
  font-weight: bold;
  color: black;
  font-family: IranianSans sans-serif;
  font-size: 16px;
  background: #E1E1E1;
}
.dropdown li {
  height: 0;
  overflow: hidden;
  transition: all 300ms;
}
.dropdown.hover li {
  transition-delay: 300ms;
}
.dropdown li:first-child a {
  border-radius: 2px 2px 0 0;
}
.dropdown li:last-child a {
  border-radius: 0 0 2px 2px;
}
.dropdown li:first-child a::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #E1E1E1;
  margin: -10px 0 0 30px;
}
.dropdown a:hover, .dropdown.toggle > label:hover, .dropdown.toggle > input:checked ~ label {
  background-color: #EDEDED;
  color: #666;
}
.dropdown > a:hover::after, .dropdown.toggle > label:hover::after,
.dropdown.toggle > input:checked ~ label::after {
  border-top-color: #AAA;
}
.dropdown li:first-child a:hover::before {
  border-bottom-color: #EEE;
}
.dropdown.hover:hover li, .dropdown.toggle > input:checked ~ ul li {
  height: 40px;
}
.dropdown.hover:hover li:first-child, .dropdown.toggle > input:checked ~ ul li:first-child {
  padding-top: 15px;
}

#loginButton {
  font-family: inherit;
  font-size: 15px;
  border-radius: 20px;
  border: 0 solid;
  /*Border's CSS*/
  box-shadow: 0 0 3px 2px #FFC80A;
  /*Location's CSS*/
  float: right;
  padding: 15px;
  position: relative;
  margin: 5px 0;
  background: transparent none;
}
/* Login bottom size on smaller screens */
@media screen and (max-width: 960px) {
  #loginButton {
    font-size: 10px;
  }
}
#loginButton:hover {
  background-color: #FFC80A;
}
</style>
