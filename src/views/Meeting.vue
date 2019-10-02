<template>
  <v-container class="pa-md-12">
    <v-layout fill-height wrap align-content-start>
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
              <span v-if="$vuetify.breakpoint.mdAndUp">&nbsp;</span>
              <span v-if="meeting.title">{{ meeting.title }}</span>
              <span v-else>ישיבה מספר {{ meeting.number }}</span>
            </h4>
          </v-flex>
          <v-flex xs12>
            <h5
              class="subtitle-1 primary--text d-inline-block"
              tabindex="0"
              v-if="meeting.date && typeof meeting.date != 'string'"
            >
              <v-icon color="primary">mdi-calendar-blank</v-icon>
              {{ meeting.date.toLocaleDateString("he") }}
            </h5>
          </v-flex>
          <v-flex xs1 py-2 v-if="isMeetingEditable">
            <v-btn color="secondary" :to="`/manage/meeting/${meetingId}`">
              <v-icon left>mdi-pencil</v-icon>עריכת ישיבה
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-if="meeting.background">
        <p>{{ meeting.background }}</p>
      </v-flex>
      <v-flex xs12 my-2 v-if="agendaItems.length">
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
      <v-flex xs12 py-3 v-if="meetingFiles.length">
        <h4 class="title primary--text">
          <span tabindex="0">מסמכים רלוונטים</span>
        </h4>
        <FileCards class="py-1" :files="meetingFiles" />
      </v-flex>
      <v-flex xs12 v-if="meeting.summary">
        <h4 class="title primary--text" tabindex="0">סיכום הישיבה</h4>
        <p>{{ meeting.summary }}</p>
      </v-flex>
      <v-flex xs12 my-3 v-if="otherMeetingsOfCommittee.length">
        <h4 class="title primary--text" tabindex="0">דיונים נוספים של הועדה</h4>
        <MeetingCards :meetings="otherMeetingsOfCommittee"></MeetingCards>
      </v-flex>
      <v-flex xs12 v-if="!meeting.addedManually">
        <a
          :href="meetingIplanUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="secondary--text font-weight-bold px-1"
          >למידע נוסף באתר מנהל התכנון</a
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes, Getters } from "../helpers/constants";
import store from "../plugins/store";
import { Getter, Action } from "vuex-class";
import AgendaCards from "../components/AgendaCards.vue";
import FileCards from "../components/FileCards.vue";
import MeetingCards from "../components/MeetingCards.vue";

@Component({
  components: { MeetingCards, AgendaCards, FileCards }
})
export default class Meeting extends Vue {
  @Action(ActionTypes.FETCH_MANAGABLE_MEETINGS) fetchManagableMeetings;
  /**@type {import("../../graphql/types").Meeting} */
  @Getter(Getters.SELECTED_MEETING) meeting;
  /**@type {import("../../graphql/types").Meeting[]} */
  @Getter(Getters.MANAGABLE_MEETINGS) managableMeetings;

  hoveredPlan = "";

  get meetingFiles() {
    const arr = [
      {
        name: "פרוטוקול הישיבה המלא",
        url: this.meeting.protocol && this.meeting.protocol.url
      },
      {
        name: "סיכום החלטות הישיבה",
        url: this.meeting.decisions && this.meeting.decisions.url
      },
      {
        name: "סדר היום המלא של הישיבה",
        url: this.meeting.transcript && this.meeting.transcript.url
      }
    ].filter(el => el.url);

    if (this.meeting.additionalFiles.length > 0) {
      this.meeting.additionalFiles.forEach(el => {
        delete el.id;
        el.url !== "" && el.name !== "" ? arr.push(el) : null;
      });
    }
    return arr;
  }

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
      headline: meeting.title || `ישיבה מספר ${meeting.number}`,
      date: meeting.date,
      isEditable: this.isMeetingEditable
    }));
  }

  /**
   * @returns {import("../helpers/typings").AgendaCard[]}
   */
  get agendaItems() {
    return this.meeting.plans.map(plan => ({
      id: plan.id,
      headline: plan.type == "תוכנית" ? `תכנית מספר ${plan.number}` : plan.type,
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
    return `https://mavat.iplan.gov.il/SV4/3/${this.meeting.sid}`;
  }

  get isMeetingEditable() {
    return (
      this.$vuetify.breakpoint.mdAndUp &&
      this.managableMeetings.some(meeting => meeting.id == this.meetingId)
    );
  }

  get meetingId() {
    return this.$route.params.meetingId;
  }

  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_MEETING, to.params.meetingId);
    next();
  }

  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_MEETING, to.params.meetingId);
    next();
  }

  async mounted() {
    await this.fetchManagableMeetings();
  }
}
</script>
