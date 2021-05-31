<template>
  <v-container class="pa-md-12">
    <v-row wrap align-content-space-around>
      <v-col cols="12">
        <h1 class="display-1 font-weight-black primary--text" tabindex="0">
          חיפוש במערכת
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          :loading="loading"
          label="חיפוש"
          append-icon="mdi-magnify"
          @input="handleQueryChanged"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="grey--text" v-if="plansCountText">
          {{ plansCountText }}
        </p>
        <PlanCards :plans="plans" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="grey--text" v-if="commentsCountText">
          {{ commentsCountText }}
        </p>
        <v-card v-for="(comment, i) in comments" :key="i" class="my-3" flat>
          <v-card-text>
            <Comment :comment="comment" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { debounce, makeGqlRequest } from "../helpers/functions";
import { searchPlansAndComments } from "../helpers/queries";
import PlanCards from "../components/PlanCards.vue";
import Comment from "../components/Comment.vue";
@Component({
  components: { PlanCards, Comment }
})
export default class Search extends Vue {
  comments = [];
  commentsCountText = "";
  loading = false;
  /** @type {import('../../graphql/types').Plan[]} */
  plans = [];
  plansCountText = "";

  handlePlanClicked(plan) {
    this.$router.push(`/plan/${plan.id}`);
  }

  handleQueryChanged(value) {
    debounce(this.searchPlansAndComments.bind(this, value));
  }

  async searchPlansAndComments(text) {
    if (!text) {
      this.plans = [];
      this.comments = [];
      this.plansCountText = null;
      this.commentsCountText = null;
      return;
    }
    this.loading = true;
    const result = await makeGqlRequest(searchPlansAndComments, {
      text
    });
    this.comments = result.comments;
    this.plans = result.plans;
    const commentsCount = result.commentsConnection.aggregate.count;
    this.commentsCountText = commentsCount
      ? commentsCount + " התייחסויות נמצאו"
      : "לא נמצאו התייחסויות";
    const plansCount = result.plansConnection.aggregate.count;
    this.plansCountText = plansCount
      ? plansCount + " התייחסויות נמצאו"
      : "לא נמצאו תכניות";
    this.loading = false;
  }
}
</script>
