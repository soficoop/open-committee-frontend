<template>
  <v-layout column>
    <h2 class="display-1 primary--text font-weight-bold my-3">
      הישיבות הקרובות במערכת
    </h2>
    <v-card v-for="(item, i) in upcomingMeetings" :key="i" class="ma-1" hover>
      <v-card-title>
        <v-layout>
          <h3 class="title text-truncate">{{ item.committee.sid }}</h3>
          <v-spacer class="mx-3"></v-spacer>
          <h3 class="body-1">{{ item.date.toLocaleDateString("he") }}</h3>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class UpcomingMeetings extends Vue {
  get upcomingMeetings() {
    return this.$store.getters.upcomingMeetings;
  }
}
</script>
