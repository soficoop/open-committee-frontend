<template>
  <v-container class="pa-md-12">
    <SubscriptionToggle
      v-if="plan.meetings.length == 1"
      :committeeId="plan.meetings[0].committee.id"
    />
    <v-row>
      <v-col>
        <h3 class="headline primary--text font-weight-black">
          <span v-if="plan.number" tabindex="0">{{ plan.number }}</span>
          <span v-if="plan.number && plan.name"> • </span>
          <span v-if="plan.name" tabindex="0">{{ plan.name }}</span>
        </h3>
        <h4 class="title primary--text">
          <span v-if="plan.municipality" tabindex="0">
            {{ plan.municipality }}
          </span>
          <span v-if="plan.municipality && plan.location"> • </span>
          <span v-if="plan.location" tabindex="0" v-html="plan.location"></span>
        </h4>
        <h5 class="subtitle-1 primary--text" v-if="plan.status">
          <v-icon right color="primary">mdi-update</v-icon>
          <span tabindex="0">{{ plan.status }}</span>
        </h5>
      </v-col>
    </v-row>
    <v-row v-if="plan.targets || plan.sections">
      <v-col cols="12" md="8">
        <v-row no-gutters>
          <v-col>
            <v-card v-if="plan.targets" flat class="pa-4">
              <h4 class="title primary--text" tabindex="0">מטרות</h4>
              <p
                class="whitespace-preline"
                tabindex="0"
                v-html="plan.targets"
              ></p>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card v-if="plan.sections" flat class="pa-4">
              <h4 class="title primary--text" tabindex="0">
                עיקרי ה{{ planTypeFirstWord }}
              </h4>
              <p
                class="whitespace-preline"
                tabindex="0"
                v-html="plan.sections"
              ></p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-card flat class="pa-4">
          <h4 class="title primary--text" tabindex="0">נתונים</h4>
          <Map
            class="my-3"
            :query="planLocationQuery"
            v-if="planLocationQuery"
          />
          <v-row
            v-for="infoItem in planInformation"
            :key="infoItem.key"
            no-gutters
            class="py-1"
          >
            <v-col cols="4" class="font-weight-semibold">
              <span tabindex="0">{{ infoItem.key }}</span>
            </v-col>
            <v-col cols="7" offset="1">
              <span tabindex="0">{{ infoItem.value }}</span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <h2 class="display-1 accent--text my-3">
          אין מידע זמין על ה{{ planTypeFirstWord }}
        </h2>
      </v-col>
    </v-row>
    <v-row v-if="plan.attachedFiles.length">
      <v-col>
        <h4 class="title primary--text" tabindex="0">מסמכים רלוונטים</h4>
        <FileCards class="py-1" :files="plan.attachedFiles" />
      </v-col>
    </v-row>
    <v-row v-if="planMeetings && planMeetings.length">
      <v-col>
        <h4 class="title primary--text" tabindex="0">
          היסטוריית הדיונים ב{{ planTypeFirstWord }}
        </h4>
        <MeetingCards :meetings="planMeetings"></MeetingCards>
      </v-col>
    </v-row>
    <v-row py-3 justify="space-between" align="center">
      <v-col>
        <v-row justify="space-between" align="center">
          <v-col cols="auto">
            <h4 class="title primary--text d-inline-block" tabindex="0">
              התייחסויות
            </h4>
          </v-col>
          <v-col v-if="isUserCommentsAdmin" cols="auto" class="py-0">
            <v-btn
              color="primary"
              outlined
              small
              :loading="lockCommentLoader"
              @click="switchCommentsLockState(true)"
              v-if="!planData.commentsAreLocked"
            >
              נעילת התייחסויות
            </v-btn>
            <v-btn
              v-else
              small
              :loading="lockCommentLoader"
              color="primary"
              class="text--white"
              @click="switchCommentsLockState(false)"
            >
              <v-icon small left>mdi-lock</v-icon>
              ההתייחסויות נעולות
            </v-btn>
            <span class="error--text d-block" v-if="lockCommentErrMessage">
              {{ lockCommentErrMessage }}
            </span>
          </v-col>
          <v-col v-else-if="planData.commentsAreLocked" cols="auto">
            <v-chip color="orange" text-color="white">
              הוספה של התייחסויות ותגובות חדשות ננעלה
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pt-0">
        <Comments
          :privilegedUsers="privilegedUsers"
          :commentsAreLocked="planData.commentsAreLocked"
          :isCurrentUserCommentsAdmin="isUserCommentsAdmin"
        ></Comments>
      </v-col>
    </v-row>
    <v-row v-if="!plan.addedManually">
      <v-col>
        <a
          :href="iplanUrl"
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
import { ActionTypes, Getters } from "../helpers/constants";
import store from "../plugins/store";
import { Getter, Action } from "vuex-class";
import MeetingCards from "../components/MeetingCards.vue";
import FileCards from "../components/FileCards.vue";
import Map from "../components/Map.vue";
import Comments from "../components/Comments.vue";
import SubscriptionToggle from "../components/SubscriptionToggle.vue";

@Component({
  components: { MeetingCards, FileCards, Map, Comments, SubscriptionToggle }
})
export default class Plan extends Vue {
  @Action fetchManagableMeetings;
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter(Getters.USER) currentUser;
  /** @type {import("../../graphql/types").Plan} */
  @Getter selectedPlan;
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter managableMeetings;
  @Action(ActionTypes.UPDATE_PLAN) updatePlanAction;
  lockCommentLoader = false;
  lockCommentErrMessage = "";

  planData = {
    id: "",
    commentsAreLocked: ""
  };

  async mounted() {
    this.planData.id = this.plan.id;
    this.planData.commentsAreLocked = this.plan.commentsAreLocked;
    await this.fetchManagableMeetings();
  }

  async switchCommentsLockState(lock) {
    this.lockCommentLoader = true;
    const res = await this.updatePlanAction({
      id: this.planData.id,
      commentsAreLocked: lock
    });
    if (!res.status) {
      this.lockCommentErrMessage = res.message;
      this.planData.commentsAreLocked = !lock;
    } else {
      this.lockCommentErrMessage = "";
      this.planData.commentsAreLocked = lock;
    }
    this.lockCommentLoader = false;
  }

  get plan() {
    return this.selectedPlan;
  }

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

  get privilegedUsers() {
    const users = [];
    for (const meeting of this.plan.meetings) {
      const committeeUsers =
        (meeting.committee && meeting.committee.users) || [];
      for (const user of committeeUsers) {
        users.push(user.id);
      }
    }
    return users;
  }

  get isUserCommentsAdmin() {
    return (
      this.currentUser && this.privilegedUsers.includes(this.currentUser.id)
    );
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

  get iplanUrl() {
    return `http://www.mavat.moin.gov.il/MavatPS/Forms/SV4.aspx?et=${
      this.plan.stype
    }&pl_id=${encodeURIComponent(this.plan.sid)}`;
  }

  get planLocationQuery() {
    return `${this.plan.street || ""} ${this.plan.houseNumber || ""} ${this.plan
      .settlement || ""}`
      .replace(/&nbsp;/g, "")
      .trim();
  }

  get planTypeFirstWord() {
    return this.plan.type.split()[0];
  }

  async beforeRouteEnter(to, from, next) {
    await store.dispatch(ActionTypes.FETCH_PLAN, to.params.planId);
    next();
  }
}
</script>
