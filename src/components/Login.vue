<template>
  <v-dialog v-model="isVisible" :persistent="persistent" max-width="560px">
    <v-card>
      <v-tabs grow v-model="tab" background-color="transparent">
        <v-tab @click="authenticationFailed = false">
          הרשמה
        </v-tab>
        <v-tab @click="authenticationFailed = false">
          התחברות
        </v-tab>
      </v-tabs>
      <v-card-text>
        <v-row class="py-3">
          <v-col>
            <v-btn
              class="my-1"
              large
              block
              color="white"
              :href="getLoginLink('google')"
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
              :href="getLoginLink('facebook')"
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
            <v-tabs-items
              v-model="tab"
              class="overflow-hidden pa-1 transparent"
            >
              <v-tab-item>
                <div v-if="registrationSuccess">
                  <v-row>
                    <v-col cols="12" class="text-center mt-6">
                      <v-icon color="success" x-large
                        >mdi-checkbox-marked-circle-outline</v-icon
                      >
                    </v-col>
                    <v-col cols="12">
                      <span class="title primary--text">
                        בדקו את תיבת הדואר-האלקטרוני שלכם לסיום תהליך ההרשמה
                      </span>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <v-text-field
                    outlined
                    label="אימייל"
                    v-model="signupData.email"
                    :error="
                      signupData.email.length > 0 &&
                        !isEmailValid(signupData.email)
                    "
                    autocomplete="email"
                    :error-messages="
                      signupData.email.length > 0 &&
                      !isEmailValid(signupData.email)
                        ? ['נא להכניס כתובת מייל תקינה']
                        : []
                    "
                  />
                  <v-text-field
                    outlined
                    label="סיסמה"
                    hint="לפחות 8 תווים"
                    v-model="signupData.password"
                    autocomplete="new-password"
                    name="password"
                    :type="signupData.showPassword ? 'text' : 'password'"
                    :append-icon="
                      signupData.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="
                      signupData.showPassword = !signupData.showPassword
                    "
                  />
                  <v-row dense>
                    <v-col>
                      <v-text-field
                        outlined
                        label="שם פרטי"
                        v-model="signupData.firstName"
                        name="fname"
                        :rules="[value => !!value || 'שדה חובה']"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        outlined
                        label="שם משפחה"
                        v-model="signupData.lastName"
                        name="lname"
                        :rules="[value => !!value || 'שדה חובה']"
                      />
                    </v-col>
                  </v-row>
                  <v-text-field
                    outlined
                    label="עיר מגורים"
                    v-model="signupData.city"
                    name="city"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    label="ארגון"
                    v-model="signupData.organization"
                    name="organization"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    label="תפקיד"
                    v-model="signupData.job"
                    name="job"
                  ></v-text-field>
                  <p class="caption text-center">
                    עם ההרשמה אני מאשר/ת את
                    <a href="/terms" target="blank"> תנאי השימוש</a>
                  </p>
                  <v-btn
                    id="submit-button"
                    block
                    large
                    color="secondary"
                    :disabled="!isSignUpFormValid"
                    @click="executeSignUp(signupData)"
                    >הרשמה</v-btn
                  >
                  <v-expand-transition>
                    <div>
                      <v-col v-if="authenticationFailed">
                        <p class="error--text my-1">המשתמש כבר קיים במערכת</p>
                      </v-col>
                    </div>
                  </v-expand-transition>
                </div>
              </v-tab-item>
              <v-tab-item>
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
                  :append-icon="
                    loginData.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append="
                    loginData.showPassword = !loginData.showPassword
                  "
                  @keypress.enter="logIn(loginData)"
                ></v-text-field>
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
                              בדקו את תיבת הדואר-האלקטרוני שלכם להמשך תהליך
                              השחזור
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
                            <span class="error--text"
                              >אירעה שגיאה בשליחת המייל, בידקו כי הוזנה כתובת
                              אימייל נכונה
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
                        >שלח לי מייל שחזור
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
              </v-tab-item>
            </v-tabs-items>
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
import { apiEndpoint, lastPath } from "../helpers/constants";

@Component({
  props: {
    visible: { type: Boolean, required: true },
    persistent: { default: false, type: Boolean }
  }
})
export default class Login extends Vue {
  @Mutation setLoading;
  loginData = {
    email: "",
    password: "",
    showPassword: false
  };
  signupData = {
    email: "",
    password: "",
    showPassword: false,
    firstName: "",
    lastName: "",
    city: "",
    organization: "",
    job: ""
  };
  forgotPasswordData = {
    email: "",
    mailSent: ""
  };
  tab = 0;
  authenticationFailed = false;
  userIsNotConfirmedMsg = "";
  dialog = false;
  registrationSuccess = false;
  isEmailValid = checkIfEmailIsValid;

  @Watch("dialog") onPropertyChanged() {
    this.forgotPasswordData.email = this.loginData.email;
  }

  @Action signUp;
  @Action signIn;
  @Getter user;

  created() {
    this.tab = this.initialTab;
  }

  get initialTab() {
    const tabParam = this.$route.params.tab || 0;
    return this.isUserConfirmed ? 1 : tabParam;
  }

  get isUserConfirmed() {
    return this.$route.path === "/login/user-is-confirmed";
  }

  async executeSignUp(user) {
    this.setLoading(true);
    this.registrationSuccess = await this.signUp(user);
    this.authenticationFailed = !this.registrationSuccess;
    this.setLoading(false);
    if (this.registrationSuccess) {
      try {
        // eslint-disable-next-line no-undef
        fbq("trackCustom", "SubscribedCommittee");
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async logIn(user) {
    if (!this.canLogin) {
      return;
    }
    this.setLoading(true);
    const result = await this.signIn(user);
    this.handleAuthentication(result.status, result.message);
    this.setLoading(false);
  }

  async sendRecoveryMail(userMail) {
    this.setLoading(true);
    this.forgotPasswordData.mailSent = await sendForgotPasswordEmail(userMail);
    this.setLoading(false);
  }

  getLoginLink(provider) {
    localStorage.setItem(lastPath, this.$route.path);
    return apiEndpoint + "/connect/" + provider;
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

  get isSignUpFormValid() {
    return (
      !!this.isEmailValid(this.signupData.email) &&
      !!this.signupData.firstName &&
      !!this.signupData.lastName &&
      !!this.signupData.password &&
      this.signupData.password.length > 7
    );
  }

  get isVisible() {
    return this.visible;
  }

  set isVisible(value) {
    this.$emit("update:visible", value);
  }
}
</script>
