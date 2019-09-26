<template>
  <v-container class="pa-md-12">
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold primary--text my-5" tabindex="0">
          פרטי הישיבה
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-select
          label="מוסד תכנוני"
          :items="user.committees"
          item-value="id"
          item-text="sid"
          hide-details
          outlined
          v-model="committee"
          class="text-right"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="meetingNumber"
          label="מספר/כותרת ישיבה"
          hide-details
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-dialog
          max-width="290px"
          full-width
          ref="dateDialog"
          right
          :return-value.sync="meetingDateString"
          v-model="dateDialog"
          absolute
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              outlined
              v-model="meetingDateFormatted"
              label="תאריך ישיבה"
              hide-details
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="secondary"
            header-color="primary"
            locale="he"
            v-model="meetingDateString"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateDialog = false"
              >ביטול</v-btn
            >
            <v-btn
              text
              color="primary"
              @click="$refs.dateDialog.save(meetingDateString)"
              >אישור</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-autocomplete
          label="קישור לתכניות"
          outlined
          @change="addPlan"
          append-icon=" "
          hide-no-data
          hide-details
          v-model="selectedPlan"
          :items="plans"
          item-text="number"
          item-value="id"
          hint="יש להזין מספר תכנית"
          :loading="isSearchingPlans"
          :search-input.sync="planSearch"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          color="secondary"
          height="56px"
          x-large
          text
          @click="subjectDialog = true"
        >
          <v-icon left>mdi-open-in-new</v-icon>
          <span class="font-weight-bold">הוספת נושא</span>
        </v-btn>
        <v-dialog v-model="subjectDialog" max-width="600">
          <v-card>
            <v-card-title class="headline">קישור ישיבה לנושא</v-card-title>
            <v-card-text>
              <v-row class="flex-column">
                <v-col>
                  <v-text-field
                    label="כותרת"
                    outlined
                    hide-details
                    v-model="newSubject.title"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-textarea
                    label="תיאור"
                    outlined
                    hide-details
                    v-model="newSubject.description"
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-file-input
                    label="קבצים מצורפים"
                    hide
                    hide-details
                    filled
                    rounded
                    multiple
                    v-model="newSubject.attachedFiles"
                  >
                    <template v-slot:selection="{ text, index }">
                      <v-chip
                        small
                        label
                        close
                        color="primary"
                        @click:close="newSubject.attachedFiles.splice(index, 1)"
                        >{{ text }}</v-chip
                      >
                    </template>
                  </v-file-input>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="mt-n12 pb-3">
              <v-spacer></v-spacer>
              <v-btn
                text
                color="secondary"
                class="subtitle-1 font-weight-semibold"
                @click="subjectDialog = false"
                >ביטול</v-btn
              >
              <v-btn
                color="secondary"
                text
                class="subtitle-1 font-weight-semibold"
                :disabled="!newSubject.title && !newSubject.description"
                @click="addSubject()"
                >אישור</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <AgendaCards
      :items="agendaItems"
      @cardRemoved="handleAgendaItemRemoveClicked"
      areCardsRemovable
      class="pb-6"
    ></AgendaCards>
    <v-row>
      <v-col cols="12" md="4">
        <v-file-input
          v-model="protocolFile"
          label="פרוטוקול"
          filled
          hide-details
          rounded
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="4">
        <v-file-input
          v-model="transcriptFile"
          label="תמליל"
          filled
          hide-details
          rounded
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="4">
        <v-file-input
          v-model="decisionsFile"
          label="מסמך החלטות"
          filled
          hide-details
          rounded
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-file-input
          v-model="additionalFiles"
          label="מסמכים נוספים"
          filled
          hide-details
          rounded
          multiple
        >
          <template v-slot:selection="{ text, index }">
            <v-chip
              small
              label
              color="primary"
              close
              @click:close="additionalFiles.splice(index, 1)"
              >{{ text }}</v-chip
            >
          </template>
        </v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          v-model="background"
          label="רקע לישיבה"
          outlined
          hide-details
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row v-if="existingMeeting">
      <v-col>
        <v-textarea
          v-model="meetingSummary"
          label="סיכום הישיבה"
          outlined
          hide-details
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row v-if="existingMeeting">
      <v-col>
        <v-checkbox
          label="עדכן/י את העוקבים במייל על השינוי"
          v-model="notifyByMail"
          hide-details
          class="my-0"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          left
          large
          color="secondary"
          min-width="20%"
          :block="$vuetify.breakpoint.xsOnly"
          :disabled="!isFormValid"
          @click="submitMeeting()"
          :loading="submittingMeeting"
        >
          שמירת ישיבה
          <v-icon right>mdi-arrow-left</v-icon>
        </v-btn>
        <v-snackbar color="error" v-model="errorOccurred">
          בעיה לא צפויה קרתה. אנא נסו שוב מאוחר יותר
        </v-snackbar>
      </v-col>
    </v-row>
    <v-dialog persistent v-model="submittedSuccessfully" max-width="300px">
      <v-card color="secondary" dark>
        <v-card-title>הישיבה נשמרה בהצלחה</v-card-title>
        <v-card-text>כעת תועבר למסך הישיבה</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="font-weight-semibold"
            :to="`/meeting/${submittedMeetingId}`"
            >אישור</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import AgendaCards from "../components/AgendaCards";
