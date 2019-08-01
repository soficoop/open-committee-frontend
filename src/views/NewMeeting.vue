<template>
  <v-container fill-height>
    <v-layout wrap row align-content-space-around>
      <v-flex xs12>
        <h1 class="display-2 font-weight-bold primary--text my-5" tabindex="0">
          הוספת ישיבה חדשה
        </h1>
      </v-flex>
      <v-flex xs12>
        <v-layout wrap row>
          <v-flex xs12 md8 px-3>
            <v-select
              label="בחירת מוסד תכנוני"
              :items="user.committees"
              item-value="id"
              item-text="sid"
              outlined
              v-model="committee"
              class="text-right text-truncate"
            ></v-select>
          </v-flex>
          <v-flex xs12 md4 px-3>
            <v-text-field
              v-model="meetingNumber"
              label="מספר/כותרת ישיבה"
              outlined
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout wrap row>
          <v-flex xs12 md4 px-3>
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
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md8 px-3>
            <v-autocomplete
              label="קישור לתכניות"
              outlined
              @change="addPlan"
              append-icon=" "
              hide-no-data
              v-model="selectedPlan"
              :items="plans"
              item-text="number"
              item-value="id"
              hint="יש להזין מספר תכנית"
              :loading="isSearchingPlans"
              :search-input.sync="planSearch"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 md4 px-3>
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
                <v-card-title class="headline">
                  קישור ישיבה לנושא
                </v-card-title>
                <v-card-text>
                  <v-layout wrap py-5 column>
                    <v-flex>
                      <v-text-field
                        label="כותרת"
                        outlined
                        v-model="newSubject.title"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-textarea
                        label="תיאור"
                        outlined
                        v-model="newSubject.description"
                      ></v-textarea>
                    </v-flex>
                    <v-flex>
                      <v-file-input
                        label="קבצים מצורפים"
                        hide
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
                            @click:close="
                              newSubject.attachedFiles.splice(index, 1)
                            "
                          >
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions class="mt-n12 pb-3">
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="secondary"
                    class="subtitle-1 font-weight-semibold"
                    @click="subjectDialog = false"
                  >
                    ביטול
                  </v-btn>
                  <v-btn
                    color="secondary"
                    text
                    class="subtitle-1 font-weight-semibold"
                    @click="addSubject()"
                  >
                    אישור
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
        <AgendaCards
          :items="agendaItems"
          @cardRemoved="handleAgendaItemRemoveClicked"
          areCardsRemovable
          class="pb-6"
        ></AgendaCards>
        <v-layout row wrap>
          <v-flex xs12 md4 px-3>
            <v-file-input
              v-model="protocolFile"
              label="פרוטוקול"
              filled
              rounded
            ></v-file-input>
          </v-flex>
          <v-flex xs12 md4 px-3>
            <v-file-input
              v-model="transcriptFile"
              label="תמליל"
              filled
              rounded
            ></v-file-input>
          </v-flex>
          <v-flex xs12 md4 px-3>
            <v-file-input
              v-model="decisionsFile"
              label="מסמך החלטות"
              filled
              rounded
            ></v-file-input>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 px-3>
            <v-file-input
              v-model="additionalFiles"
              label="מסמכים נוספים"
              filled
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
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-textarea
              v-model="background"
              label="רקע לישיבה"
              outlined
              auto-grow
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-btn
              left
              large
              color="secondary"
              min-width="20%"
              :block="$vuetify.breakpoint.xsOnly"
              :disabled="!isFormValid"
              @click="submitMeeting()"
              :loading="isCreatingMeeting"
            >
              יצירת ישיבה
              <v-icon right>mdi-arrow-left</v-icon>
            </v-btn>
            <v-snackbar color="error" v-model="errorOccurred">
              בעיה לא צפויה קרתה. אנא נסו שוב מאוחר יותר
            </v-snackbar>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-dialog v-model="addedSuccessfully" max-width="300px">
        <v-card color="secondary" dark>
          <v-card-title>הישיבה נוצרה בהצלחה</v-card-title>
          <v-card-text>לחיצה על אישור תיקח אותך למסך הישיבה</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              class="font-weight-semibold"
              :to="`/meeting/${addedMeetingId}`"
            >
              אישור
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import AgendaCards from "../components/AgendaCards";
import Vue from "vue";
import { Getter } from "vuex-class";
import { Getters, graphqlEndpoint } from "../helpers/constants";
import { request } from "graphql-request";
import { createMeeting, createSubject } from "../helpers/mutations";
import { getPlans, getPlan } from "../helpers/queries";
import { makeGqlRequest, uploadFile } from "../helpers/functions";

