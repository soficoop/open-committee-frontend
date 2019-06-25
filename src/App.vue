<template>
  <v-app class="background">
    <Navigation></Navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Navigation from "./components/Navigation";
import Component from "vue-class-component";
import Vue from "vue";
@Component({
  components: {
    Home,
    Navigation
  }
})
export default class App extends Vue {
  mounted() {
    this.$store.dispatch("fetchUpcomingMeetings");
  }
}
</script>
