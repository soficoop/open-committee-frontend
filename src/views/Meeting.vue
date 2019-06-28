<template>
  <v-layout column>
    <h2 class="display-1 primary--text font-weight-bold my-3">
      הישיבות הקרובות במערכת
    </h2>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class UpcomingMeetings extends Vue {
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next(); // needs to be called to confirm the navigation
  }
}
</script>
