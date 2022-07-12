<template>
  <v-container class="pa-md-12">
    <div v-if="!organizationMode">
      <v-row wrap align-content-space-around>
        <v-col cols="12">
          <h1
            :class="{
              'headline font-weight-black primary--text mb-3':
                $vuetify.breakpoint.smAndDown,
              'display-2 font-weight-black primary--text mb-3':
                $vuetify.breakpoint.mdAndUp
            }"
            tabindex="0"
          >
            ברוכים הבאים לוועדה פתוחה
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p tabindex="0">
            ועדה פתוחה היא פלטפורמה להשפעה על תהליכי התכנון והבנייה. המערכת
            מנגישה את סדרי היום של ועדות התכנון ומאפשרת לכם - תושבות ותושבים,
            פעילי סביבה, מתכננות, מתכננים, אדריכלים ואנשי מקצוע אחרים - להשתתף
            באופן פעיל בתהליכי קבלת ההחלטות בתחום.
          </p>
          <p tabindex="0">
            כאן תוכלו להירשם להתראות מדיוני הוועדות המחוזיות והארציות, ולקבל
            באימייל את רשימת התכניות שיועלו לדיוני הוועדות בזמן אמת. בעמודי
            התכניות תוכלו לכתוב את התייחסויותיכם לתכנית עוד לפני שלבי
            ההתנגדויות, וכך להביע את עמדתכם באופן אפקטיבי ובזמן רלוונטי.
            <br />
            <router-link to="/about">למידע נוסף</router-link>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="secondary" x-large to="/subscriptions">
            <v-icon left>mdi-bell-plus</v-icon>
            צרו התראות חדשות
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col cols="12">
        <h2
          class="headline primary--text font-weight-bold my-3"
          tabindex="0"
          v-if="upcomingMeetings.length"
        >
          הישיבות הקרובות במערכת
        </h2>
        <MeetingCards
          :meetings="transformMeetingsToMeetingCards(upcomingMeetings)"
        ></MeetingCards>
        <div v-if="organizationMode">
          <h2 class="headline primary--text font-weight-bold my-3" tabindex="0">
            ישיבות עבר
          </h2>
          <MeetingCards
            :meetings="transformMeetingsToMeetingCards(pastMeetings)"
          ></MeetingCards>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MeetingCards from "../components/MeetingCards";
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { isOrganizationMode } from "../helpers/constants";
@Component({
  components: { MeetingCards }
})
export default class Home extends Vue {
  @Action fetchManagableMeetings;
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter pastMeetings;
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter upcomingMeetings;
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter managableMeetings;
  @Getter user;
  organizationMode = isOrganizationMode;
  async mounted() {
    await this.fetchManagableMeetings();
  }

  /**
   * Transforms an array of meeting to an array of meeting cards
   * @param {import("../../graphql/types").Meeting[]} meetings
   * @returns {import("../../graphql/types").MeetingCard[]}
   */
  transformMeetingsToMeetingCards(meetings) {
    return meetings.map(meeting => ({
      id: meeting.id,
      headline: this.organizationMode
        ? meeting.title || `ישיבה מספר ${meeting.number}`
        : meeting.committee.sid,
      date: meeting.date,
      isEditable:
        this.$vuetify.breakpoint.mdAndUp &&
        this.managableMeetings.some(
          managableMeeting => managableMeeting.id == meeting.id
        )
    }));
  }
}
</script>
