<template>
  <v-app class="background">
    <Navigation></Navigation>
    <v-content>
      <v-container fill-height>
        <router-view></router-view>
      </v-container>
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
import { ActionTypes } from "./helpers/constants";
import { Action } from "vuex-class";

@Component({
  components: {
    Navigation
  }
})
export default class App extends Vue {
  @Action(ActionTypes.FETCH_UPCOMING_MEETINGS) fetchUpcomingMeetings;
  mounted() {
    this.fetchUpcomingMeetings();
    // prevent tabindex accessibility feature from hurting ux
    document.addEventListener("mousedown", () =>
      document.body.classList.add("using-mouse")
    );
    document.addEventListener("keydown", () =>
      document.body.classList.remove("using-mouse")
    );
  }
}
</script>
