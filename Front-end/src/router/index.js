import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";

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
	},
	{
		path: "/admin",
		name: "ادمین",
		component: Admin
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
