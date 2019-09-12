import Vue from "vue";
import Vuetify from "vuetify/lib";
import he from "vuetify/es5/locale/he";

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
        info: "#99B4BD",
        background: "#F2EEEA",
        error: "#C05246"
      }
    }
  },
  lang: {
    locales: { he },
    current: "he"
  },
  rtl: true
});
