<template>
  <v-app-bar dense app height="130px" color="lightBg" elevation="20">
    <v-img
      height="100px"
      width="100px"
      src="../assets/cloud.svg"
      alt="cloud"
      contain
      class="cloud"
    />
    <v-spacer></v-spacer>
    <div>
      <router-link to="/">
        <v-img
          src="/img/logo@2x.png"
          contain
          alt="חיים וסביבה"
          class="ma-8"
          max-width="149px"
          max-height="90px"
        ></v-img>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div>
      <router-link to="/about" class="font-weight-medium">אודות</router-link>
      <v-divider
        vertical
        :color="$vuetify.theme.themes.light.primary"
      ></v-divider>
      <router-link to="/subscriptions" class="font-weight-medium"
        >ההתראות שלי</router-link
      >
      <v-divider
        vertical
        :color="$vuetify.theme.themes.light.primary"
      ></v-divider>
      <router-link to="/contact" class="font-weight-medium"
        >צור קשר</router-link
      >
      <v-divider
        vertical
        :color="$vuetify.theme.themes.light.primary"
      ></v-divider>
      <router-link v-if="!isSignedIn" to="/login" class="font-weight-medium">
        התחברות
      </router-link>
      <span v-else @click="clickSignOut()">
        <router-link to="/" class="font-weight-medium"> התנתקות </router-link>
      </span>
    </div>
    <v-spacer></v-spacer>
    <div class="align-self-end">
      <v-img height="115px" src="../assets/sun-cloud.svg" alt="sun" contain />
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Action, Getter } from "vuex-class";

@Component()
export default class Header extends Vue {
  @Getter user;
  @Action signOut;

  get isSignedIn() {
    return this.user !== null;
  }

  clickSignOut() {
    this.signOut();
  }
}
</script>
<style scoped>
a {
  font-size: 22px;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
hr {
  height: 25px;
  margin: 0 2rem;
  border: solid 1.3px;
}
.cloud {
  position: absolute;
  right: -2%;
  bottom: 1%;
}
</style>
