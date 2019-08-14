import Vue from "vue";
import App from "./App.vue";
import "./helpers/registerHooks";
import router from "./plugins/router";
import store from "./plugins/store";
import "./plugins/registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "./plugins/leaflet";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
