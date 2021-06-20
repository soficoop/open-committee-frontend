<template>
  <v-container class="pa-md-12">
    <v-row justify="center">
      <v-col cols="auto">
        <div>
          <v-img
            class="yoga-image d-block"
            src="/img/illustrations/undraw_yoga.svg"
            alt="Woman doing yoga"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <h2 class="display-1 font-weight-bold primary--text my-5" tabindex="0">
          לא תקבלו יותר מיילים מאיתנו.
          <br />
          אנחנו כאן אם תתחרטו :)
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn color="secondary" x-large class="font-weight-semibold" to="/">
          חזרה לדף הבית
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Action, Getter } from "vuex-class";

@Component()
export default class Unsubscribe extends Vue {
  @Action updateUser;
  @Getter user;
  mounted() {
    if (this.user) {
      this.updateSubscriptions();
    }
  }
  async updateSubscriptions() {
    await this.updateUser({
      subscribedCommittees: [],
      subscribedMunicipalities: [],
      subscribedLocations: [],
      subscribedTags: []
    });
  }
}
</script>

<style scoped>
.yoga-image {
  width: 420px;
}
</style>
