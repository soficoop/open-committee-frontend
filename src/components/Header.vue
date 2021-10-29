<template>
  <v-app-bar app dense height="165px" color="lightBg" elevation="20">
    <v-spacer></v-spacer>
    <div>
      <router-link to="/">
        <v-img
          src="/img/logo@2x.png"
          contain
          alt="חיים וסביבה"
          class="ma-8"
          max-width="149px"
          max-height="117px"
        ></v-img>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div>
      <router-link to="/about">אודות</router-link>
      <v-divider
        vertical
        :color="$vuetify.theme.themes.light.primary"
      ></v-divider>
      <router-link to="/#">ישיבות קרובות</router-link>
      <v-divider
        vertical
        :color="$vuetify.theme.themes.light.primary"
      ></v-divider>
      <router-link to="/contact">צור קשר</router-link>
      <v-divider
        vertical
        :color="$vuetify.theme.themes.light.primary"
      ></v-divider>
      <router-link to="/login">התחברות</router-link>
    </div>
    <v-spacer></v-spacer>
    <div class="align-self-end">
      <v-img
        max-height="151px"
        max-width="273px"
        src="../assets/sun-cloud.svg"
        alt="sun"
      />
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";

@Component()
export default class Header extends Vue {}
</script>
<style scoped>
a {
  text-decoration: none;
}

hr {
  height: 15px;
  margin: 0 2rem;
  border: solid 0.5px black;
}
</style>
