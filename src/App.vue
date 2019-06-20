<template>
  <v-app class="background">
    <Navigation></Navigation>
    <v-content>
      <Home></Home>
    </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    Home,
    Navigation
  },
  data: () => ({
    navItems: [
      { icon: "mdi-account-circle", text: "הרשמה / התחברות" },
      { icon: "mdi-bell", text: "ההתראות שלי" },
      { icon: "mdi-school", text: "מהן ועדות התכנון" }
    ]
  })
};
</script>
