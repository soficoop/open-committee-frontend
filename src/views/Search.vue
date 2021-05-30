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
        <AgendaCards :items="plans" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
import AgendaCards from "../components/AgendaCards.vue";
import Comment from "../components/Comment.vue";
@Component({
  components: { AgendaCards, Comment }
})
export default class Search extends Vue {
  comments = [];
  loading = false;
  /** @type {import('../../graphql/types').Plan[]} */
  plans = [];

  handlePlanClicked(plan) {
    this.$router.push(`/plan/${plan.id}`);
  }

  handleQueryChanged(value) {
    debounce(this.searchPlansAndComments.bind(this, value));
  }

  async searchPlansAndComments(text) {
    this.loading = true;
    const { comments, plans } = await makeGqlRequest(searchPlansAndComments, {
      text
    });
    this.plans = plans.map(plan => ({
      id: plan.id,
      headline: plan.type == "תוכנית" ? `תכנית מספר ${plan.number}` : plan.type,
      description: plan.name,
      bullets: [
        { key: "סטטוס", value: plan.status },
        {
          key: "עדכון אחרון",
          value:
            plan.lastUpdate instanceof Date &&
            plan.lastUpdate.toLocaleDateString("he")
        },
        { key: "מיקום", value: plan.location }
      ],
      click: this.handlePlanClicked.bind(this, plan)
    }));
    this.comments = comments.map(c => {
      let visibleContent = c.content;
      let isFullContentVisible = true;
      let words = c.content.split(" ");
      if (words.length > 50) {
        visibleContent = words.slice(0, 50).join(" ") + "...";
        isFullContentVisible = false;
      }
      return {
        ...c,
        isFullContentVisible,
        visibleContent,
        children: []
      };
    });
    this.loading = false;
  }
}
</script>
