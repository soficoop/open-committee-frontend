<template>
  <div>
    <v-card
      v-for="file in files"
      :key="file.id"
      class="d-inline-block me-2"
      color="teal lighten-4"
      min-width="150px"
    >
      <v-card-text class="text-center">{{ file.name }}</v-card-text>
      <v-card-actions>
        <v-btn text block :href="generateUrlFromFile(file)" target="blank">
          לצפייה בקובץ
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { apiEndpoint } from "../helpers/constants";

@Component
export default class FileCards extends Vue {
  @Prop(Array) files;
  generateUrlFromFile(file) {
    return apiEndpoint + file.url;
  }
}
</script>