import Vue from "vue";
import { Getter } from "vuex-class";
import { Getters } from "../helpers/constants";
import {
  createMeeting,
  createSubject,
  updateMeeting,
  emailMeeting
} from "../helpers/mutations";
import { getPlans, getPlan, getMeeting } from "../helpers/queries";
import { makeGqlRequest, uploadFile } from "../helpers/functions";

@Component({ components: { AgendaCards } })
export default class ManageMeeting extends Vue {
  /** @type {import("../../graphql/types").UsersPermissionsUser} */
  @Getter(Getters.USER) user;
  /** @type {string} */
  @Getter(Getters.JWT) jwt;
  submittedMeetingId = "";
  background = "";
  dateDialog = false;
  /** @type {import("../../graphql/types").Meeting}  */
  existingMeeting = null;
  meetingDateString = "";
  committee = "";
  meetingNumber = "";
  meetingSummary = "";
  /** @type {import("../../graphql/types").Plan[]} */
  plans = [];
  isSearchingPlans = false;
  selectedPlan = "";
  subjectDialog = false;
  /**@type {import("../helpers/typings").NewSubjectModel} */
  newSubject = {};
  /**@type {import("../helpers/typings").NewSubjectModel[]} */
  addedSubjects = [];
  /** @type {import("../../graphql/types").Plan[]} */
  addedPlans = [];
  notifyByMail = false;
  submittedSuccessfully = false;
  submittingMeeting = false;
  /** @type {File} */
  protocolFile = null;
  /** @type {File} */
  transcriptFile = null;
  /** @type {File} */
  decisionsFile = null;
  /** @type {File[]} */
  additionalFiles = [];
  errorOccurred = false;

  /**
   * Gets called when the user clicks the remove button of an agenda item
   * @param {string} id ID of clicked card item
   */
  handleAgendaItemRemoveClicked(id) {
    const planIndex = this.addedPlans.findIndex(item => item.id == id);
    if (planIndex != -1) {
      this.addedPlans.splice(planIndex, 1);
    }
    const subjectIndex = this.addedSubjects.findIndex(item => item.id == id);
    if (subjectIndex != -1) {
      this.addedSubjects.splice(subjectIndex, 1);
    }
  }

  /**
   * Adds a new subject to the current meeting.
   * Gets called when the new subject dialog is approved
   */
  addSubject() {
    const subjectModel = {
      id: new Date().getTime(),
      title: this.newSubject.title,
      description: this.newSubject.description,
      attachedFiles: this.newSubject.attachedFiles || []
    };
    this.addedSubjects.push(subjectModel);
    this.newSubject = {};
    this.subjectDialog = false;
  }

  /**
   * Gets called when a plan is selected via the autocomplete
   * @param {string} planId ID of the plan
   */
  async addPlan(planId) {
    /** @type {import("../../graphql/types").Plan} */
    const plan = (await makeGqlRequest(getPlan, { id: planId })).plan;
    if (plan) {
      this.addedPlans.push(plan);
    }
    this.selectedPlan = "";
  }

  async mounted() {
    if (this.$route.params.id) {
      this.loadMeeting(this.$route.params.id);
    }
  }

  /**
   * Loads an existing meeting to the form
   * @param {string} meetingId The meeting's ID
   */
  async loadMeeting(meetingId) {
    /** @type {import("../../graphql/types").Meeting} */
    const { meeting } = await makeGqlRequest(getMeeting(meetingId));
    if (meeting) {
      this.existingMeeting = meeting;
      this.committee = meeting.committee.id;
      this.meetingNumber = meeting.title || meeting.number;
      this.meetingDateString = meeting.date.toISOString().split("T")[0];
      this.addedPlans = meeting.plans;
      this.background = meeting.background;
      this.meetingSummary = meeting.summary;
      if (meeting.protocol) {
        this.protocolFile = new File([], meeting.protocol.name);
      }
      if (meeting.transcript) {
        this.transcriptFile = new File([], meeting.transcript.name);
      }
      if (meeting.decisions) {
        this.decisionsFile = new File([], meeting.decisions.name);
      }
      if (meeting.additionalFiles && meeting.additionalFiles.length > 0) {
        this.additionalFiles = meeting.additionalFiles.map(
          file => new File([], file.name)
        );
      }
    }
  }

  /**
   * Wrapper for submitting the meeting, performs error handling
   */
  async submitMeeting() {
    this.submittingMeeting = true;
    try {
      if (this.existingMeeting) {
        await this.updateMeeting();
      } else {
        await this.createNewMeeting();
      }
    } catch (e) {
      console.error(e);
      this.errorOccurred = true;
    } finally {
      this.submittingMeeting = false;
      this.submittedSuccessfully = !this.errorOccurred;
    }
  }

