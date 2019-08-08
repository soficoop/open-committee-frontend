<template>
  <v-layout wrap align-content-space-around>
    <v-flex xs12>
      <h1
        :class="{
          'headline font-weight-black primary--text mb-3':
            $vuetify.breakpoint.smAndDown,
          'display-2 font-weight-black primary--text mb-3':
            $vuetify.breakpoint.mdAndUp
        }"
        tabindex="0"
      >
        ברוכים הבאים למערכת ועדה פתוחה
      </h1>
      <v-flex xs12 md7>
        <p tabindex="0" class="primary--text">
          המערכת שלנו מנגישה לציבור דיונים בנושאי תכנון ובנייה בועדות התכנון
          בישראל, ומזמינה אתכם להגיב ולנהל דיון, יחד עם נציגי הארגונים הירוקים
          בועדות השונות.
        </p>
      </v-flex>
    </v-flex>
    <v-flex xs12>
      <h2 class="headline primary--text font-weight-bold my-3" tabindex="0">
        הישיבות הקרובות במערכת
      </h2>
      <MeetingCards :meetings="upcomingMeetingCards"></MeetingCards>
    </v-flex>
  </v-layout>
</template>

<script>
import MeetingCards from "../components/MeetingCards";
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { Getters, ActionTypes } from "../helpers/constants";
@Component({
  components: { MeetingCards }
})
export default class Home extends Vue {
  @Action(ActionTypes.FETCH_MANAGABLE_MEETINGS) fetchManagableMeetings;
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter(Getters.UPCOMING_MEETINGS) upcomingMeetings;
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter(Getters.MANAGABLE_MEETINGS) managableMeetings;
  async mounted() {
    await this.fetchManagableMeetings();
  }
  /** @type {import("../helpers/typings").MeetingCard[]} */
  get upcomingMeetingCards() {
    return this.upcomingMeetings.map(meeting => ({
      id: meeting.id,
      headline: meeting.committee.sid,
      date: meeting.date,
      isEditable: this.managableMeetings.some(
        managableMeeting => managableMeeting.id == meeting.id
      )
    }));
  }
}
</script>
