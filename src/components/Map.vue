<template>
  <div v-if="center">
    <l-map :zoom="15" :center="center" class="l-map">
      <l-marker :lat-lng="center"></l-marker>
      <l-tile-layer
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
    </l-map>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
})
export default class Map extends Vue {
  @Prop(String) query;
  center = null;
  async mounted() {
    const query = this.query;
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query });
    if (results.length) {
      this.center = { lon: results[0].x, lat: results[0].y };
    }
  }
}
</script>
<style scoped>
.l-map {
  width: 100%;
  height: 150px;
}
</style>
