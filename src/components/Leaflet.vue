<template>
  <l-map :zoom="zoom" :center="center" class="l-map">
    <l-marker :lat-lng="marker" v-if="marker"></l-marker>
    <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
    <l-circle
      v-for="(circle, i) in circles"
      :key="i"
      :lat-lng="circle"
      :radius="circle.radius * 1000"
      color="#12cdd4"
    />
    <l-control
      position="bottomleft"
      class="leaflet-bar"
      v-if="$listeners.fullscreenToggle"
    >
      <a @click="$emit('fullscreenToggle')">
        <v-icon color="primary">mdi-fullscreen</v-icon>
      </a>
    </l-control>
  </l-map>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { LMap, LTileLayer, LMarker, LControl, LCircle } from "vue2-leaflet";
import { Prop } from "vue-property-decorator";

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl,
    LCircle
  }
})
export default class Map extends Vue {
  @Prop(Object) center;
  @Prop(Object) marker;
  @Prop(Array) circles;
  @Prop({ type: Number, default: 15 }) zoom;
}
</script>
<style scoped>
.l-map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
