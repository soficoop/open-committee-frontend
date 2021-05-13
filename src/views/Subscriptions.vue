<template>
  <v-container pa-md-12 pa-5>
    <v-dialog v-model="showLoginDialog" persistent max-width="420px">
      <v-card>
        <v-card-title>
          אינך מחובר/ת למערכת
        </v-card-title>
        <v-card-text>
          על-מנת לצפות בהתראות ולהוסיף התראות חדשות, יש להתחבר למערכת
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$router.go(-1)">ביטול</v-btn>
          <v-btn text color="secondary" to="/login">קחו אותי להתחברות</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="mb-5">
      <v-col>
        <h1 class="display-1 font-weight-black primary--text" tabindex="0">
          ההתראות שלי
        </h1>
      </v-col>
    </v-row>
    <v-fade-transition>
      <v-row v-if="showSubscriptions">
        <v-col>
          <TagSubscription class="py-6" />
          <MunicipalitySubscription class="py-6" />
          <LocationSubscription class="py-6" />
          <CommitteeSubscription class="py-6" />
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import CommitteeSubscription from "../components/CommitteeSubscription.vue";
import TagSubscription from "../components/TagSubscription.vue";
import MunicipalitySubscription from "../components/MunicipalitySubscription.vue";
import LocationSubscription from "../components/LocationSubscription.vue";
import { Action, Getter, Mutation } from "vuex-class";

@Component({
  components: {
    CommitteeSubscription,
    LocationSubscription,
    TagSubscription,
    MunicipalitySubscription
  }
})
export default class Subscriptions extends Vue {
  @Action fetchUserSubscriptions;
  @Getter isLoading;
  @Getter user;
  @Mutation setLoading;
  showLoginDialog = false;
  showSubscriptions = false;

  async mounted() {
    if (this.user) {
      this.setLoading(true);
      await this.fetchUserSubscriptions();
      this.setLoading(false);
    } else {
      this.showLoginDialog = true;
    }
    this.showSubscriptions = true;
  }
}
</script>
