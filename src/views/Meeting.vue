<template>
  <v-layout ma-3 fill-height wrap align-content-start @click="hoveredPlan = ''">
    <v-flex xs12 my-3>
      <v-layout column xs12>
        <v-flex xs12>
          <h3
            class="headline primary--text font-weight-bold d-inline-block right"
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
        <v-flex xs12 sm6 md4 v-for="plan in meeting.plans" :key="plan.id" pa-1>
          <v-hover
            v-slot:default="{ hover }"
            :disabled="$vuetify.breakpoint.smAndDown"
          >
            <v-card
              tabindex="0"
              color="accent"
              dark
              height="100%"
              hover
              @click.stop="handlePlanClicked(plan)"
            >
              <v-slide-y-transition mode="out-in">
                <v-layout
                  v-if="hover || hoveredPlan == plan.id"
                  class="primary"
                  wrap
                  fill-height
                  align-content-center
                  absolute
                >
                  <v-flex xs12 ma-1 px-2 v-if="plan.status">
                    <span class="teal--text text--accent-2">סטטוס: </span>
                    <span>{{ plan.status }}</span>
                  </v-flex>
                  <v-flex xs12 ma-1 px-2 v-if="plan.lastUpdate">
                    <span class="teal--text text--accent-2">עדכון אחרון: </span>
                    <span>{{ plan.lastUpdate.toLocaleDateString("he") }}</span>
                  </v-flex>
                  <v-flex xs12 ma-1 px-2 v-if="plan.location">
                    <span class="teal--text text--accent-2">מיקום: </span>
                    <span>{{ plan.location }}</span>
                  </v-flex>
                </v-layout>
                <v-layout row wrap v-else tag="section">
                  <v-card-text class="subtitle-2" tabindex="0">
                    <v-icon small>mdi-clipboard-text</v-icon>
                    {{ plan.type }}: {{ plan.number }}
                  </v-card-text>
                  <v-card-title class="title" tabindex="0">
                    {{ plan.name }}
                  </v-card-title>
                </v-layout>
              </v-slide-y-transition>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 my-3 mx-1>
      <h4 class="title primary--text" tabindex="0">דיונים נוספים של הועדה</h4>
      <MeetingCards :meetings="otherMeetingsOfCommittee"></MeetingCards>
    </v-flex>
    <v-flex xs12>
      <a :href="meetingIplanUrl" target="_blank" rel="noopener noreferrer">
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
import MeetingCards from "../components/MeetingCards";

@Component({
  components: { MeetingCards }
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
