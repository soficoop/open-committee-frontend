<template>
  <div v-if="committeeId && user">
    <v-snackbar
      v-model="hasToggledSubscription"
      :top="$vuetify.breakpoint.xsOnly"
    >
      <span v-if="isUserSubscribed">התראות על הועדה הופעלו</span>
      <span v-else>התראות על הועדה כובו</span>
      <v-btn icon @click="hasToggledSubscription = false" color="warning">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-btn
      v-if="user"
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
import { Getters, ActionTypes } from "../helpers/constants";

@Component
export default class SubscriptionToggle extends Vue {
  @Action(ActionTypes.FETCH_USER_SUBSCRIPTIONS) fetchUserSubscriptions;
  @Action(ActionTypes.UPDATE_USER) updateUser;
  /** @type {import("../../graphql/types").UsersPermissionsUser} */
  @Getter(Getters.USER) user;
  @Prop({ type: String, required: true }) committeeId;
  hasToggledSubscription = false;

  get isUserSubscribed() {
    return (
      !!this.user.subscribedCommittees &&
      this.user.subscribedCommittees.some(
        committee => committee.id == this.committeeId
      )
    );
  }

  mounted() {
    this.fetchUserSubscriptions();
  }

  async toggleSubscription() {
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
