<template>
  <v-container class="pa-md-12">
    <v-alert type="success" dense v-if="isUserConfirmed">
      ההרשמה הושלמה, כעת ניתן להתחבר למערכת
    </v-alert>
    <v-layout wrap align-content-space-around justify-center>
      <v-flex xs12 sm5 xl4 class="text-xs-center">
        <v-layout column>
          <v-flex xs1 align-self-center>
            <v-icon size="120px" color="primary" class="my-4"
              >mdi-account-circle</v-icon
            >
          </v-flex>
          <h1
            class="pa-1 headline text-center primary--text"
            v-if="isUserConfirmed"
          >
            התחברות
          </h1>
          <v-tabs
            :height="isUserConfirmed ? '0' : ''"
            grow
            class="my-3 pa-1"
            v-model="tab"
            background-color="transparent"
          >
            <v-tab @click="authenticationFailed = false" class="ma-0"
              >הרשמה
            </v-tab>
            <v-tab @click="authenticationFailed = false" class="ma-0">
              התחברות
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="overflow-hidden pa-1 transparent">
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
                  label="אימייל"
                  v-model="signupData.email"
                  :error="
                    signupData.email.length > 0 &&
                      !isEmailValid(signupData.email)
                  "
                  :error-messages="
                    signupData.email.length > 0 &&
                    !isEmailValid(signupData.email)
                      ? ['נא להכניס כתובת מייל תקינה']
                      : []
                  "
                ></v-text-field>
                <v-text-field
                  label="סיסמה"
                  hint="לפחות 8 תווים"
                  v-model="signupData.password"
                  name="password"
                  :type="signupData.showPassword ? 'text' : 'password'"
                  :append-icon="
                    signupData.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append="
                    signupData.showPassword = !signupData.showPassword
                  "
                ></v-text-field>
                <v-layout>
                  <v-text-field
                    label="שם פרטי"
                    v-model="signupData.firstName"
                    name="fname"
                    class="pl-1"
                    :rules="[value => !!value || 'שדה חובה']"
                  >
                  </v-text-field>
                  <v-text-field
                    class="pr-1"
                    label="שם משפחה"
                    v-model="signupData.lastName"
                    name="lname"
                    :rules="[value => !!value || 'שדה חובה']"
                  ></v-text-field>
                </v-layout>
                <v-text-field
                  label="עיר מגורים"
                  v-model="signupData.city"
                  name="city"
                ></v-text-field>
                <v-text-field
                  label="ארגון"
                  v-model="signupData.organization"
                  name="organization"
                ></v-text-field>
                <v-text-field
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
                    <v-flex v-if="authenticationFailed">
                      <p class="error--text my-1">המשתמש כבר קיים במערכת</p>
                    </v-flex>
                  </div>
                </v-expand-transition>
              </div>
            </v-tab-item>
            <v-tab-item>
              <v-flex>
                <v-text-field
                  label="אימייל"
                  name="login-email"
                  v-model="loginData.email"
                  :error="
                    loginData.email.length > 0 && !isEmailValid(loginData.email)
                  "
                  :error-messages="
                    loginData.email.length > 0 && !isEmailValid(loginData.email)
                      ? ['נא להכניס כתובת מייל תקינה']
                      : []
                  "
                >
                </v-text-field>
              </v-flex>
              <v-expand-transition>
                <v-flex v-if="isEmailValid(loginData.email)">
                  <v-text-field
                    label="סיסמה"
                    hint="לפחות 8 תווים"
                    v-model="loginData.password"
                    name="login-password"
                    class="pb-1"
                    :type="loginData.showPassword ? 'text' : 'password'"
                    :append-icon="
                      loginData.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="
                      loginData.showPassword = !loginData.showPassword
                    "
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
                </v-flex>
              </v-expand-transition>
              <v-expand-transition>
                <v-flex v-if="canLogin">
                  <v-btn block large color="secondary" @click="logIn(loginData)"
                    >התחברות</v-btn
                  >
                </v-flex>
              </v-expand-transition>
              <v-expand-transition>
                <v-flex v-if="authenticationFailed">
                  <p class="error--text my-1">
                    {{ this.userIsNotConfirmedMsg }}
                  </p>
                </v-flex>
              </v-expand-transition>
            </v-tab-item>
          </v-tabs-items>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Component, Watch } from "vue-property-decorator";
import Vue from "vue";
import { Action, Mutation, Getter } from "vuex-class";
import {
  sendForgotenPasswordEmail,
  checkIfEmailIsValid
} from "../helpers/functions";

@Component()
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
  }

  async logIn(user) {
    const result = await this.signIn(user);
    this.handleAuthentication(result.status, result.message);
  }

  async sendRecoveryMail(userMail) {
    this.setLoading(true);
    this.forgotPasswordData.mailSent = await sendForgotenPasswordEmail(
      userMail
    );
    this.setLoading(false);
  }

  handleAuthentication(isSuccessful, message) {
    if (isSuccessful) {
      const nextRoute =
        this.user && this.user.subscribedCommittees.length
          ? "/"
          : "/subscriptions";
      this.$router.push(nextRoute);
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
}
</script>
