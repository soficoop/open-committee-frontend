<template>
  <v-container class="pa-md-12">
    <v-layout fill-height wrap>
      <v-row class="w-100">
        <v-col>
          <h1
            class="display-2 font-weight-bold primary--text my-5"
            tabindex="0"
          >
            איפוס סיסמה
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="4">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field
                label="סיסמה"
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
                label="וידוא סיסמה"
                hint="הזן את הסיסמה שהזנת בשדה הקודם"
                v-model="resetPasswordData.passwordConfirmation"
                name="password"
                :type="resetPasswordData.showConfPassword ? 'text' : 'password'"
                :append-icon="
                  resetPasswordData.showConfPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append="
                  resetPasswordData.showConfPassword = !resetPasswordData.showConfPassword
                "
              ></v-text-field>
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
                  @click="resetPassword(resetPasswordData)"
                  >איפוס</v-btn
                >
              </v-expand-transition>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";

@Component()
export default class ResetPassword extends Vue {
  resetPasswordData = {
    password: "",
    passwordConfirmation: "",
    showPassword: false,
    showConfPassword: false
  };

  get isRestFormValid() {
    return (
      this.resetPasswordData.password &&
      this.resetPasswordData.passwordConfirmation &&
      this.resetPasswordData.password ===
        this.resetPasswordData.passwordConfirmation
    );
  }

  async resetPassword(user) {
    // const result = await this.signUpAction(user);
    // this.handleAuthentication(result);
    console.log(user);
  }
}
</script>

<style scoped></style>
