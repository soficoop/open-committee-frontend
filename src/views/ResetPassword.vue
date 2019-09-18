<template>
  <v-container class="pa-md-12">
    <v-layout fill-height wrap>
      <v-row justify="center">
        <v-col cols="auto">
          <div class="b-radius-50 overflow-hidden">
            <v-img
              src="/img/userImage.svg"
              alt="user image placeholder"
              class="d-block user-image"
            />
          </div>
        </v-col>
      </v-row>
      <v-row class="w-100">
        <v-col class="text-center">
          <h1
            class="display-2 font-weight-bold primary--text my-5"
            tabindex="0"
          >
            איפוס סיסמה
          </h1>
        </v-col>
      </v-row>
      <v-row v-if="passwordReseted === true" justify="center">
        <v-col cols="12" class="text-center">
          <v-icon color="success" x-large
            >mdi-checkbox-marked-circle-outline
          </v-icon>
        </v-col>
        <v-col cols="12" class="text-center">
          <span class="title">הסיסמה שונתה בהצלחה</span>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn to="login" color="secondary" text class="title"
            >לעמוד ההתחברות
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" v-else>
        <v-col sm="5" xl="4">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field
                label="סיסמה חדשה"
                hint="לפחות 8 תווים"
                v-model="resetPasswordData.password"
                name="password"
                :type="resetPasswordData.showPassword ? 'text' : 'password'"
                :append-icon="
                  resetPasswordData.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append="
                  resetPasswordData.showPassword = !resetPasswordData.showPassword
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="וידוא סיסמה חדשה"
                hint="הזן את הסיסמה שהזנת בשדה הקודם"
                v-model="resetPasswordData.passwordConfirmation"
                name="password"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col v-if="passwordReseted === false" class="pt-0">
              <span class="error--text">אירעה שגיאה</span>
            </v-col>
            <v-col cols="12">
              <v-expand-transition>
                <v-btn
                  v-if="
                    resetPasswordData.password.length >= 8 &&
                      resetPasswordData.passwordConfirmation.length >= 8
                  "
                  block
                  large
                  color="secondary"
                  :disabled="!isRestFormValid"
                  @click="resetUserPassword(resetPasswordData)"
                  >איפוס
                </v-btn>
              </v-expand-transition>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
    <v-overlay v-model="loader" z-index="9999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { resetPassword } from "../helpers/functions";

@Component()
export default class ResetPassword extends Vue {
  urlParams = new URLSearchParams(window.location.search);
  resetPasswordData = {
    password: "",
    passwordConfirmation: "",
    showPassword: false,
    code: this.urlParams.get("code")
  };
  loader = false;
  passwordReseted = "";

  get isRestFormValid() {
    return (
      this.resetPasswordData.password &&
      this.resetPasswordData.passwordConfirmation &&
      this.resetPasswordData.password ===
        this.resetPasswordData.passwordConfirmation
    );
  }

  async resetUserPassword(resetPasswordData) {
    this.loader = true;
    this.passwordReseted = await resetPassword(resetPasswordData);
    this.loader = false;
  }
}
</script>

<style scoped>
.user-image {
  width: 125px;
  height: 125px;
}
</style>
