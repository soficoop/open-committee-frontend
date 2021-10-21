<template>
  <l-map :zoom="zoom" :center="center" class="l-map" ref="leafletMap">
    <l-marker :lat-lng="marker" v-if="marker"></l-marker>
    <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
    <l-circle
      v-for="(circle, i) in circles"
      :key="i"
      :lat-lng="circle"
      :radius="circle.radius * 1000"
      color="#12cdd4"
    />
  </l-map>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { LMap, LTileLayer, LMarker, LControl, LCircle } from "vue2-leaflet";
import { Prop } from "vue-property-decorator";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";

@Component({
  components: {
    LCircle,
    LControl,
    LMap,
    LMarker,
    LTileLayer
  }
})
export default class Leaflet extends Vue {
  @Prop(Object) center;
  @Prop(Object) marker;
  @Prop(Array) circles;
  @Prop({ type: Number, default: 15 }) zoom;
  mounted() {
    this.$refs.leafletMap.mapObject.addControl(
      new window.L.Control.Fullscreen({ position: "bottomleft" })
    );
  }
}
</script>
<style scoped>
.l-map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
