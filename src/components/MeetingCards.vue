<template>
  <v-row>
    <v-col cols="12">
      <v-card
        class="my-2"
        hover
        :to="'/meeting/' + item.id"
        v-ripple="{ class: `secondary--text` }"
        v-for="(item, i) in meetings"
        :key="i"
      >
        <v-card-text>
          <div class="d-flex align-center">
            <h3 class="subtitle-1" v-if="item.headline" tabindex="0">
              {{ item.headline }}
            </h3>
            <v-divider vertical color="black" class="mx-2"></v-divider>
            <h3
              class="subtitle-1 align-self-center text-no-wrap"
              tabindex="0"
              v-if="item.date && item.date.toLocaleDateString"
            >
              {{ item.date.toLocaleDateString("he") }}
            </h3>
            <v-spacer class="mx-3"></v-spacer>
            <v-btn
              icon
              x-small
              v-if="item.isEditable"
              color="accent"
              class="mx-1"
              @click.prevent="$router.push(`/manage/meeting/${item.id}`)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-icon>mdi-arrow-left</v-icon>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class MeetingCards extends Vue {
  /**@type {import("../helpers/typings").MeetingCard[]} */
  @Prop(Array) meetings;
}
</script>
