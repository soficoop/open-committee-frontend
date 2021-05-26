<template>
  <div>
    <h2 class="headline primary--text font-weight-bold my-6" tabindex="0">
      לפי ישוב
    </h2>
    <v-row>
      <v-col>
        <v-autocomplete
          :items="municipalitySuggestions"
          @change="subscribeToMunicipalityBySearchString"
          :menu-props="autocompleteMenuProps"
          @focus="handleInputFocused"
          class="scrollable"
          hide-details
          item-text="sid"
          item-value="id"
          label="חיפוש"
          outlined
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mx-n1">
        <v-chip
          class="ma-1 body-1"
          v-for="municipality in subscribedMunicipalities"
          :key="municipality.id"
          close
          @click:close="unsubscribeFromMunicipality(municipality.id)"
        >
          {{ municipality.sid }}
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { delayScrollToFocusedElement } from "../helpers/functions";

@Component()
export default class MunicipalitySubscription extends Vue {
  @Action fetchMunicipalities;
  @Action fetchUserSubscriptions;
  @Action updateUser;
  /** @type {import("../../graphql/types").UsersPermissionsUser} */
  @Getter user;
  /** @type {string} */
  @Getter jwt;
  /** @type {import("../../graphql/types").Municipality[]} */
  @Getter municipalities;
  subscribedMunicipalities = [];

  checkIfSubscribed(id) {
    return (
      this.subscribedMunicipalities &&
      this.subscribedMunicipalities.some(m => m.id == id)
    );
  }

  handleInputFocused() {
    if (this.$vuetify.breakpoint.smAndDown) {
      delayScrollToFocusedElement();
    }
  }

  async mounted() {
    this.subscribedMunicipalities =
      this.user && this.user.subscribedMunicipalities;
    await this.fetchMunicipalities();
  }

  subscribeToMunicipality(municipality) {
    this.subscribedMunicipalities.push(municipality);
    this.updateSubscriptions();
  }

  async subscribeToMunicipalityBySearchString(value) {
    const municipality = this.municipalities.find(m => m.id === value);
    await this.subscribeToMunicipality(municipality);
  }

  async updateSubscriptions() {
    await this.updateUser({
      subscribedMunicipalities: this.subscribedMunicipalities.map(m => m.id)
    });
  }

  unsubscribeFromMunicipality(id) {
    this.subscribedMunicipalities.splice(
      this.subscribedMunicipalities.findIndex(m => m.id == id),
      1
    );
    this.updateSubscriptions();
  }
  get autocompleteMenuProps() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return {
        bottom: true,
        offsetY: true,
        offsetOverflow: false,
        allowOverflow: true,
        openOnFocus: true
      };
    }
    return undefined;
  }
  /** @type {import("../../graphql/types").Municipality[]} */
  get municipalitySuggestions() {
    return this.municipalities.filter(m => !this.checkIfSubscribed(m.id));
  }
}
</script>
