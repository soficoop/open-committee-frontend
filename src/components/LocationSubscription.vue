<template>
  <div>
    <h2 class="headline primary--text font-weight-bold my-6" tabindex="0">
      לפי מיקום
    </h2>
    <v-row>
      <v-col>
        <v-autocomplete
          append-icon
          hide-details
          no-filter
          outlined
          label="חיפוש"
          :loading="isLoading"
          :search-input.sync="query"
          :items="suggestedLocations"
          @change="handleLocationSelected"
          item-text="label"
          return-object
        ></v-autocomplete>
      </v-col>
      <v-col align-self="center">
        <v-slider
          hide-details
          thumb-label
          min="0"
          max="15"
          value="5"
          step="0.1"
          @change="handleSliderChange"
        />
      </v-col>
      <v-col cols="2">
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
          v-for="location in subscribedLocations"
          :key="location.name"
        >
          <v-card-text>
            <v-row align="center">
              <v-col cols="6">
                <h3 class="subtitle-1" tabindex="0">
                  {{ location.name }}
                </h3>
              </v-col>
              <v-col>
                <h3 class="subtitle-1" tabindex="0">
                  {{ location.radius }} ק"מ
                </h3>
              </v-col>
              <v-col cols="1">
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
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { EsriProvider } from "leaflet-geosearch";
import { Watch } from "vue-property-decorator";

@Component()
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

  handleLocationSelected(location) {
    this.locationToAdd = {
      lng: location.x,
      lat: location.y,
      name: location.label,
      radius: 5
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

  subscribeToLocation() {
    this.subscribedLocations.push(this.locationToAdd);
    this.updateSubscriptions();
  }

  async subscribeToCommitteeBySearchString(value) {
    const committee = this.committees.find(c => c.id === value);
    await this.subscribeToCommittee(committee);
  }

  async updateSubscriptions() {
    await this.updateUser({
      subscribedLocations: this.subscribedLocations
    });
  }

  unsubscribeFromLocation(location) {
    this.subscribedLocations.splice(
      this.subscribedLocations.findIndex(l => l.name === location.name),
      1
    );
    this.updateSubscriptions();
  }
}
</script>
