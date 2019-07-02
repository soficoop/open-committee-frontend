<template>
  <v-layout wrap align-content-space-around justify-center>
    <v-flex xs12 md5 xl4 class="text-xs-center">
      <v-layout column>
        <v-flex xs1>
          <v-icon size="120px" color="primary" class="my-4">
            mdi-account-circle
          </v-icon>
        </v-flex>
        <v-tabs grow class="my-3" v-model="tab">
          <v-tab>
            התחברות
          </v-tab>
          <v-tab>
            הרשמה
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="overflow-hidden pa-1">
          <v-tab-item>
            <v-flex>
              <v-text-field
                outlined
                label="אימייל"
                v-model="login.email"
                :error="login.email.length > 0 && !isLoginEmailValid"
                :error-messages="
                  login.email.length > 0 && !isLoginEmailValid
                    ? ['נא להכניס כתובת מייל תקינה']
                    : []
                "
              >
              </v-text-field>
            </v-flex>
            <v-expand-transition>
              <v-flex v-if="isLoginEmailValid">
                <v-text-field
                  outlined
                  label="סיסמה"
                  hint="לפחות 8 תווים"
                  v-model="login.password"
                  name="password"
                  :type="login.showPassword ? 'text' : 'password'"
                  :append-icon="login.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="login.showPassword = !login.showPassword"
                >
                </v-text-field>
              </v-flex>
            </v-expand-transition>
            <v-expand-transition>
              <v-flex v-if="login.password.length >= 8">
                <v-btn block large color="primary">
                  התחברות
                </v-btn>
              </v-flex>
            </v-expand-transition>
          </v-tab-item>
          <v-tab-item>
            <v-text-field
              outlined
              label="אימייל"
              v-model="signup.email"
              :error="signup.email.length > 0 && !isSignupEmailValid"
              :error-messages="
                signup.email.length > 0 && !isSignupEmailValid
                  ? ['נא להכניס כתובת מייל תקינה']
                  : []
              "
            >
            </v-text-field>
            <v-text-field
              outlined
              label="סיסמה"
              hint="לפחות 8 תווים"
              v-model="signup.password"
              name="password"
              :type="signup.showPassword ? 'text' : 'password'"
              :append-icon="signup.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="signup.showPassword = !signup.showPassword"
            >
            </v-text-field>
            <v-layout>
              <v-text-field
                outlined
                label="שם פרטי"
                v-model="signup.firstName"
                name="fname"
                class="pl-1"
                :rules="[value => !!value || 'שדה חובה']"
              >
              </v-text-field>
              <v-text-field
                outlined
                class="pr-1"
                label="שם משפחה"
                v-model="signup.lastName"
                name="lname"
                :rules="[value => !!value || 'שדה חובה']"
              >
              </v-text-field>
            </v-layout>
            <v-text-field
              outlined
              label="עיר מגורים"
              v-model="signup.city"
              name="city"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="ארגון"
              v-model="signup.organization"
              name="organization"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="תפקיד"
              v-model="signup.job"
              name="job"
            >
            </v-text-field>
            <v-btn block large color="primary">
              הרשמה
            </v-btn>
          </v-tab-item>
        </v-tabs-items>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
@Component()
export default class Login extends Vue {
  login = {
    email: "",
    password: "",
    showPassword: false
  };
  signup = {
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

  get isLoginEmailValid() {
    return this.login.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  get isSignupEmailValid() {
    return this.signup.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
}
</script>
