<template>
  <v-layout fill-height wrap align-content-start class="pa-md-12">
    <v-flex xs12 my-3>
      <v-layout column xs12>
        <v-flex xs12>
          <h3
            class="headline primary--text font-weight-black d-inline-block right"
            tabindex="0"
          >
            {{ meeting.committee.sid }} /
          </h3>
          <h4 class="title primary--text d-inline-block right" tabindex="0">
            &nbsp;ישיבה מספר {{ meeting.number }}
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
        <AgendaCards
          :items="agendaItems"
          :hoveredItem="hoveredPlan"
        ></AgendaCards>
      </v-layout>
    </v-flex>
    <v-flex xs12 my-3 mx-1>
      <h4 class="title primary--text" tabindex="0">דיונים נוספים של הועדה</h4>
      <MeetingCards :meetings="otherMeetingsOfCommittee"></MeetingCards>
    </v-flex>
    <v-flex xs12>
      <a
        :href="meetingIplanUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="secondary--text font-weight-bold px-1"
      >
        למידע נוסף באתר מנהל התכנון
      </a>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes, Getters } from "../helpers/constants";
import store from "../plugins/store";
import { Getter } from "vuex-class";
import AgendaCards from "../components/AgendaCards";
import MeetingCards from "../components/MeetingCards";

@Component({
  components: { MeetingCards, AgendaCards }
})
export default class Meeting extends Vue {
  /**@type {import("../helpers/typings").Meeting} */
  @Getter(Getters.SELECTED_MEETING) meeting;

  hoveredPlan = "";

  handlePlanClicked(plan) {
    if (this.$vuetify.breakpoint.mdAndUp) {
      this.$router.push(`/plan/${plan.id}`);
    } else {
      if (this.hoveredPlan == plan.id) {
        this.$router.push(`/plan/${plan.id}`);
      } else {
        this.hoveredPlan = plan.id;
      }
    }
  }

  /** @type {import("../helpers/typings").MeetingCard[]} */
  get otherMeetingsOfCommittee() {
    return this.meeting.committee.meetings.map(meeting => ({
      id: meeting.id,
      headline: `ישיבה מספר ${meeting.number}`,
      date: meeting.date
    }));
  }

  /**
   * @returns {import("../helpers/typings").AgendaCard[]}
   */
  get agendaItems() {
    return this.meeting.plans.map(plan => ({
      id: plan.id,
      headline: plan.type == "תוכנית" ? `תכנית מספר ${plan.number}` : "נושא",
      description: plan.name,
      bullets: [
        { key: "סטטוס", value: plan.status },
        { key: "עדכון אחרון", value: plan.lastUpdate.toLocaleDateString("he") },
        { key: "מיקום", value: plan.location }
      ],
      click: () => this.handlePlanClicked(plan)
    }));
  }

  get meetingIplanUrl() {
    return `http://mavat.moin.gov.il/mavatps/Forms/SV8.1.aspx?MeetingID=${
      this.meeting.sid
    }`;
  }

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
