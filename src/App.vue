<template>
  <v-app class="background">
    <Navigation></Navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<style>
body.using-mouse :focus {
  outline: none;
}
</style>

<script>
import Navigation from "./components/Navigation";
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes } from "./constants";

@Component({
  components: {
    Navigation
  }
})
export default class App extends Vue {
  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_UPCOMING_MEETINGS);
    document.addEventListener("mousedown", () =>
      document.body.classList.add("using-mouse")
    );
    document.addEventListener("keydown", () =>
      document.body.classList.remove("using-mouse")
    );
  }
}
</script>