@Component({ components: { AgendaCards } })
export default class NewMeeting extends Vue {
  /** @type {import("../helpers/typings").User} */
  @Getter(Getters.USER) user;
  /** @type {string} */
  @Getter(Getters.JWT) jwt;
  /** @type {string} */
  addedMeetingId = "";
  addedSuccessfully = false;
  /** @type {string} */
  background = "";
  dateDialog = false;
  /** @type {string} */
  meetingDateString = "";
  committee = "";
  meetingNumber = "";
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
  /** @type {boolean} */
  isCreatingMeeting = false;
  protocolFile = null;
  transcriptFile = null;
  decisionsFile = null;
  additionalFiles = [];
  errorOccurred = false;

  /**
   * Gets called when the user clicks the remove button of an agenda item
   */
  handleAgendaItemRemoveClicked(id) {
    this.addedPlans.splice(this.addedPlans.findIndex(item => item.id == id), 1);
    this.addedSubjects.splice(
      this.addedSubjects.findIndex(item => item.id == id),
      1
    );
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

  /**
   * Wrapper for submitting the meeting, performs error handling
   */
  async submitMeeting() {
    this.isCreatingMeeting = true;
    try {
      await this.createNewMeeting();
    } catch (e) {
      console.error(e);
      this.errorOccurred = true;
    } finally {
      this.isCreatingMeeting = false;
      this.addedSuccessfully = !this.errorOccurred;
    }
  }

  /**
   * Calls the relevant methods that submit the meeting and its dependencies
   */
  async createNewMeeting() {
    await this.submitSubjects();
    const uploadedFiles = await this.uploadFiles();
    /** @type {import("../../graphql/types").Meeting} */
    const meeting = {
      background: this.background,
      date: this.meetingDateString,
      number: !isNaN(this.meetingNumber) ? parseInt(this.meetingNumber) : null,
      title: isNaN(this.meetingNumber) ? this.meetingNumber : null,
      committee: this.committee,
      plans: this.agendaItems.map(i => i.id),
      protocol: uploadedFiles.protocol,
      transcript: uploadedFiles.transcript,
      desicions: uploadedFiles.decisions,
      additionalFiles: uploadedFiles.additionalFiles
    };
    const res = await makeGqlRequest(createMeeting, meeting, this.jwt);
    this.addedMeetingId = res.createMeeting.meeting.id;
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
   * Uploads meeting files and returns their ids
   */
  async uploadFiles() {
    let result = {};
    if (this.protocolFile)
      result.protocol = (await uploadFile(this.protocolFile, this.jwt)).id;
    if (this.transcriptFile)
      result.transcript = (await uploadFile(this.transcriptFile, this.jwt)).id;
    if (this.decisionsFile)
      result.decisions = (await uploadFile(this.decisionsFile, this.jwt)).id;
    if (this.additionalFiles)
      result.additionalFiles = await Promise.all(
        this.additionalFiles.map(
          async additionalFile =>
            (await uploadFile(additionalFile, this.jwt)).id
        )
      );
    return result;
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
      request(graphqlEndpoint, getPlans, { number: value }).then(result => {
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
          headline: `תכנית מספר ${plan.number}`,
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
