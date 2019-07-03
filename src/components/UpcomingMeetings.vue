<template>
  <v-layout column>
    <h2 class="display-1 primary--text font-weight-bold my-3" tabindex="0">
      הישיבות הקרובות במערכת
    </h2>
    <v-flex>
      <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
      <v-card
        v-else
        v-for="(item, i) in upcomingMeetings"
        :key="i"
        class="ma-1"
        hover
        :to="'meeting/' + item.id"
      >
        <v-card-title>
          <v-layout>
            <h3 class="title text-truncate" v-if="item.committee" tabindex="0">
              {{ item.committee.sid }}
            </h3>
            <v-divider vertical color="black" class="mx-2"></v-divider>
            <h3 class="body-1" tabindex="0" v-if="typeof item.date != 'string'">
              {{ item.date.toLocaleDateString("he") }}
            </h3>
            <v-spacer class="mx-3"></v-spacer>
            <v-icon>mdi-arrow-left</v-icon>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter } from "vuex-class";
import { Getters } from "../helpers/constants";

@Component
export default class UpcomingMeetings extends Vue {
  /**@type {import("../helpers/typings").Meeting[]} */
  @Getter(Getters.UPCOMING_MEETINGS) upcomingMeetings;
  get isLoading() {
    return this.upcomingMeetings == null || this.upcomingMeetings.length == 0;
  }
}
</script>
