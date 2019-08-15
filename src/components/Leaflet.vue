<template>
  <l-map :zoom="15" :center="center" class="l-map">
    <l-marker :lat-lng="center"></l-marker>
    <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
    <l-control position="bottomleft" class="leaflet-bar">
      <a @click="$emit('fullscreenToggle')">
        <v-icon color="primary">mdi-fullscreen</v-icon>
      </a>
    </l-control>
  </l-map>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { LMap, LTileLayer, LMarker, LControl } from "vue2-leaflet";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl
  }
})
export default class Map extends Vue {
  @Prop(Object) center;
}
</script>
<style scoped>
.l-map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
