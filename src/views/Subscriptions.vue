<template>
  <v-container pa-md-12 pa-5>
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
      <div>
        <v-row>
          <v-col>
            <TagSubscription class="py-6" />
            <MunicipalitySubscription class="py-6" />
            <LocationSubscription class="py-6" />
            <CommitteeSubscription class="py-6" />
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
import { Action, Getter, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";

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
  @Getter isLoginVisible;
  @Getter jwt;
  @Mutation setLoading;
  @Mutation setLoginDialog;
  showUnsubscribeDialog = false;

  @Watch("jwt")
  async handleUserChanged() {
    if (!this.jwt) {
      return;
    }
    this.setLoading(true);
    await this.fetchUserSubscriptions();
    this.setLoginDialog(false);
    this.setLoading(false);
  }

  @Watch("isLoginVisible")
  async handleIsLoginVisibleChanged(value) {
    if (!value && !this.jwt) {
      this.$router.go(-1);
    }
  }

  async mounted() {
    console.info("mounted", this.jwt);
    if (this.jwt) {
      console.info("has jwt");
      this.setLoading(true);
      await this.fetchUserSubscriptions();
      this.setLoading(false);
    } else {
      this.setLoginDialog(true);
    }
  }
}
</script>
