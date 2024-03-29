<template>
  <div>
    <h2 class="headline primary--text font-weight-bold my-6" tabindex="0">
      לפי מיקום
    </h2>
    <v-row>
      <v-col cols="12" sm="5">
        <v-autocomplete
          :items="suggestedLocations"
          :loading="isLoading"
          :search-input.sync="query"
          :menu-props="autocompleteMenuProps"
          @change="handleLocationSelected"
          @focus="handleInputFocused"
          append-icon
          class="scrollable"
          hide-details
          hide-no-data
          item-text="label"
          label="חיפוש כתובת"
          no-filter
          outlined
          return-object
        ></v-autocomplete>
      </v-col>
      <v-col align-self="center" cols="12" sm="5">
        <v-slider
          label='ק"מ'
          inverse-label
          hide-details
          :thumb-label="$vuetify.breakpoint.smAndUp ? 'always' : true"
          min="0"
          max="15"
          value="5"
          step="0.1"
          @change="handleSliderChange"
        />
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn
          block
          x-large
          :disabled="!locationToAdd"
          color="secondary"
          class="font-weight-semibold"
          @click="subscribeToLocation"
        >
          הוספה
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="my-2"
          v-for="(location, i) in subscribedLocations"
          :key="i"
        >
          <v-card-text v-if="location">
            <v-row align="center">
              <v-col md="6">
                <h3 class="subtitle-1" tabindex="0">
                  {{ location.name }}
                </h3>
              </v-col>
              <v-col>
                <h3 class="subtitle-1" tabindex="0">
                  {{ location.radius }} ק"מ
                </h3>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-btn
                  color="primary"
                  class="font-weight-semibold"
                  @click="unsubscribeFromLocation(location)"
                  text
                >
                  הסרה
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card outlined class="h-450px">
          <Leaflet :center="mapCenter" :circles="mapCircles" :zoom="12" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { EsriProvider } from "leaflet-geosearch";
import { Watch } from "vue-property-decorator";
import Leaflet from "./Leaflet";
import { delayScrollToFocusedElement } from "../helpers/functions";

@Component({
  components: {
    Leaflet,
  },
})
export default class LocationSubscription extends Vue {
  @Action updateUser;
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter user;
  debounceTimeout = null;
  isLoading = false;
  locationToAdd = null;
  /** @type {import("leaflet-geosearch").GoogleProvider} */
  provider = null;
  query = "";
  subscribedLocations = [];
  suggestedLocations = [];

  @Watch("query")
  async handleQueryChange(query) {
    this.isLoading = true;
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(async () => {
      this.suggestedLocations = query
        ? await this.provider.search({ query })
        : [];
      this.isLoading = false;
    }, 200);
  }

  @Watch("user")
  handleUserChanged() {
    this.subscribedLocations = this.user && this.user.subscribedLocations;
  }

  handleInputFocused() {
    if (this.$vuetify.breakpoint.smAndDown) {
      delayScrollToFocusedElement();
    }
  }

  handleLocationSelected(location) {
    this.locationToAdd = {
      lng: location.x,
      lat: location.y,
      name: location.label,
      radius: 5,
    };
  }

  handleSliderChange(value) {
    if (!this.locationToAdd) {
      return;
    }
    this.locationToAdd.radius = value;
  }

  async mounted() {
    this.subscribedLocations =
      (this.user && this.user.subscribedLocations) || [];
    this.provider = new EsriProvider();
  }

  async subscribeToLocation() {
    this.subscribedLocations.push(this.locationToAdd);
    await this.updateSubscriptions();
    this.locationToAdd = null;
    this.query = "";
  }

  async subscribeToCommitteeBySearchString(value) {
    const committee = this.committees.find((c) => c.id === value);
    await this.subscribeToCommittee(committee);
  }

  async updateSubscriptions() {
    await this.updateUser({
      subscribedLocations: this.subscribedLocations,
    });
  }

  unsubscribeFromLocation(location) {
    this.subscribedLocations.splice(
      this.subscribedLocations.findIndex((l) => l.name === location.name),
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
        openOnFocus: true,
      };
    }
    return undefined;
  }

  get mapCenter() {
    return this.mapCircles.length
      ? this.mapCircles[0]
      : { lat: 32.0853, lng: 34.7818 };
  }

  get mapCircles() {
    if (this.locationToAdd) {
      return [this.locationToAdd, ...this.subscribedLocations];
    }
    return this.subscribedLocations || [];
  }
}
</script>
