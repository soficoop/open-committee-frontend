<template>
  <v-container class="pa-md-12">
    <v-layout fill-height wrap>
      <v-row class="w-100">
        <v-col>
          <h1
            class="display-2 font-weight-bold primary--text my-5"
            tabindex="0"
          >
            ההתראות שלי
          </h1>
        </v-col>
      </v-row>
      <v-row class="w-100 mb-7" justify="start">
        <v-col cols="auto">
          <v-btn min-height="90" min-width="200" active-class="nadav" x-large
            >התראות לפי ועדה</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn
            disabled
            min-height="90"
            min-width="200"
            active-class="nadav"
            x-large
            >התראות לפי נושאים</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn
            disabled
            min-height="90"
            min-width="200"
            active-class="nadav"
            x-large
            >התראות לפי מיקום</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="w-100">
        <v-col>
          <h2 class="headline font-weight-black primary--text mb-3">
            אני מקבל/ת התראות על הועדות:
          </h2>
        </v-col>
      </v-row>
      <v-row class="w-100 mb-7">
        <v-col cols="12" lg="3">
          <v-card outlined class="text-center pb-11">
            <v-card-actions>
              <v-row justify="end">
                <v-col cols="auto" class="py-0">
                  <v-btn icon class="pt-0">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-title class="text-center d-inline-block py-2"
              >I'm a title</v-card-title
            >
          </v-card>
        </v-col>
        <v-col cols="12" lg="3">
          <v-card outlined class="text-center pb-11">
            <v-card-actions>
              <v-row justify="end">
                <v-col cols="auto" class="py-0">
                  <v-btn icon class="pt-0">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-title class="text-center d-inline-block py-2"
              >I'm a title</v-card-title
            >
          </v-card>
        </v-col>
        <v-col cols="12" lg="3">
          <v-card outlined class="text-center pb-11">
            <v-card-actions>
              <v-row justify="end">
                <v-col cols="auto" class="py-0">
                  <v-btn icon class="pt-0">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-card-title class="text-center d-inline-block py-2"
              >I'm a title</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row class="w-100">
        <v-col>
          <h2 class="headline font-weight-black primary--text mb-3">
            הוסיפו ועדות נוספות להתראות:
          </h2>
        </v-col>
      </v-row>
      <v-row class="w-100">
        <v-col>
          <v-card-text>
            מלאו אחד או יותר מהשדות הבאים,
            <br />ואתרו את הועדות שתרצו לקבל התראות על פעילותן
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select :items="items" label="Solo field" solo></v-select>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { Getters, ActionTypes } from "../helpers/constants";

@Component()
export default class Notifications extends Vue {
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter(Getters.USER) user;
  @Getter(Getters.JWT) jwt;
  @Action(ActionTypes.UPDATE_USER) updateUserAction;

  userInfoData = {};
  tab = null;

  mounted() {
    this.userInfoData = {};
  }

  async updateInfo() {
    await this.updateUserAction(this.userInfoData);
  }
}
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
