<template>
  <v-container class="pa-md-12">
    <v-layout fill-height wrap align-content-start>
      <v-flex xs12 pb-3>
        <h3 class="headline primary--text font-weight-black">
          <span v-if="plan.number" tabindex="0">{{ plan.number }}</span>
          <span v-if="plan.number && plan.name">•</span>
          <span v-if="plan.name" tabindex="0">{{ plan.name }}</span>
        </h3>
        <h4 class="title primary--text">
          <span v-if="plan.municipality" tabindex="0">
            {{ plan.municipality }}
          </span>
          <span v-if="plan.municipality && plan.location">•</span>
          <span v-if="plan.location" tabindex="0">{{ plan.location }}</span>
        </h4>
        <h5 class="subtitle-1 primary--text" v-if="plan.status">
          <v-icon color="primary">mdi-update</v-icon>
          <span tabindex="0">{{ plan.status }}</span>
        </h5>
      </v-flex>
      <v-layout xs12 wrap row v-if="plan.targets || plan.sections">
        <v-flex xs12 md8 pa-3>
          <v-flex pb-3 v-if="plan.targets">
            <v-card flat class="pa-4">
              <h4 class="title primary--text" tabindex="0">מטרות</h4>
              <p
                class="whitespace-preline"
                tabindex="0"
                v-html="plan.targets"
              ></p>
            </v-card>
          </v-flex>
          <v-flex pt-3 v-if="plan.sections">
            <v-card flat class="pa-4">
              <h4 class="title primary--text" tabindex="0">
                עיקרי ה{{ planTypeFirstWord }}
              </h4>
              <p
                class="whitespace-preline"
                tabindex="0"
                v-html="plan.sections"
              ></p>
            </v-card>
          </v-flex>
        </v-flex>
        <v-flex xs12 md4 pa-3>
          <v-card flat class="pa-4">
            <h4 class="title primary--text" tabindex="0">נתונים</h4>
            <Map
              class="my-3"
              :query="planLocationQuery"
              v-if="planLocationQuery"
            />
            <v-layout
              py-1
              wrap
              v-for="infoItem in planInformation"
              :key="infoItem.key"
            >
              <v-flex xs4 class="font-weight-semibold">
                <span tabindex="0">{{ infoItem.key }}</span>
              </v-flex>
              <v-flex offset-xs1 xs7>
                <span tabindex="0">{{ infoItem.value }}</span>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <h2 v-else class="display-1 accent--text my-3">
        אין מידע זמין על ה{{ planTypeFirstWord }}
      </h2>
      <v-flex xs12 py-3 v-if="plan.attachedFiles.length">
        <h4 class="title primary--text" tabindex="0">מסמכים רלוונטים</h4>
        <FileCards class="py-1" :files="plan.attachedFiles" />
      </v-flex>
      <v-flex xs12 py-3 v-if="planMeetings && planMeetings.length">
        <h4 class="title primary--text" tabindex="0">
          היסטוריית הדיונים ב{{ planTypeFirstWord }}
        </h4>
        <MeetingCards :meetings="planMeetings"></MeetingCards>
      </v-flex>
      <v-flex xs12 py-3 v-if="plan.comments && plan.comments.length">
        <h4 class="title primary--text" tabindex="0">התייחסויות</h4>
        <Comments></Comments>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { ActionTypes, Getters } from "../helpers/constants";
import store from "../plugins/store";
import { Getter } from "vuex-class";
import MeetingCards from "../components/MeetingCards.vue";
import FileCards from "../components/FileCards.vue";
import Map from "../components/Map.vue";
import Comments from "../components/Comments.vue";

@Component({ components: { MeetingCards, FileCards, Map, Comments } })
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

  get planInformation() {
    return [
      { key: "כתובת", value: this.planLocationQuery },
      { key: "סטטוס", value: this.plan.status },
      { key: "סוג ישות תכנונית", value: this.plan.type },
      { key: "תאריך הפקדה", value: this.plan.submission },
      { key: "תאריך הפקדה", value: this.plan.submission },
      {
        key: "עדכון אחרון",
        value:
          this.plan.lastUpdate > new Date("1970-1-2") &&
          this.plan.lastUpdate.toLocaleDateString("he")
      }
    ].filter(i => i.value);
  }

  get planLocationQuery() {
    return `${this.plan.street || ""} ${this.plan.houseNumber || ""} ${this.plan
      .settlement || ""}`.trim();
  }

  get planTypeFirstWord() {
    return this.plan.type.split()[0];
  }

  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_PLAN, to.params.planId);
    await store.dispatch(ActionTypes.FETCH_MANAGABLE_MEETINGS);
    next();
  }
}
</script>
