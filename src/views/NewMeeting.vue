<template>
  <v-container fill-height pa-md-12>
    <v-layout wrap align-content-space-around>
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
              filled
              class="text-right text-truncate"
            ></v-select>
          </v-flex>
          <v-flex xs12 md4 px-3>
            <v-text-field label="מספר/כותרת ישיבה" filled></v-text-field>
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
                  filled
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
                <v-btn text color="primary" @click="dateDialog = false">
                  ביטול
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dateDialog.save(meetingDateString)"
                >
                  אישור
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md8 px-3>
            <v-autocomplete
              label="קישור לתכניות"
              filled
              @change="addAgendaItem"
              append-icon=" "
              hide-no-data
              cache-items
              :items="plans"
              item-text="number"
              item-value="id"
              hint="יש להזין מספר תכנית"
              :loading="isSearchingPlans"
              :search-input.sync="planSearch"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 md4 px-3>
            <v-btn color="secondary" height="56px" x-large text>
              <v-icon left>mdi-open-in-new</v-icon>
              <span class="font-weight-bold">הוספת נושא</span>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-expand-transition>
          <AgendaCards
            v-if="agendaItems.length > 0"
            :items="agendaItems"
            class="pb-6"
          ></AgendaCards>
        </v-expand-transition>
        <v-layout row wrap>
          <v-flex xs12 md4 px-3>
            <v-file-input label="פרוטוקול" filled rounded></v-file-input>
          </v-flex>
          <v-flex xs12 md4 px-3>
            <v-file-input label="מסמך סדר יום" filled rounded></v-file-input>
          </v-flex>
          <v-flex xs12 md4 px-3>
            <v-file-input label="מסמך החלטות" filled rounded></v-file-input>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 px-3>
            <v-file-input label="מסמכים נוספים" filled rounded multiple>
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-textarea label="רקע לישיבה" filled auto-grow> </v-textarea>
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
            >
              יצירת ישיבה
              <v-icon right>mdi-arrow-left</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
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
import { getPlans, getPlan } from "../helpers/queries";
import { makeGqlRequest } from "../helpers/functions";

@Component({ components: { AgendaCards } })
export default class NewMeeting extends Vue {
  /** @type {import("../../graphql/types").Meeting[]} */
  @Getter(Getters.USER) user;
  dateDialog = false;
  /** @type {string} */
  meetingDateString = "";
  committee = "";
  meetingNumber = "";
  /** @type {import("../../graphql/types").Plan[]} */
  plans = [];
  isSearchingPlans = false;
  /** @type {import("../helpers/typings").AgendaCard[]} */
  agendaItems = [];

  /**
   * Gets called when a plan is selected via the autocomplete
   * @param {string} planId ID of the plan
   */
  async addAgendaItem(planId) {
    if (this.agendaItems.some(i => i.id == planId)) {
      console.info("plan already exists");
      return;
    }
    /** @type {import("../../graphql/types").Plan} */
    const plan = (await makeGqlRequest(getPlan, { id: planId })).plan;
    if (plan) {
      this.agendaItems.push({
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
      });
    } else {
      console.info("no plan will be added");
    }
  }

  get meetingDateFormatted() {
    return (
      this.meetingDateString &&
      new Date(this.meetingDateString).toLocaleDateString("he")
    );
  }

  get isFormValid() {
    return this.meetingDateString && this.committee && this.plans.length > 0;
  }

  set planSearch(value) {
    if (value && value !== this._planSearch) {
      this.isSearchingPlans = true;
      request(graphqlEndpoint, getPlans, { number: value }).then(result => {
        this.plans.push(
          ...result.plans.filter(
            newPlan =>
              !this.plans.some(existingPlan => existingPlan.id == newPlan.id)
          )
        );
        this.isSearchingPlans = false;
      });
    }
    this._planSearch = value;
  }

  get planSearch() {
    return this._planSearch;
  }
}
</script>
<style>
/* fix for vuetify datepicker align issues in rtl */
.v-date-picker-table--date td {
  direction: ltr;
}
</style>
