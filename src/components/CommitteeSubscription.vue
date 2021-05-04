<template>
  <div>
    <v-row>
      <v-col>
        <v-autocomplete
          hide-details
          outlined
          label="חיפוש"
          :items="committeeSuggestions"
          @change="subscribeToCommitteeBySearchString"
          item-text="sid"
          item-value="id"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="my-2"
          v-for="committee in subscribedCommittees"
          :key="committee.id"
        >
          <v-card-text class="d-flex align-center">
            <h3 class="subtitle-1" tabindex="0">
              {{ committee.sid }}
            </h3>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="font-weight-semibold"
              @click="unsubscribeFromCommittee(committee.id)"
              text
            >
              הסרה
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";

@Component()
export default class CommitteeSubscription extends Vue {
  @Action fetchCommittees;
  @Action updateUser;
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter user;
  /** @type {string} */
  @Getter jwt;
  /** @type {import("../../graphql/types").Committee[]} */
  @Getter committees;
  subscribedCommittees = [];

  checkIfSubscribed(committeeId) {
    return (
      this.subscribedCommittees &&
      this.subscribedCommittees.some(committee => committee.id == committeeId)
    );
  }

  async mounted() {
    this.subscribedCommittees = this.user && this.user.subscribedCommittees;
    await this.fetchCommittees();
  }

  subscribeToCommittee(committee) {
    this.subscribedCommittees.push(committee);
    this.updateSubscriptions();
  }

  async subscribeToCommitteeBySearchString(value) {
    const committee = this.committees.find(c => c.id === value);
    await this.subscribeToCommittee(committee);
  }

  async updateSubscriptions() {
    await this.updateUser({
      subscribedCommittees: this.subscribedCommittees.map(
        committee => committee.id
      )
    });
  }

  unsubscribeFromCommittee(committeeId) {
    this.subscribedCommittees.splice(
      this.subscribedCommittees.findIndex(
        committee => committee.id == committeeId
      ),
      1
    );
    this.updateSubscriptions();
  }
  /** @type {import("../../graphql/types").Committee[]} */
  get committeeSuggestions() {
    return this.committees.filter(c => !this.checkIfSubscribed(c.id));
  }
}
</script>
