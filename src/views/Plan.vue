<template>
  <v-layout fill-height wrap align-content-start>
    <v-flex xs12 pb-3>
      <h3 class="headline primary--text font-weight-black">
        <span v-if="plan.number" tabindex="0">
          תכנית מספר {{ plan.number }}
        </span>
        <span v-if="plan.number && plan.name"> • </span>
        <span v-if="plan.name" tabindex="0">{{ plan.name }}</span>
      </h3>
      <h4 class="title primary--text">
        <span v-if="plan.municipality" tabindex="0">
          {{ plan.municipality }}
        </span>
        <span v-if="plan.municipality && plan.location"> • </span>
        <span v-if="plan.location" tabindex="0">{{ plan.location }}</span>
      </h4>
      <h5 class="subtitle-1 primary--text" v-if="plan.status">
        <v-icon color="primary">mdi-update</v-icon>
        <span tabindex="0">{{ plan.status }}</span>
      </h5>
    </v-flex>
    <v-flex xs12 py-3 v-if="plan.targets">
      <h4 class="title primary--text">
        <span tabindex="0">
          מטרות
        </span>
      </h4>
      <p class="whitespace-preline" tabindex="0">{{ plan.targets }}</p>
    </v-flex>
    <v-flex xs12 py-2 v-if="plan.sections">
      <h4 class="title primary--text">
        <span tabindex="0">
          עיקרי התכנית
        </span>
      </h4>
      <p class="whitespace-preline" tabindex="0">{{ plan.sections }}</p>
    </v-flex>
    <v-flex xs12 py-3 v-if="plan.attachedFiles.length">
      <h4 class="title primary--text">
        <span tabindex="0">
          מסמכים רלוונטים
        </span>
      </h4>
      <FileCards :files="plan.attachedFiles" />
    </v-flex>
    <v-flex xs12 py-3 v-if="planMeetings && planMeetings.length">
      <h4 class="title primary--text">
        <span tabindex="0">
          היסטוריית הדיונים בתכנית
        </span>
      </h4>
      <MeetingCards :meetings="planMeetings"></MeetingCards>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes, Getters } from "../helpers/constants";
import store from "../plugins/store";
import { Getter } from "vuex-class";
import MeetingCards from "../components/MeetingCards.vue";
import FileCards from "../components/FileCards.vue";

@Component({ components: { MeetingCards, FileCards } })
export default class Plan extends Vue {
  /** @type {import("../../graphql/types").Plan} */
  @Getter(Getters.SELECTED_PLAN) plan;
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter(Getters.MANAGABLE_MEETINGS) managableMeetings;

  /** @returns {import("../helpers/typings").MeetingCard[]} */
  get planMeetings() {
    return this.plan.meetings.map(meeting => ({
      headline: meeting.committee && meeting.committee.sid,
      date: meeting.date,
      id: meeting.id,
      isEditable:
        this.$vuetify.breakpoint.mdAndUp &&
        this.managableMeetings.some(managable => managable.id == meeting.id)
    }));
  }

  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_PLAN, to.params.planId);
    await store.dispatch(ActionTypes.FETCH_MANAGABLE_MEETINGS);
    next();
  }
}
</script>
