import "@babel/polyfill";
import "mutationobserver-shim";
import "./custom.scss";
import "./plugins/bootstrap";
import "./plugins/cookies";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
