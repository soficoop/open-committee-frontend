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
        secondary: "#47AA7C",
        accent: "#45979B",
        background: "#F2EEEA"
      }
    }
  },
  rtl: true
});
