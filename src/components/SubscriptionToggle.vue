<template>
  <div v-if="committeeId">
    <v-snackbar
      v-model="hasToggledSubscription"
      :top="$vuetify.breakpoint.xsOnly"
    >
      <span v-if="isUserSubscribed">התראות על הועדה הופעלו</span>
      <span v-else>התראות על הועדה כובו</span>
    </v-snackbar>
    <v-btn
      fixed
      fab
      bottom
      left
      :color="isUserSubscribed ? 'grey lighten-1' : 'secondary'"
      @click="toggleSubscription"
    >
      <v-icon v-if="!isUserSubscribed">mdi-bell-ring</v-icon>
      <v-icon v-else color="white">mdi-bell-off</v-icon>
    </v-btn>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component
export default class SubscriptionToggle extends Vue {
  @Action fetchUserSubscriptions;
  @Action updateUser;
  /** @type {import("../../graphql/types").UsersPermissionsUser} */
  @Getter user;
  @Prop({ type: String, required: true }) committeeId;
  hasToggledSubscription = false;

  get isUserSubscribed() {
    return (
      !!this.user &&
      !!this.user.subscribedCommittees &&
      this.user.subscribedCommittees.some(
        committee => committee.id == this.committeeId
      )
    );
  }

  mounted() {
    if (this.user) {
      this.fetchUserSubscriptions();
    }
  }

  async toggleSubscription() {
    if (!this.user) {
      this.$router.push("/login");
      return;
    }
    if (this.isUserSubscribed) {
      await this.updateUser({
        subscribedCommittees: this.user.subscribedCommittees
          .map(committee => committee.id)
          .filter(id => id != this.committeeId)
      });
    } else {
      await this.updateUser({
        subscribedCommittees: [
          ...this.user.subscribedCommittees.map(committee => committee.id),
          this.committeeId
        ]
      });
    }
    this.fetchUserSubscriptions();
    this.hasToggledSubscription = true;
  }
}
</script>
