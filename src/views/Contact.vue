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
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          outlined
          label="שם מלא"
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
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-btn block large color="secondary">שליחה</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { checkIfEmailIsValid } from "../helpers/functions";
@Component()
export default class Contact extends Vue {
  isEmailValid = checkIfEmailIsValid;
  /** @type {string} */
  name = "";
  /** @type {string} */
  email = "";
  /** @type {string} */
  message = "";
}
</script>
