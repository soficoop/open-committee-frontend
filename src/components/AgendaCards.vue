<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="item in items" :key="item.id">
      <v-hover
        v-slot:default="{ hover }"
        :disabled="$vuetify.breakpoint.smAndDown"
      >
        <v-expand-transition>
          <v-card
            tabindex="0"
            :color="hover ? 'primary' : 'accent'"
            dark
            height="100%"
            hover
            @click.stop="item.click && item.click()"
            :ripple="!!item.click"
          >
            <v-slide-y-transition mode="out-in">
              <v-container v-if="hover || hoveredItem == item.id">
                <v-row>
                  <v-col>
                    <v-row
                      no-gutters
                      v-for="bullet in item.bullets"
                      :key="bullet.key"
                    >
                      <v-col>
                        <div v-if="bullet.key && bullet.value">
                          <span class="teal--text text--accent-2">{{
                            bullet.key + ": "
                          }}</span>
                          <span v-html="bullet.value"></span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-if="areCardsRemovable">
                    <v-btn
                      block
                      color="error"
                      @click.stop="emitRemoveClicked(item.id)"
                    >
                      מחיקה
                    </v-btn>
                  </v-col>
                  <v-col v-if="item.isEditable">
                    <v-btn
                      color="info"
                      @click.stop="emitEditClicked(item.id)"
                      block
                    >
                      עריכה
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
              <v-layout wrap v-else tag="section">
                <v-card-text class="subtitle-2" tabindex="0">
                  <v-icon small>mdi-clipboard-text</v-icon>
                  {{ item.headline }}
                </v-card-text>
                <v-card-title class="title" tabindex="0">
                  {{ item.description }}
                </v-card-title>
              </v-layout>
            </v-slide-y-transition>
          </v-card>
        </v-expand-transition>
      </v-hover>
    </v-col>
  </v-row>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";

@Component
export default class AgendaCards extends Vue {
  @Prop(Boolean) areCardsRemovable;
  @Prop(String) hoveredItem;
  /** @type {import("../helpers/typings").AgendaCard[]} */
  @Prop(Array) items;

  emitRemoveClicked(id) {
    this.$emit("cardRemove", id);
  }

  emitEditClicked(id) {
    this.$emit("cardEdit", id);
  }
}
</script>
