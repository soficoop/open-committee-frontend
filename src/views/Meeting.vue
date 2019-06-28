<template>
  <v-layout column ma-5>
    <v-flex xs12 row>
      <h3 class="headline primary--text font-weight-bold d-inline-block right">
        {{ meeting.committee.sid }} /&nbsp;
      </h3>
      <h4 class="title primary--text d-inline-block right">
        ישיבה מספר {{ meeting.sid }}
      </h4>
    </v-flex>
    <h5 class="subtitle-1 primary--text">
      <v-icon color="primary">mdi-calendar-blank</v-icon>
      {{ meeting.date.toLocaleDateString("he") }}
    </h5>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes } from "../constants";
import store from "../store";

@Component
export default class UpcomingMeetings extends Vue {
  async beforeRouteEnter(to, from, next) {
    console.info(this);
    await store.dispatch(ActionTypes.FETCH_MEETING, to.params.meetingId);
    next();
  }
  get meeting() {
    return store.getters.selectedMeeting;
  }
}
</script>
