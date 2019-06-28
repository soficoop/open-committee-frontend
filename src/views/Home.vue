<template>
  <v-layout wrap align-content-space-around>
    <v-flex xs12>
      <h1 class="display-2 font-weight-bold primary--text my-5" tabindex="0">
        ברוכים הבאים למערכת ועדה פתוחה
      </h1>
      <p tabindex="0">
        המערכת שלנו מנגישה לציבור דיונים בנושאי תכנון ובנייה בועדות התכנון
        בישראל, ומזמינה אתכם להגיב ולנהל דיון, יחד עם נציגי הארגונים הירוקים
        בועדות השונות.
      </p>
    </v-flex>
    <v-flex xs12>
      <UpcomingMeetings></UpcomingMeetings>
    </v-flex>
  </v-layout>
</template>

<script>
import UpcomingMeetings from "../components/UpcomingMeetings";
import Component from "vue-class-component";
import Vue from "vue";
@Component({
  components: { UpcomingMeetings }
})
export default class Home extends Vue {}
</script>
