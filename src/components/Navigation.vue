<template>
  <v-navigation-drawer app right floating class="grey lighten-4">
    <v-layout column fill-height>
      <h1 class="display-1 align-self-center my-5 py-5">ועדה פתוחה</h1>
      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in navItems" :key="i">
            <v-list-item-icon class="ma-3">
              <v-icon v-text="item.icon"></v-icon>
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
export default {
  name: "Navigation",
  data: () => ({
    navItems: [
      { icon: "mdi-account-circle", text: "הרשמה / התחברות" },
      { icon: "mdi-bell", text: "ההתראות שלי" },
      { icon: "mdi-school", text: "מהן ועדות התכנון" },
      { icon: "mdi-magnify", text: "חיפוש" }
    ]
  })
};
</script>
