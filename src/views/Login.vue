<template>
  <v-container class="pa-md-12">
    <v-layout wrap align-content-space-around justify-center>
      <v-flex xs12 md5 xl4 class="text-xs-center">
        <v-layout column>
          <v-flex xs1 align-self-center>
            <v-icon size="120px" color="primary" class="my-4"
              >mdi-account-circle</v-icon
            >
          </v-flex>
          <v-tabs
            grow
            class="my-3"
            v-model="tab"
            background-color="transparent"
          >
            <v-tab @click="authenticationFailed = false">התחברות</v-tab>
            <v-tab @click="authenticationFailed = false">הרשמה</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="overflow-hidden pa-1 transparent">
            <v-tab-item>
              <v-flex>
                <v-text-field
                  label="אימייל"
                  v-model="loginData.email"
                  :error="loginData.email.length > 0 && !isLoginEmailValid"
                  :error-messages="
                    loginData.email.length > 0 && !isLoginEmailValid
                      ? ['נא להכניס כתובת מייל תקינה']
                      : []
                  "
                ></v-text-field>
              </v-flex>
              <v-expand-transition>
                <v-flex v-if="isLoginEmailValid">
                  <v-text-field
                    label="סיסמה"
                    hint="לפחות 8 תווים"
                    v-model="loginData.password"
                    name="password"
                    :type="loginData.showPassword ? 'text' : 'password'"
                    :append-icon="
                      loginData.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="
                      loginData.showPassword = !loginData.showPassword
                    "
                  ></v-text-field>
                </v-flex>
              </v-expand-transition>
              <v-expand-transition>
                <v-flex v-if="loginData.password.length >= 8">
                  <v-btn block large color="secondary" @click="logIn(loginData)"
                    >התחברות</v-btn
                  >
                </v-flex>
              </v-expand-transition>
              <v-expand-transition>
                <v-flex v-if="authenticationFailed">
                  <p class="error--text my-1">שם משתמש או סיסמה לא נכונים</p>
                </v-flex>
              </v-expand-transition>
            </v-tab-item>
            <v-tab-item>
              <v-text-field
                label="אימייל"
                v-model="signupData.email"
                :error="signupData.email.length > 0 && !isSignupEmailValid"
                :error-messages="
                  signupData.email.length > 0 && !isSignupEmailValid
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
                ></v-text-field>
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
              <v-btn
                block
                large
                color="secondary"
                :disabled="!isSignUpFormValid"
                @click="signUp(signupData)"
                >הרשמה</v-btn
              >
              <v-expand-transition>
                <v-flex v-if="authenticationFailed">
                  <p class="error--text my-1">המשתמש כבר קיים במערכת</p>
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
import Component from "vue-class-component";
import Vue from "vue";
import { Action } from "vuex-class";
import { ActionTypes } from "../helpers/constants";
@Component()
export default class Login extends Vue {
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
  tab = null;
  authenticationFailed = false;

  @Action(ActionTypes.SIGN_UP) signUpAction;
  @Action(ActionTypes.SIGN_IN) loginAction;

  async signUp(user) {
    const result = await this.signUpAction(user);
    this.handleAuthentication(result);
  }

  async logIn(user) {
    const result = await this.loginAction(user);
    this.handleAuthentication(result);
  }

  handleAuthentication(isSuccessful) {
    if (isSuccessful) {
      this.$router.push("/");
    } else {
      this.authenticationFailed = true;
    }
  }

  get isLoginEmailValid() {
    return this.loginData.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  get isSignupEmailValid() {
    return this.signupData.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  get isSignUpFormValid() {
    return (
      this.isSignupEmailValid &&
      this.signupData.firstName &&
      this.signupData.lastName &&
      this.signupData.password
    );
  }
}
</script>
