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
          hide-details
        />
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
import { debounce, makeGqlRequest, mapApiComments } from "../helpers/functions";
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

  mounted() {
    this.searchPlansAndComments("");
  }

  async searchPlansAndComments(text) {
    this.loading = true;
    const result = await makeGqlRequest(searchPlansAndComments, {
      text
    });
    this.comments = mapApiComments(result.comments);
    this.plans = result.plans;
    if (!text) {
      this.plansCountText = "תכניות חדשות במערכת";
      this.commentsCountText = "התייחסויות חדשות במערכת";
    } else {
      const commentsCount = result.commentsConnection.aggregate.count;
      this.commentsCountText = commentsCount
        ? commentsCount + " התייחסויות נמצאו"
        : "לא נמצאו התייחסויות";
      const plansCount = result.plansConnection.aggregate.count;
      this.plansCountText = plansCount
        ? plansCount + " תכניות נמצאו"
        : "לא נמצאו תכניות";
    }
    this.loading = false;
  }
}
</script>
