<template>
  <v-container fill-height>
    <v-layout wrap align-content-space-around>
      <v-flex xs12>
        <h1 class="display-2 font-weight-bold primary--text my-5" tabindex="0">
          ישיבות בתחומי הועדות שלי
        </h1>
        <MeetingCards></MeetingCards>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import MeetingCards from "../components/MeetingCards";
import { ActionTypes } from "../helpers/constants";
import store from "../plugins/store";

@Component({ components: { MeetingCards } })
export default class About extends Vue {
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_USER_COMMITTEE_MEETINGS);
    next();
  }
}
</script>
