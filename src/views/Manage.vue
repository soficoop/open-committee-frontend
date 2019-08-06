<template>
  <v-layout wrap align-content-space-around>
    <v-flex xs12>
      <h1 class="display-2 font-weight-bold primary--text my-5" tabindex="0">
        ישיבות בתחומי הועדות שלי
      </h1>
      <h2 v-if="meetings.length == 0" class="display-1 accent--text my-3">
        אין ישיבות בתחומי הועדות שלי
      </h2>
      <v-btn color="secondary" to="/manage/meeting/new" large class="my-3">
        <v-icon left>mdi-plus</v-icon>
        הוספת ישיבה חדשה
      </v-btn>
      <MeetingCards
        :meetings="meetings"
        editable
        @edit="handleEditClicked"
      ></MeetingCards>
    </v-flex>
  </v-layout>
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
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter(Getters.MANAGABLE_MEETINGS) _meetings;
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_MANAGABLE_MEETINGS);
    next();
  }

  /**
   * Gets called when the user clicks the "edit meeting" button
   * @param {string} id ID of clicked meeting
   */
  handleEditClicked(id) {
    this.$router.push(`/manage/meeting/${id}`);
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