  /**
   * Calls the relevant methods that submit the meeting and its dependencies
   */
  async createNewMeeting() {
    const meeting = await this.generateMeetingQueryObject();
    const res = await makeGqlRequest(createMeeting, meeting, this.jwt);
    this.submittedMeetingId = res.createMeeting.meeting.id;
  }

  /**
   * Makes an api call to submit the added subject
   */
  async submitSubjects() {
    for (const subject of this.addedSubjects) {
      const fileIds = await Promise.all(
        subject.attachedFiles.map(
          async file => (await uploadFile(file, this.jwt)).id
        )
      );
      const queryVars = {
        files: fileIds,
        title: subject.title,
        sections: subject.description,
        update: new Date().toISOString()
      };
      let result = await makeGqlRequest(createSubject, queryVars, this.jwt);
      subject.id = result.createPlan.plan.id;
    }
  }

  /**
   * Wrapper for file upload to.
   * If the file is new, it gets uploaded and the generated ID is returned.
   * If the file isn't new (i.e. its size is 0), the existing file's ID is returned.
   * @param {File} newFile File to upload
   * @param {import("../../graphql/types").UploadFile} existingFile Existing file
   * @returns {string} ID of uploaded file
   */
  async uploadFile(newFile, existingFile) {
    if (newFile.size) {
      return (await uploadFile(newFile, this.jwt)).id;
    } else {
      return existingFile && existingFile.id;
    }
  }

  /**
   * Uploads meeting files and returns their ids
   */
  async uploadFiles() {
    let result = {};
    if (this.protocolFile)
      result.protocol = await this.uploadFile(
        this.protocolFile,
        this.existingMeeting && this.existingMeeting.protocol
      );
    if (this.transcriptFile)
      result.transcript = await this.uploadFile(
        this.transcriptFile,
        this.existingMeeting && this.existingMeeting.transcript
      );
    if (this.decisionsFile)
      result.decisions = await this.uploadFile(
        this.decisionsFile,
        this.existingMeeting && this.existingMeeting.decisions
      );
    if (this.additionalFiles.length)
      result.additionalFiles = await Promise.all(
        this.additionalFiles.map(
          async additionalFile =>
            await this.uploadFile(
              additionalFile,
              this.existingMeeting &&
                this.existingMeeting.additionalFiles.find(
                  file => file.name == additionalFile.name
                )
            )
        )
      );
    return result;
  }
  /**
   * Generates a meeting object from the form
   * @returns {import("../../graphql/types").Meeting}
   */
  async generateMeetingQueryObject() {
    await this.submitSubjects();
    const uploadedFiles = await this.uploadFiles();
    let meeting = {
      additionalFiles: uploadedFiles.additionalFiles,
      background: this.background,
      committee: this.committee,
      date: this.meetingDateString,
      decisions: uploadedFiles.decisions,
      number: !isNaN(this.meetingNumber) ? parseInt(this.meetingNumber) : null,
      plans: this.agendaItems.map(i => i.id),
      protocol: uploadedFiles.protocol,
      summary: this.meetingSummary,
      title: isNaN(this.meetingNumber) ? this.meetingNumber : null,
      transcript: uploadedFiles.transcript
    };
    if (this.existingMeeting) {
      meeting.id = this.existingMeeting.id;
    }
    return meeting;
  }

  async updateMeeting() {
    const meeting = await this.generateMeetingQueryObject();
    const res = await makeGqlRequest(updateMeeting, meeting, this.jwt);
    this.submittedMeetingId = res.updateMeeting.meeting.id;
    if (this.notifyByMail) {
      await makeGqlRequest(
        emailMeeting,
        { id: this.submittedMeetingId },
        this.jwt
      );
    }
  }

  get meetingDateFormatted() {
    return (
      this.meetingDateString &&
      new Date(this.meetingDateString).toLocaleDateString("he")
    );
  }

  get isFormValid() {
    return (
      this.meetingNumber &&
      this.meetingDateString &&
      this.committee &&
      this.agendaItems.length > 0
    );
  }

  set planSearch(value) {
    if (value) {
      this.isSearchingPlans = true;
      makeGqlRequest(getPlans(value)).then(result => {
        this.plans = result.plans.filter(
          plan =>
            !this.agendaItems.some(agendaItem => agendaItem.id === plan.id)
        );
        this.isSearchingPlans = false;
      });
    }
  }

  get planSearch() {
    return "";
  }

  /** @type {import("../helpers/typings").AgendaCard[]} */
  get agendaItems() {
    return this.addedSubjects
      .map(subject => ({
        id: subject.id,
        headline: `נושא ${subject.title}`,
        description: subject.description
      }))
      .concat(
        this.addedPlans.map(plan => ({
          id: plan.id,
          headline: plan.number || plan.type,
          description: plan.name,
          bullets: [
            { key: "סטטוס", value: plan.status },
            {
              key: "עדכון אחרון",
              value: plan.lastUpdate && plan.lastUpdate.toLocaleDateString("he")
            },
            { key: "מיקום", value: plan.location }
          ]
        }))
      );
  }
}
</script>
<style>
/* fix for vuetify datepicker align issues in rtl */
.v-date-picker-table--date td {
  direction: ltr;
}
</style>
