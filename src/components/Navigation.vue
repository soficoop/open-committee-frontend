<template>
  <v-navigation-drawer app right floating class="grey lighten-4">
    <v-layout column fill-height py-5>
      <v-img
        src="/img/logo@2x.png"
        contain
        class="ma-3"
        max-height="200px"
      ></v-img>
      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in navItems" :key="i">
            <v-list-item-icon class="mx-3">
              <v-icon v-text="item.icon" color="secondary"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-layout>
  </v-navigation-drawer>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class Navigation extends Vue {
  navItems = [
    { icon: "mdi-account-circle", text: "הרשמה / התחברות" },
    { icon: "mdi-bell", text: "ההתראות שלי" },
    { icon: "mdi-school", text: "מהן ועדות התכנון" },
    { icon: "mdi-magnify", text: "חיפוש" }
  ];
}
</script>
