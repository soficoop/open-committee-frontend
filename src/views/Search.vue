<template>
  <v-container class="pa-md-12">
    <v-row wrap align-content-space-around>
      <v-col cols="12">
        <h1 class="display-1 font-weight-black primary--text" tabindex="0">
          חיפוש במערכת
        </h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-combobox
          outlined
          :loading="loading"
          label="חיפוש"
          hide-no-data
          :append-icon="$vuetify.breakpoint.smAndDown ? 'mdi-magnify' : null"
          :search-input.sync="searchText"
          @keydown.enter="runSearch"
          @change="handleSuggestionClicked"
          :items="searchSuggestions"
          hide-details
        />
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
          x-large
          color="secondary"
          @click="runSearch"
          class="font-weight-semibold h-100"
        >
          חיפוש
        </v-btn>
      </v-col>
    </v-row>
    <div class="pa-5" />
    <v-row>
      <v-col>
        <p class="grey--text" v-if="plansCountText">
          {{ plansCountText }}
        </p>
        <PlanCards :plans="plans" />
      </v-col>
    </v-row>
    <v-row v-if="plansCount && plans.length !== plansCount">
      <v-col class="text-center">
        <v-btn text x-large @click="loadMore(1)" :loading="loading">
          עוד תכניות
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="commentsCountText">
      <v-col> <v-divider /> </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="grey--text" v-if="commentsCountText">
          {{ commentsCountText }}
        </p>
        <v-card
          v-for="(comment, i) in comments"
          :key="i"
          class="my-2"
          :to="comment.plan && `/plan/${comment.plan.id}`"
          hover
          rounded="lg"
        >
          <v-card-text>
            <Comment :comment="comment" :bold="searchText" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="commentsCount && comments.length !== commentsCount">
      <v-col class="text-center">
        <v-btn text x-large @click="loadMore(2)" :loading="loading">
          עוד התייחסויות
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { PlansOrComments } from "../helpers/enums";
import { debounce, makeGqlRequest, mapApiComments } from "../helpers/functions";
import {
  autocompletePlansAndComments,
  searchPlansAndComments
} from "../helpers/queries";
import PlanCards from "../components/PlanCards.vue";
import Comment from "../components/Comment.vue";
import { Watch } from "vue-property-decorator";
@Component({
  components: { PlanCards, Comment }
})
export default class Search extends Vue {
  comments = [];
  commentsCount = null;
  loading = false;
  /** @type {import('../../graphql/types').Plan[]} */
  plans = [];
  plansCount = null;
  searchMode = PlansOrComments.BOTH;
  searchSuggestions = [];
  searchText = "";

  async autocompletePlansAndComments() {
    if (!this.searchText) {
      return;
    }
    this.loading = true;
    const result = await makeGqlRequest(autocompletePlansAndComments, {
      text: this.searchText
    });
    this.searchSuggestions = [
      ...result.plans.map(plan => ({
        text: plan.name,
        value: plan.id
      })),
      ...result.comments.map(comment => ({
        text: comment.title,
        value: comment.plan.id
      }))
    ];
    this.loading = false;
  }

  async fetchPlansAndComments(mode, start) {
    const result = await makeGqlRequest(searchPlansAndComments(mode), {
      text: this.searchText,
      start
    });
    if (mode !== PlansOrComments.COMMENTS) {
      this.plans.push(...result.plans);
      this.plansCount = this.searchText
        ? result.plansConnection.aggregate.count
        : null;
    }
    if (mode !== PlansOrComments.PLANS) {
      this.comments.push(...mapApiComments(result.comments));
      this.commentsCount = this.searchText
        ? result.commentsConnection.aggregate.count
        : null;
    }
  }

  handleSuggestionClicked(suggestion) {
    if (suggestion.value) {
      this.$router.push(`/plan/${suggestion.value}`);
    }
  }

  @Watch("searchText")
  handleSearchTextChanged() {
    debounce(this.autocompletePlansAndComments.bind(this), 100);
  }

  async loadMore(mode) {
    this.loading = true;
    await this.fetchPlansAndComments(
      mode,
      mode === PlansOrComments.PLANS ? this.plans.length : this.comments.length
    );
    this.loading = false;
  }

  mounted() {
    this.runSearch();
  }

  async runSearch(mode = this.searchMode) {
    this.loading = true;
    this.plans = [];
    this.comments = [];
    await this.fetchPlansAndComments(mode);
    this.loading = false;
  }

  get commentsCountText() {
    if (this.commentsCount === null) {
      return "התייחסויות אחרונות במערכת";
    }
    if (this.commentsCount === 0) {
      return "לא נמצאו התייחסויות";
    }
    return this.commentsCount + "התייחסויות נמצאו";
  }

  get plansCountText() {
    if (this.plansCount === null) {
      return "תכניות אחרונות במערכת";
    }
    if (this.plansCount === 0) {
      return "לא נמצאו תכניות";
    }
    return this.plansCount + "תכניות נמצאו";
  }
}
</script>
