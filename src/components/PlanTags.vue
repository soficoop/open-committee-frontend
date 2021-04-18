<template>
  <div>
    <v-chip filter :key="tag.id" v-for="tag in tags">{{ tag.name }}</v-chip>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";

@Component
export default class PlanTags extends Vue {
  /**
   * @type {import("../../graphql/types").Tag[]}
   */
  @Prop(Array) tags;
}
</script>
