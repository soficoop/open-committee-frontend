<template>
  <v-layout
    wrap
    align-content-space-around
    :class="{ 'pa-5': $vuetify.breakpoint.mdAndUp }"
  >
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
