import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/collect",
    name: "collect",
    component: () => import("../views/Collect.vue")
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/Categories.vue")
  },
  {
    path: "/planning",
    name: "planning",
    component: () => import("../views/Planning.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
