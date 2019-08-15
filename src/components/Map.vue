<template>
  <div v-if="center">
    <Leaflet :center="center" @fullscreenToggle="switchDialog" class="h-150" />
    <v-dialog v-model="dialog" fullscreen>
      <Leaflet :center="center" @fullscreenToggle="switchDialog" />
    </v-dialog>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Leaflet from "./Leaflet";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    Leaflet
  }
})
export default class Map extends Vue {
  @Prop(String) query;
  dialog = false;
  center = null;
  async mounted() {
    const query = this.query;
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query });
    if (results.length) {
      this.center = { lon: results[0].x, lat: results[0].y };
    }
  }

  switchDialog() {
    this.dialog = !this.dialog;
  }
}
</script>
<style scoped>
.h-150 {
  height: 150px;
}
</style>
