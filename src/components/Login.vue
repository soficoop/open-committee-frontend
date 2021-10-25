<template>
  <v-dialog
    :value="isLoginVisible"
    @input="setLoginDialog"
    persistent
    max-width="560px"
  >
    <v-card>
      <v-card-text class="py-0">
        <v-row class="py-3">
          <v-col>
            <v-btn
              class="my-1"
              large
              block
              color="white"
              @click="loginWith('google')"
            >
              <v-row>
                <v-col cols="3">
                  <img
                    src="/img/icons/google.svg"
                    height="24"
                    style="vertical-align:middle"
                    class="me-2"
                  />
                </v-col>
                <v-col cols="6" class="d-flex align-center justify-center">
                  כניסה עם google
                </v-col>
                <v-col cols="3" />
              </v-row>
            </v-btn>
            <v-btn
              class="my-1"
              large
              block
              color="primary"
              @click="loginWith('facebook')"
            >
              <v-row>
                <v-col cols="3">
                  <v-icon class="me-2">mdi-facebook</v-icon>
                </v-col>
                <v-col cols="6" class="d-flex align-center justify-center">
                  כניסה עם facebook
                </v-col>
                <v-col cols="3" />
              </v-row>
            </v-btn>
            <v-row class="my-1">
              <v-col class="d-flex align-center"><v-divider /></v-col>
              <v-col class="d-flex shrink">
                <span>או</span>
              </v-col>
              <v-col class="d-flex align-center"><v-divider /></v-col>
            </v-row>
            <v-text-field
              outlined
              label="אימייל"
              name="login-email"
              @keypress.enter="logIn(loginData)"
              autocomplete="username"
              v-model="loginData.email"
              :error="
                loginData.email.length > 0 && !isEmailValid(loginData.email)
              "
              :error-messages="
                loginData.email.length > 0 && !isEmailValid(loginData.email)
                  ? ['נא להכניס כתובת מייל תקינה']
                  : []
              "
            />
            <v-text-field
              outlined
              label="סיסמה"
              hint="לפחות 8 תווים"
              v-model="loginData.password"
              name="login-password"
              autocomplete="current-password"
              class="pb-1"
              :type="loginData.showPassword ? 'text' : 'password'"
              :append-icon="loginData.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="loginData.showPassword = !loginData.showPassword"
              @keypress.enter="logIn(loginData)"
            />
            <v-dialog
              v-model="dialog"
              max-width="400px"
              @click:outside="closeDialog()"
              @keydown.esc="closeDialog()"
            >
              <template v-slot:activator="{ on }">
                <button
                  type="button"
                  class="primary--text cursor-pointer mb-3"
                  v-on="on"
                >
                  שכחת את הסיסמה?
                </button>
              </template>
              <v-card v-if="forgotPasswordData.mailSent === true">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <v-icon color="success" x-large
                          >mdi-checkbox-marked-circle-outline</v-icon
                        >
                      </v-col>
                      <v-col cols="12">
                        <span class="title primary--text">
                          בדקו את תיבת הדואר-האלקטרוני שלכם להמשך תהליך השחזור
                        </span>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" text @click="closeDialog()">
                    סגירה
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card v-else>
                <v-card-title>
                  <span class="headline primary--text">שחזור סיסמה</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="אימייל"
                          name="email-recovery"
                          class="pl-1"
                          v-model="forgotPasswordData.email"
                          :error="
                            forgotPasswordData.email.length > 0 &&
                              !isEmailValid(forgotPasswordData.email)
                          "
                          :error-messages="
                            forgotPasswordData.email.length > 0 &&
                            !isEmailValid(forgotPasswordData.email)
                              ? ['נא להכניס כתובת מייל תקינה']
                              : []
                          "
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                        v-if="forgotPasswordData.mailSent === false"
                        class="pt-0"
                      >
                        <span class="error--text">
                          אירעה שגיאה בשליחת המייל, בידקו שהוזנה כתובת נכונה
                        </span>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" text @click="closeDialog()">
                    ביטול
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="sendRecoveryMail(forgotPasswordData.email)"
                    :disabled="!isEmailValid(forgotPasswordData.email)"
                  >
                    שלח לי מייל שחזור
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              block
              large
              color="secondary"
              @click="logIn(loginData)"
              :disabled="!canLogin"
            >
              התחברות
            </v-btn>
            <v-expand-transition>
              <v-col v-if="authenticationFailed">
                <p class="error--text my-1">
                  {{ this.userIsNotConfirmedMsg }}
                </p>
              </v-col>
            </v-expand-transition>
          </v-col>
        </v-row>
        <v-row dense no-gutters>
          <v-col>
            <p class="caption text-center text-decoration-underline">
              <a @click="setLoginDialog(false)" tabindex="0">
                לא תודה, אולי בהמשך
              </a>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { Component, Watch } from "vue-property-decorator";
import Vue from "vue";
import { Action, Mutation, Getter } from "vuex-class";
import {
  sendForgotPasswordEmail,
  checkIfEmailIsValid
} from "../helpers/functions";
import { apiEndpoint } from "../helpers/constants";

@Component()
export default class Login extends Vue {
  @Action signIn;
  @Getter isLoginVisible;
  @Mutation setLoading;
  @Mutation setLoginDialog;
  @Mutation setLastPath;
  loginData = {
    email: "",
    password: "",
    showPassword: false
  };
  forgotPasswordData = {
    email: "",
    mailSent: ""
  };
  authenticationFailed = false;
  userIsNotConfirmedMsg = "";
  dialog = false;
  isEmailValid = checkIfEmailIsValid;

  @Watch("dialog") onPropertyChanged() {
    this.forgotPasswordData.email = this.loginData.email;
  }

  async logIn(user) {
    if (!this.canLogin) {
      return;
    }
    this.setLoading(true);
    const result = await this.signIn(user);
    this.handleAuthentication(result.status, result.message);
    this.setLoading(false);
    this.setLoginDialog(false);
  }

  async sendRecoveryMail(userMail) {
    this.setLoading(true);
    this.forgotPasswordData.mailSent = await sendForgotPasswordEmail(userMail);
    this.setLoading(false);
  }

  loginWith(provider) {
    this.setLastPath(this.$route.path);
    window.location.href = apiEndpoint + "/connect/" + provider;
  }

  handleAuthentication(isSuccessful, message) {
    if (isSuccessful) {
      this.$emit("login");
    } else {
      this.userIsNotConfirmedMsg =
        message === "Your account email is not confirmed."
          ? "טרם אישרת במייל את חשבונך"
          : "שם משתמש או סיסמה לא נכונים";
      this.authenticationFailed = true;
    }
  }

  closeDialog() {
    this.dialog = false;
    this.forgotPasswordData.mailSent = "";
    this.forgotPasswordData.email = "";
  }

  get canLogin() {
    return (
      this.isEmailValid(this.loginData.email) &&
      this.loginData.password.length >= 8
    );
  }
}
</script>
