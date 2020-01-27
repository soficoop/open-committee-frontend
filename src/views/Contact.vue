<template>
  <v-container class="pa-md-12">
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold primary--text my-5" tabindex="0">
          נשמח לשמוע מכם!
        </h1>
        <h4 tabindex="0" class="title">
          פנייתכם תגיע לחיים וסביבה, במייל
          <a href="mailto:opencommittee@sviva.net">opencommittee@sviva.net</a>
          ונשתדל להיענות לה בהקדם
        </h4>
      </v-col>
    </v-row>
    <v-fade-transition mode="out-in">
      <v-row v-if="hasSentApplication" justify="center" tag="section">
        <v-col cols="12" md="5">
          <v-img src="img/illustrations/undraw_yoga.svg" alt="yoga"></v-img>
          <h2 class="headline pa-3 text-center text--secondary">
            פנייתכם התקבלה
          </h2>
        </v-col>
      </v-row>
      <div v-else>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              outlined
              label="שם מלא"
              :rules="[value => !!value]"
              v-model="name"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              outlined
              label="אימייל"
              v-model="email"
              hide-details
              :error="email.length > 0 && !isEmailValid(email)"
              :rules="[value => !!value]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-textarea
              outlined
              label="תוכן הפנייה"
              v-model="message"
              hide-details
              :rules="[value => !!value]"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-btn
              block
              large
              color="secondary"
              @click="sendApplication"
              :disabled="!canSendApplication"
              :loading="isSendingApplication"
            >
              שליחה
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="hasApplicationFailed">
            <h4 tabindex="0" class="title error--text">
              שגיאה לא צפויה קרתה. אנא נסו שוב מאוחר יותר.
            </h4>
          </v-col>
        </v-row>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { checkIfEmailIsValid, makeGqlRequest } from "../helpers/functions";
import { createContactApplication } from "../helpers/mutations";
@Component()
export default class Contact extends Vue {
  isEmailValid = checkIfEmailIsValid;
  /** @type {string} */
  name = "";
  /** @type {string} */
  email = "";
  /** @type {string} */
  message = "";
  isSendingApplication = false;
  hasSentApplication = false;
  hasApplicationFailed = false;

  get canSendApplication() {
    return this.name && this.isEmailValid(this.email) && this.message;
  }

  async sendApplication() {
    this.isSendingApplication = true;
    try {
      await makeGqlRequest(createContactApplication, {
        name: this.name,
        email: this.email,
        message: this.message
      });
      this.hasSentApplication = true;
    } catch (e) {
      this.hasApplicationFailed = true;
      console.error(e);
    } finally {
      this.isSendingApplication = false;
    }
  }
}
</script>
