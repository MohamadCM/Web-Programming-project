<template>
  <div
    v-if="isLogged"
  >
    <div
      id="dropdown"
      @mouseenter="hover = true"
    >
      {{ username }}
      <i
        id="arrow"
        class="fas fa-chevron-down"
      />
    </div>
    <transition name="slide">
      <div
        v-if="hover"
        id="dropdown__content"
        @mouseleave="hover = false"
      >
        <div
          class="dropdown__content-item"
          style="margin-top: 20px"
          @click="$router.push('/profile')"
        >
          <p
            class="dropdown__content-item__text"
          >
            پروفایل
          </p>
        </div>
        <div class="dropdown__content-item">
          <p class="dropdown__content-item__text">
            خروج از حساب
          </p>
        </div>
      </div>
    </transition>
  </div>
  <button
    v-else
    id="loginButton"
    @click="loginOnClick"
  >
    ورود / ثبت نام
  </button>
</template>

<script>
import auth from "../controller/authorization";

export default {
	name: "ButtonLogin",
	data() {
		return {
			isLogged: true,
			username: "محمد",
			hover: false
		};
	},
	mounted() {
		this.isLogged = auth.isLoggedIn();
	},
	methods: {
		loginOnClick() {
			if (!this.$router.currentRoute.path.includes("login")) this.$router.push("/login");
		}
	}
};
</script>

<style scoped>
/* Dropdown button styling */
#dropdown {
  background: white;
  border: solid 2px #FFC80A;
  padding-top: 10px;
  padding-bottom: 10px;
  bottom: 5px;
  text-align: center;
  font-size: 16px;
  border-radius: 24px;
  cursor: default;
  position: relative;
  z-index: 2; /* Place over dropdown content */
}
/* Dropdown background color on hover */
#dropdown:hover {
  background: #FFC80A;
}

/* Content of dropdown styles */
#dropdown__content {
  line-height: 20px;
  font-weight: bold;
  color: black;
  font-family: inherit;
  font-size: 14px;
  background: #E1E1E1;
  padding: 5px 5px 10px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  cursor: default;
  position: relative;
  top: -25px;
  z-index: 1;
  /* Transition styles */
  transform-origin: top;
  transition: transform 300ms ease-in-out;
}
/* Each item of content styles */
.dropdown__content-item:hover {
  background: #EDEDED;
}
/* Each item of content's text styles */
.dropdown__content-item__text {
  padding-top: 5px;
  padding-bottom: 5px;
}
@media (max-width: 767px) {
  /* Hide arrow on small screens */
 #arrow {
    display: none;
  }
  /*Smaller fonts*/
  #dropdown{
    font-size: 10px;
  }
  #dropdown__content {
    font-size: 8px;
  }
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
/* Dropdown slide effect animation */
.slide-enter, .slide-leave-to{
  transform: scaleY(0);
}
</style>
