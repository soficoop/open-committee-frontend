<template>
  <v-toolbar height="166px" color="#C2EBF3">
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
      <router-link to="/about"> אודות </router-link>
      <v-divider vertical></v-divider>
      <router-link to="/#"> ישיבות קרובות </router-link>
      <v-divider vertical></v-divider>
      <router-link to="/contact"> צור קשר </router-link>
      <v-divider vertical></v-divider>
      <router-link to="/login"> התחברות </router-link>
    </div>
    <v-spacer></v-spacer>
    <div>Picture</div>
    <v-spacer></v-spacer>
  </v-toolbar>
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
  height: 20px;
  margin: 0 2rem;
  border: solid 1px black;
}
</style>
