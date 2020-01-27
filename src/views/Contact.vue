<template>
  <v-fade-transition mode="out-in">
    <v-container
      v-if="hasSentApplication"
      tag="section"
      class="fill-height d- flex justify-center"
    >
      <v-row justify="center">
        <v-col cols="12" md="5">
          <h1
            class="display-2 font-weight-bold primary--text py-8 text-center"
            tabindex="0"
          >
            תודה!
          </h1>
          <v-img
            src="img/illustrations/undraw_shared_workspace.svg"
            alt="thank-you"
            eager
          ></v-img>
          <h2 class="headline pa-3 text-center text--secondary">
            פנייתכם התקבלה
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-md-12 fill-height d-flex justify-center" v-else>
      <v-row justify="center" align="center">
        <v-col>
          <v-card flat class="pa-5">
            <v-card-text>
              <v-row align="center">
                <v-col cols="12" md="4" class="pa-5">
                  <v-img
                    src="img/illustrations/undraw_certificate.svg"
                    alt="contact"
                  ></v-img>
                </v-col>
                <v-col cols="12" md="8">
                  <h2 class="headline font-weight-bold primary--text mb-5">
                    נשמח לשמוע מכם!
                  </h2>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        outlined
                        label="שם מלא"
                        :rules="[value => !!value]"
                        v-model="name"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
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
                    <v-col>
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
                    <v-col>
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
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-fade-transition>
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
