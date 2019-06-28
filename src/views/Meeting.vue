<template>
  <v-layout ma-3 fill-height wrap align-content-start>
    <v-flex xs12 my-5>
      <v-layout column xs12>
        <v-flex xs12>
          <h3
            class="headline primary--text font-weight-bold d-inline-block right"
            tabindex="0"
          >
            {{ meeting.committee.sid }} /&nbsp;
          </h3>
          <h4 class="title primary--text d-inline-block right" tabindex="0">
            ישיבה מספר {{ meeting.sid }}
          </h4>
        </v-flex>
        <v-flex xs12>
          <h5
            class="subtitle-1 primary--text"
            tabindex="0"
            v-if="typeof meeting.date != 'string'"
          >
            <v-icon color="primary">mdi-calendar-blank</v-icon>
            {{ meeting.date.toLocaleDateString("he") }}
          </h5>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 my-3>
      <v-layout wrap xs12 my-3>
        <v-flex xs12 px-1>
          <h4 class="title primary--text" tabindex="0">
            סדר יום - סעיפי הישיבה
          </h4>
        </v-flex>
        <v-flex xs12 sm6 md4 v-for="plan in meeting.plans" :key="plan.id" pa-1>
          <v-card tabindex="0" color="accent" dark height="100%" hover>
            <v-card-text class="subtitle-2" tabindex="0">
              <v-icon small>mdi-clipboard-text</v-icon>
              תכנית מספר {{ plan.number }}
            </v-card-text>
            <v-card-title class="title" tabindex="0">
              {{ plan.name }}
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 my-3 mx-1>
      <h4 class="title primary--text" tabindex="0">דיונים נוספים של הועדה</h4>
      <v-card
        v-for="item in meeting.committee.meetings"
        :key="item.id"
        class="my-1"
        hover
        :to="'/meeting/' + item.id"
      >
        <v-card-title>
          <v-layout>
            <h3 class="title text-truncate" tabindex="0">
              ישיבה מספר {{ item.sid }}
            </h3>
            <v-spacer class="mx-3"></v-spacer>
            <h3 class="body-1" tabindex="0" v-if="typeof item.date != 'string'">
              {{ item.date.toLocaleDateString("he") }}
            </h3>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes } from "../helpers/constants";
import store from "../store";
import { Getter } from "vuex-class";

@Component
export default class UpcomingMeetings extends Vue {
  @Getter("selectedMeeting")
  meeting;
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_MEETING, to.params.meetingId);
    next();
  }

  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_MEETING, to.params.meetingId);
    next();
  }
}
</script>
