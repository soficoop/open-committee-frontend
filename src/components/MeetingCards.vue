<template>
  <v-layout column>
    <v-flex v-for="(item, i) in meetings" :key="i">
      <v-layout align-center>
        <v-btn
          icon
          small
          v-if="editable"
          color="accent"
          class="me-1"
          @click="$emit('edit', item.id)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-card
          class="my-1"
          width="100%"
          hover
          :to="'/meeting/' + item.id"
          v-ripple="{ class: `secondary--text` }"
        >
          <v-card-title>
            <v-layout>
              <h3 class="subtitle-1" v-if="item.headline" tabindex="0">
                {{ item.headline }}
              </h3>
              <v-divider vertical color="black" class="mx-2"></v-divider>
              <h3
                class="subtitle-1 align-self-center"
                tabindex="0"
                v-if="typeof item.date != 'string'"
              >
                {{ item.date.toLocaleDateString("he") }}
              </h3>
              <v-spacer class="mx-3"></v-spacer>
              <v-icon>mdi-arrow-left</v-icon>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class MeetingCards extends Vue {
  /**@type {import("../helpers/typings").MeetingCard[]} */
  @Prop(Array) meetings;
  @Prop(Boolean) editable;
}
</script>
