<template>
  <v-container fill-height>
    <v-layout wrap align-content-space-around>
      <v-flex xs12>
        <h1 class="display-2 font-weight-bold primary--text my-5" tabindex="0">
          ישיבות בתחומי הועדות שלי
        </h1>
        <MeetingCards :meetings="meetings"></MeetingCards>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import MeetingCards from "../components/MeetingCards";
import { ActionTypes, Getters } from "../helpers/constants";
import store from "../plugins/store";
import { Getter } from "vuex-class";

@Component({ components: { MeetingCards } })
export default class Manage extends Vue {
  /** @type {import("../helpers/typings").Meeting[]} */
  @Getter(Getters.MANAGABLE_MEETINGS) _meetings;
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_MANAGABLE_MEETINGS);
    next();
  }
  /** @returns {import("../helpers/typings").MeetingCard[]} */
  get meetings() {
    return this._meetings.map(meeting => ({
      headline: meeting.committee.sid,
      id: meeting.id,
      date: meeting.date
    }));
  }
}
</script>
