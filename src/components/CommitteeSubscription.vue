<template>
  <div>
    <v-expand-transition>
      <v-row v-if="subscribedCommittees.length">
        <v-col>
          <v-row>
            <v-col>
              <h4 class="title primary--text d-inline-block right" tabindex="0">
                אני מקבל/ת התראות על הועדות:
              </h4>
            </v-col>
          </v-row>
          <v-slide-y-transition group tag="div" class="row">
            <v-col
              v-for="item in subscribedCommittees"
              :key="item.id"
              cols="12"
              sm="4"
            >
              <v-card height="100%" v-if="item.id" color="accent" dark>
                <v-card-text class="subtitle-1">
                  <v-row>
                    <v-col tabindex="0">
                      {{ item.sid }}
                    </v-col>
                    <v-col class="shrink py-0 px-1">
                      <v-btn icon @click="unsubscribeFromCommittee(item.id)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-slide-y-transition>
        </v-col>
      </v-row>
    </v-expand-transition>
    <v-row>
      <v-col>
        <v-card flat class="pa-4">
          <v-row>
            <v-col cols="12" md="8">
              <h4 class="title primary--text" tabindex="0">
                בחירת ועדות להתראות
              </h4>
            </v-col>
            <v-col>
              <v-text-field
                hide-details
                label="חיפוש"
                append-icon="mdi-magnify"
                v-model="committeeSearch"
                class="pt-0"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-data-table
            :headers="committeeHeaders"
            :items="committees"
            :search="committeeSearch"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                color="secondary"
                small
                depressed
                @click="subscribeToCommittee(item)"
                v-if="!checkIfSubscribed(item.id)"
              >
                <v-icon small left>mdi-plus</v-icon>
                הוספה
              </v-btn>
              <v-btn
                v-else
                small
                color="primary"
                text
                @click="unsubscribeFromCommittee(item.id)"
              >
                <v-icon small left>mdi-check</v-icon>
                נוסף
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action, Mutation } from "vuex-class";
import { Getters, ActionTypes } from "../helpers/constants";
import store from "../plugins/store";

@Component()
export default class CommitteeSubscription extends Vue {
  @Action(ActionTypes.UPDATE_USER) updateUser;
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter(Getters.USER) user;
  /** @type {string} */
  @Getter(Getters.JWT) jwt;
  /** @type {import("../../graphql/types").Committee[]} */
  @Getter(Getters.COMMITTEES) committees;
  @Mutation setLoading;
  committeeSearch = "";
  subscribedCommittees = [];
  tab = null;
  committeeHeaders = [
    { text: "שם ועדה", value: "sid" },
    { text: "מחוז", value: "area.sid" },
    { text: "הוספה", value: "action", sortable: false }
  ];

  checkIfSubscribed(committeeId) {
    return this.subscribedCommittees.some(
      committee => committee.id == committeeId
    );
  }

  async mounted() {
    this.setLoading(true);
    await store.dispatch(ActionTypes.FETCH_COMMITTEES);
    await store.dispatch(ActionTypes.FETCH_USER_SUBSCRIPTIONS);
    this.subscribedCommittees = this.user.subscribedCommittees;
    this.setLoading(false);
  }

  subscribeToCommittee(committee) {
    this.subscribedCommittees.push(committee);
    this.updateSubscriptions();
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
}
</script>
