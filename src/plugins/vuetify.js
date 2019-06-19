import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#004359",
        secondary: "#F2EEEA",
        accent: "#80A1AC"
      }
    }
  },
  rtl: true
});
