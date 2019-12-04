module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/main.scss"`
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
