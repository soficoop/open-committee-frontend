<template>
  <v-container pa-md-12 pa-5>
    <Login @login="handleLogin" :visible.sync="showLoginDialog" persistent />
    <v-dialog v-model="showUnsubscribeDialog" max-width="420px">
      <v-card>
        <v-card-title>להסיר הכל?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showUnsubscribeDialog = false">ביטול</v-btn>
          <v-btn text color="secondary" to="/unsubscribe">אישור</v-btn>
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
      <div v-if="showSubscriptions">
        <v-row>
          <v-col>
            <TagSubscription :key="keyCommitteeSubscription" class="py-6" />
            <MunicipalitySubscription
              :key="keyLocationSubscription"
              class="py-6"
            />
            <LocationSubscription
              :key="keyMunicipalitySubscription"
              class="py-6"
            />
            <CommitteeSubscription :key="keyTagSubscription" class="py-6" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-divider />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn
              color="warning"
              class="font-weight-semibold"
              large
              @click="showUnsubscribeDialog = true"
            >
              הסרת כל ההתראות
            </v-btn>
          </v-col>
        </v-row>
      </div>
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
import Login from "../components/Login.vue";
import { Action, Getter, Mutation } from "vuex-class";

@Component({
  components: {
    CommitteeSubscription,
    LocationSubscription,
    TagSubscription,
    MunicipalitySubscription,
    Login
  }
})
export default class Subscriptions extends Vue {
  @Action fetchUserSubscriptions;
  @Getter isLoading;
  @Getter user;
  @Mutation setLoading;
  keyCommitteeSubscription = "committee";
  keyLocationSubscription = "location";
  keyMunicipalitySubscription = "municipality";
  keyTagSubscription = "tag";
  showLoginDialog = false;
  showSubscriptions = false;
  showUnsubscribeDialog = false;

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

  async handleLogin() {
    this.setLoading(true);
    await this.fetchUserSubscriptions();
    this.showLoginDialog = false;
    this.remountChildren();
    this.setLoading(false);
  }

  remountChildren() {
    this.keyCommitteeSubscription += "1";
    this.keyLocationSubscription += "1";
    this.keyMunicipalitySubscription += "1";
    this.keyTagSubscription += "1";
  }
}
</script>
