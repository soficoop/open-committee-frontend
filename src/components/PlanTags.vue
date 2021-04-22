<template>
  <div class="mx-n1 my-1">
    <v-chip
      class="mx-1 s-pointer-events-none"
      :key="tag.id"
      v-for="tag in planTags"
    >
      {{ tag.name }}
    </v-chip>
    <v-chip
      outlined
      class="mx-1"
      color="primary"
      @click="dialog = true"
      v-if="this.canUserAddTag"
    >
      <v-icon left>mdi-plus</v-icon>
      <span tabindex="0">הוספת תגית</span>
    </v-chip>
    <v-dialog
      v-model="dialog"
      max-width="400px"
      @keydown.esc="closeDialog"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-card-title tabindex="0">תיוג תכנית</v-card-title>
        <v-card-text>
          <v-combobox
            outlined
            v-model="selectedTags"
            label="חיפוש"
            append-icon
            small-chips
            multiple
            deletable-chips
            class="tag-input"
            :search-input.sync="tagSearch"
          >
          </v-combobox>
          <h4
            class="subtitle-1 px-4 font-weight-semibold primary--text"
            tabindex="0"
          >
            הצעות
          </h4>
          <v-list>
            <v-list-item
              v-for="tag in optionalTags"
              :key="tag"
              @click="appendSelectedTags(tag)"
            >
              <v-list-item-title tabindex="0" v-text="tag"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">
            ביטול
          </v-btn>
          <v-btn
            color="secondary"
            class="font-weight-semibold"
            text
            @click="submitTags"
          >
            אישור
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";

@Component
export default class PlanTags extends Vue {
  @Action fetchTags;
  @Action tagSelectedPlan;
  @Getter tags;
  @Getter jwt;
  /** @type {import('../../graphql/types').UsersPermissionsMe}*/
  @Getter user;
  @Mutation setLoading;
  /**
   * @type {import("../../graphql/types").Tag[]}
   */
  @Prop(Array) planTags;
  /**
   * @type {boolean}
   */
  dialog = false;
  /**
   * @type {string[]}
   */
  selectedTags = [];
  /**
   * @type {string}
   */
  tagSearch = "";

  async mounted() {
    await this.fetchTags();
  }

  appendSelectedTags(name) {
    this.selectedTags.push(name);
    this.tagSearch = "";
  }

  closeDialog() {
    this.dialog = false;
    this.selectedTags = [];
    this.tagSearch = "";
  }

  async submitTags() {
    this.setLoading(true);
    if (this.tagSearch) {
      this.appendSelectedTags(this.tagSearch);
    }
    await this.tagSelectedPlan(this.selectedTags);
    this.closeDialog();
    this.setLoading(false);
  }

  /** @type {boolean} */
  get canUserAddTag() {
    return !!this.jwt && !!this.user && this.user.role.name === "Administrator";
  }

  /**
   * @type {string[]}
   */
  get optionalTags() {
    return this.tags
      .filter(
        t =>
          t.name.includes(this.tagSearch || "") &&
          this.planTags.every(tag => tag.id !== t.id) &&
          !this.selectedTags.includes(t.name)
      )
      .map(t => t.name);
  }
}
</script>
<style scoped>
.v-list {
  max-height: 200px;
  overflow-y: auto;
}
</style>
