<template>
  <v-layout ma-3 fill-height wrap align-content-start></v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes, Getters } from "../helpers/constants";
import store from "../plugins/store";
import { Getter } from "vuex-class";

@Component
export default class Plan extends Vue {
  @Getter(Getters.SELECTED_PLAN) plan;

  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_PLAN, to.params.planId);
    next();
  }
}
</script>