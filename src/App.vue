<template>
  <v-app class="background">
    <div v-if="$vuetify.breakpoint.mdAndDown" class="py-5 background">
      <v-app-bar dark color="primary" hide-on-scroll fixed>
        <v-fab-transition>
          <v-app-bar-nav-icon
            @click="isNavOpen = true"
            v-if="$route.path == '/'"
          ></v-app-bar-nav-icon>
          <v-btn icon v-else @click="$router.go(-1)" tag="a">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-toolbar-title @click="$router.push('/')">ועדה פתוחה</v-toolbar-title>
      </v-app-bar>
    </div>
    <Navigation
      :isOpen="isNavOpen"
      @openChanged="value => (isNavOpen = value)"
    ></Navigation>
    <v-content class="background">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>
<style>
body.using-mouse :focus {
  outline: none;
}
.s-border-bottom {
  border-bottom: 1px solid;
  border-color: var(--v-background-base);
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
  @Action(ActionTypes.REFRESH_USER) refreshUser;
  mounted() {
    this.fetchUpcomingMeetings();
    this.refreshUser();
    // prevent tabindex accessibility feature from hurting ux
    document.addEventListener("mousedown", () =>
      document.body.classList.add("using-mouse")
    );
    document.addEventListener("keydown", () =>
      document.body.classList.remove("using-mouse")
    );
  }
  isNavOpen = this.$vuetify.breakpoint.mdAndUp;
}
</script>
