<template>
  <v-navigation-drawer
    app
    right
    floating
    class="grey lighten-4"
    v-model="isNavOpen"
  >
    <v-layout column fill-height py-5>
      <router-link to="/">
        <v-img
          src="/img/logo@2x.png"
          contain
          alt="חיים וסביבה"
          class="ma-4"
          max-height="200px"
        ></v-img>
      </router-link>
      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in visibleNavItems"
            :key="item.to"
            :to="item.to"
            @click="executeNavItemClick(item)"
          >
            <v-list-item-icon class="mx-3">
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
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { Getters, ActionTypes } from "../helpers/constants";

@Component({
  props: { isOpen: Boolean }
})
export default class Navigation extends Vue {
  @Getter(Getters.JWT) jwt;
  @Action(ActionTypes.SIGN_OUT) signOut;

  get visibleNavItems() {
    return this.navItems.filter(
      n => n.visible == null || n.visible.apply(this)
    );
  }

  get isNavOpen() {
    return this.isOpen;
  }

  set isNavOpen(value) {
    this.$emit("openChanged", value);
  }

  executeNavItemClick(item) {
    item.click && item.click.apply(this);
  }

  navItems = [
    {
      icon: "mdi-account-circle",
      text: "הרשמה / התחברות",
      to: "/login",
      visible() {
        return !this.jwt;
      }
    },
    {
      icon: "mdi-bell",
      text: "ההתראות שלי",
      to: "/notications",
      visible() {
        return this.jwt;
      }
    },
    { icon: "mdi-school", text: "מהן ועדות התכנון", to: "/about" },
    { icon: "mdi-magnify", text: "חיפוש", to: "/search" },
    {
      icon: "mdi-logout",
      text: "התנתקות",
      to: "/login",
      visible() {
        return this.jwt;
      },
      click() {
        this.signOut();
      }
    }
  ];
}
</script>
