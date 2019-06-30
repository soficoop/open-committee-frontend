<template>
  <v-layout wrap align-content-space-around justify-center>
    <v-flex xs12 md5 class="text-xs-center">
      <v-icon size="120px" color="primary" class="my-4"
        >mdi-account-circle</v-icon
      >
      <v-text-field
        outlined
        label="אימייל"
        v-model="email"
        :error="email.length > 0 && !isEmailValid"
        :error-messages="
          email.length > 0 && !isEmailValid
            ? ['נא להכניס כתובת מייל תקינה']
            : []
        "
      >
      </v-text-field>
      <v-expand-transition>
        <v-text-field
          outlined
          label="סיסמה"
          v-if="isEmailValid"
          hint="לפחות 8 תווים"
          v-model="password"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        >
        </v-text-field>
      </v-expand-transition>
      <v-expand-transition>
        <v-btn block large color="primary" v-if="password.length > 7">
          הרשמה
        </v-btn>
      </v-expand-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
@Component()
export default class Login extends Vue {
  /**@type {string} */
  email = "";
  password = "";
  showPassword = false;
  get isEmailValid() {
    return this.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
}
</script>
