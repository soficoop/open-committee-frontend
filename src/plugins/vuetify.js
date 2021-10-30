import Vue from "vue";
import Vuetify from "vuetify/lib";
import he from "vuetify/es5/locale/he";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#004359",
        secondary: "#47AA7C",
        success: "#47AA7C",
        accent: "#45979B",
        lighterBg: "#e0faff",
        lightBg: "#C2EBF3",
        info: "#99B4BD",
        background: "#F2EEEA",
        error: "#C05246",
      },
    },
  },
  lang: {
    locales: { he },
    current: "he",
  },
  rtl: true,
});
