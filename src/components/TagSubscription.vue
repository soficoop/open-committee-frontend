<template>
  <div>
    <h2 class="headline primary--text font-weight-bold my-6" tabindex="0">
      לפי נושא
    </h2>
    <v-row>
      <v-col>
        <v-autocomplete
          :items="tagSuggestions"
          :menu-props="autocompleteMenuProps"
          @change="subscribeToTagBySearchString"
          @focus="handleInputFocused"
          class="scrollable"
          hide-details
          item-text="name"
          item-value="id"
          label="חיפוש"
          outlined
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mx-n1">
        <v-chip
          class="ma-1 body-1"
          v-for="tag in subscribedTags"
          :key="tag.id"
          close
          @click:close="unsubscribeFromTag(tag.id)"
        >
          {{ tag.name }}
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { delayScrollToFocusedElement } from "../helpers/functions";

@Component()
export default class TagSubscription extends Vue {
  @Action fetchTags;
  @Action fetchUserSubscriptions;
  @Action updateUser;
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter user;
  /** @type {string} */
  @Getter jwt;
  /** @type {import("../../graphql/types").Tag[]} */
  @Getter tags;
  subscribedTags = [];

  checkIfSubscribed(id) {
    return this.subscribedTags && this.subscribedTags.some(tag => tag.id == id);
  }

  handleInputFocused() {
    if (this.$vuetify.breakpoint.smAndDown) {
      delayScrollToFocusedElement();
    }
  }

  async mounted() {
    this.subscribedTags = this.user && this.user.subscribedTags;
    await this.fetchTags();
  }

  subscribeToTag(tag) {
    this.subscribedTags.push(tag);
    this.updateSubscriptions();
  }

  async subscribeToTagBySearchString(value) {
    const tag = this.tags.find(t => t.id === value);
    await this.subscribeToTag(tag);
  }

  async updateSubscriptions() {
    await this.updateUser({
      subscribedTags: this.subscribedTags.map(tag => tag.id)
    });
  }

  unsubscribeFromTag(id) {
    this.subscribedTags.splice(
      this.subscribedTags.findIndex(tag => tag.id == id),
      1
    );
    this.updateSubscriptions();
  }
  get autocompleteMenuProps() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return {
        bottom: true,
        offsetY: true,
        offsetOverflow: false,
        allowOverflow: true,
        openOnFocus: true
      };
    }
    return undefined;
  }
  /** @type {import("../../graphql/types").Tag[]} */
  get tagSuggestions() {
    return this.tags.filter(tag => !this.checkIfSubscribed(tag.id));
  }
}
</script>
