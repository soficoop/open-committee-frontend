<template>
  <div v-if="center">
    <Leaflet :center="center" @fullscreenToggle="toggleDialog" class="h-150" />
    <v-dialog v-model="dialog" fullscreen>
      <Leaflet :center="center" @fullscreenToggle="toggleDialog" />
    </v-dialog>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Leaflet from "./Leaflet";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    Leaflet
  }
})
export default class Map extends Vue {
  @Prop(String) query;
  dialog = false;
  center = null;
  /** @type {OpenStreetMapProvider} */
  provider = null;

  @Watch("query")
  async handleQueryChanged() {
    const results = await this.provider.search({ query: this.query });
    if (results.length) {
      this.center = { lon: results[0].x, lat: results[0].y };
    }
  }

  async mounted() {
    this.provider = new OpenStreetMapProvider();
    this.handleQueryChanged();
  }

  toggleDialog() {
    this.dialog = !this.dialog;
  }
}
</script>
<style scoped>
.h-150 {
  height: 150px;
}
</style>
