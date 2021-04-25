import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "خانه",
		component: Home
	},
	{
		path: "/login",
		name: "ورود",
		component: Login
	},
	{
		path: "/profile",
		name: "پروفایل کاربری",
		component: Profile
	}
	/* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue'),
  }, */
];

const router = new VueRouter({
	routes
});

router.afterEach((to) => { // Setting page name on each route change
	Vue.nextTick(() => {
		document.title = to.name;
	});
});
export default router;
