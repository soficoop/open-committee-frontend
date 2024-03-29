<template>
  <v-app class="background">
    <div v-if="$vuetify.breakpoint.mdAndDown" class="background">
      <v-app-bar app color="lightBg" fixed height="70">
        <v-fab-transition>
          <v-app-bar-nav-icon
            @click="isNavOpen = true"
            v-if="$route.path == '/'"
          ></v-app-bar-nav-icon>
          <v-btn icon v-else @click="$router.go(-1)" tag="a">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-fab-transition>
        <router-link to="/">
          <v-img
            src="/img/logo@2x.png"
            contain
            alt="חיים וסביבה"
            class="ma-8"
            max-height="50px"
          ></v-img>
        </router-link>
      </v-app-bar>
    </div>
    <Navigation :isOpen.sync="isNavOpen" />
    <Login />
    <Navigation
      v-if="$vuetify.breakpoint.mdAndDown"
      :isOpen="isNavOpen"
      @openChanged="value => (isNavOpen = value)"
    ></Navigation>
    <Header v-if="$vuetify.breakpoint.mdAndUp"></Header>
    <!-- <v-snackbar
      v-if="this.$route.path !== '/'"
      :timeout="-1"
      :value="isLoginPromptVisible"
      bottom
      :right="$vuetify.breakpoint.smAndUp"
      light
      multi-line
    >
      <v-row justify="center" class="py-1">
        <div class="flex-shrink-1">
          <v-btn
            icon
            class="p-absolute s-close-login-prompt"
            @click="isLoginPromptVisible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <h3 class="text-h6 my-2" tabindex="0">התחברו כדי להישאר מעודכנים!</h3>
          <v-btn
            block
            class="my-2"
            depressed
            color="secondary"
            @click="showLogin"
          >
            התחברות
          </v-btn>
        </div>
      </v-row>
    </v-snackbar> -->
    <v-main class="background">
      <v-overlay v-model="isLoading" z-index="99999999">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-fade-transition mode="out-in">
        <router-view class="flex-grow-1"></router-view>
      </v-fade-transition>
      <v-footer padless>
        <v-container>
          <v-row>
            <v-col class="d-flex justify-center align-center">
              <h4
                class="subtitle-1 primary--text text-center mx-3"
                tabindex="0"
              >
                © 2021 חיים וסביבה
              </h4>
              <router-link to="/terms">תנאי השימוש</router-link>
              <v-divider vertical class="mx-2" />
              <router-link to="/privacy-policy">מדיניות הפרטיות</router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-main>
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
.s-close-login-prompt {
  left: 0;
}
.v-main__wrap {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
.s-pointer-events-none {
  pointer-events: none;
}
</style>

<script>
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Login from "./components/Login";
import Component from "vue-class-component";
import Vue from "vue";
import { Action, Getter, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    Navigation,
    Login,
    Header
  }
})
export default class App extends Vue {
  @Action fetchUpcomingMeetings;
  @Action refreshUser;
  @Action signOut;
  @Getter isLoading;
  @Getter user;
  @Mutation setLoading;
  @Mutation setLoginDialog;
  isNavOpen = false;
  isLoginPromptVisible = false;

  @Watch("$route")
  async handleRouteChanged() {
    if (this.$route.query.token) {
      await this.refreshUser(this.$route.query.token);
      this.$router.push({ query: undefined });
      return;
    }
    if (this.$route.path.startsWith("/login")) {
      this.isLoginPromptVisible = false;
    }
  }

  showLogin() {
    this.isLoginPromptVisible = false;
    this.setLoginDialog(true);
  }

  async mounted() {
    this.setKeyboardAccessibility();
    this.fetchUpcomingMeetings();
    try {
      await this.refreshUser();
      setTimeout(() => {
        this.isLoginPromptVisible =
          !this.$route.path.startsWith("/login") && !this.user;
      }, 5000);
    } catch (e) {
      this.signOut();
      this.showLogin();
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * prevents tabindex accessibility feature from hurting ux
   */
  setKeyboardAccessibility() {
    document.addEventListener("mousedown", () =>
      document.body.classList.add("using-mouse")
    );
    document.addEventListener("keydown", () =>
      document.body.classList.remove("using-mouse")
    );
  }
}
</script>
