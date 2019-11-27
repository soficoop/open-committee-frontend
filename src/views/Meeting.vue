<template>
  <v-container class="pa-md-12">
    <SubscriptionToggle :committeeId="meeting.committee.id" />
    <v-row no-gutters>
      <v-col cols="12">
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
      </v-col>
      <v-col v-if="meeting.date && typeof meeting.date != 'string'">
        <h5 class="subtitle-1 primary--text d-inline-block" tabindex="0">
          <v-icon color="primary">mdi-calendar-blank</v-icon>
          {{ meeting.date.toLocaleDateString("he") }}
        </h5>
        <v-btn
          v-if="isMeetingEditable"
          color="secondary"
          text
          large
          :to="`/manage/meeting/${meetingId}`"
          class="mx-2"
        >
          <v-icon left>mdi-pencil</v-icon>
          <span class="subtitle-1">עריכת ישיבה</span>
        </v-btn>
        <v-btn
          v-if="isMeetingEditable"
          color="error"
          text
          large
          @click.stop="dialog = true"
          class="mx-2 delete-button"
        >
          <v-icon left>mdi-delete</v-icon>
          <span class="subtitle-1">מחיקת ישיבה</span>
        </v-btn>
        <v-dialog v-model="dialog" max-width="350" class="delete-digalog">
          <v-card>
            <v-card-title>
              האם ברצונך למחוק את הישיבה?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false">ביטול</v-btn>
              <v-btn text @click="deleteMeeting()">אישור</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar color="error" v-model="errorOccurred">
          בעיה לא צפויה קרתה. אנא נסו שוב מאוחר יותר
        </v-snackbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="meeting.background">
        <p>{{ meeting.background }}</p>
      </v-col>
    </v-row>
    <v-row v-if="agendaItems.length">
      <v-col>
        <h4 class="title primary--text" tabindex="0">סדר יום - סעיפי הישיבה</h4>
        <AgendaCards
          :items="agendaItems"
          :hoveredItem="hoveredPlan"
        ></AgendaCards>
      </v-col>
    </v-row>
    <v-row v-if="meetingFiles.length">
      <v-col>
        <h4 class="title primary--text">
          <span tabindex="0">מסמכים רלוונטים</span>
        </h4>
        <FileCards class="py-1" :files="meetingFiles" />
      </v-col>
    </v-row>
    <v-row v-if="meeting.summary">
      <v-col>
        <h4 class="title primary--text" tabindex="0">סיכום הישיבה</h4>
        <p>{{ meeting.summary }}</p>
      </v-col>
    </v-row>
    <v-row v-if="otherMeetingsOfCommittee.length">
      <v-col>
        <h4 class="title primary--text" tabindex="0">דיונים נוספים של הועדה</h4>
        <MeetingCards :meetings="otherMeetingsOfCommittee"></MeetingCards>
      </v-col>
    </v-row>
    <v-row v-if="!meeting.addedManually">
      <v-col>
        <a
          :href="meetingIplanUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="secondary--text font-weight-bold px-1"
          >למידע נוסף באתר מנהל התכנון</a
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { makeGqlRequest } from "../helpers/functions";
import { hideMeeting } from "../helpers/mutations";
import { Getter, Action, Mutation } from "vuex-class";
import AgendaCards from "../components/AgendaCards.vue";
import FileCards from "../components/FileCards.vue";
import MeetingCards from "../components/MeetingCards.vue";
import SubscriptionToggle from "../components/SubscriptionToggle.vue";

@Component({
  components: { MeetingCards, AgendaCards, FileCards, SubscriptionToggle }
})
export default class Meeting extends Vue {
  @Action fetchMeeting;
  @Action fetchManagableMeetings;
  /**@type {import("../../graphql/types").Meeting} */
  @Getter selectedMeeting;
  /**@type {import("../../graphql/types").Meeting[]} */
  @Getter managableMeetings;
  @Mutation setLoading;
  @Getter jwt;
  hoveredPlan = "";
  dialog = false;
  errorOccurred = false;

  get meeting() {
    return this.selectedMeeting;
  }

  get meetingFiles() {
    let result = [
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
    ].filter(file => file.url);

    if (this.meeting.additionalFiles.length > 0) {
      this.meeting.additionalFiles.forEach(el => {
        !!el.url && !!el.name && result.push(el);
      });
    }
    return result;
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
        {
          key: "עדכון אחרון",
          value:
            plan.lastUpdate instanceof Date &&
            plan.lastUpdate.toLocaleDateString("he")
        },
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

  async mounted() {
    this.setLoading(true);
    await this.fetchMeeting(this.meetingId);
    await this.fetchManagableMeetings();
    this.setLoading(false);
  }

  async deleteMeeting() {
    try {
      const meeting = { id: this.meeting.id };
      await makeGqlRequest(hideMeeting, meeting, this.jwt);
      this.$router.push(`/manage`);
    } catch (e) {
      console.error(e);
      this.errorOccurred = true;
    } finally {
      this.dialog = false;
    }
  }
}
</script>
