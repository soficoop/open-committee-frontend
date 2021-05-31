<template>
  <div>
    <v-fade-transition group leave-absolute>
      <v-row v-for="plan in plans" :key="plan.id" dense>
        <v-col>
          <v-card :to="'/plan/' + plan.id" hover>
            <v-card-subtitle
              tabindex="0"
              v-if="plan.lastUpdate && plan.lastUpdate.getTime() > 0"
              class="pb-0"
            >
              {{ plan.lastUpdate.toLocaleDateString("he") }}
            </v-card-subtitle>
            <v-card-title
              tabindex="0"
              class="py-0 font-weight-bold primary--text"
            >
              {{ plan.name }}
            </v-card-title>
            <v-card-text class="black--text body-1 py-1">
              <span v-if="plan.number">{{ plan.number }}</span>
              <span
                v-if="plan.number && isValidMunicipality(plan.municipality)"
              >
                &nbsp;•&nbsp;
              </span>
              <span v-if="isValidMunicipality(plan.municipality)">
                {{ plan.municipality }}
              </span>
            </v-card-text>
            <v-card-text class="pt-0">
              <v-chip
                class="mx-1 s-pointer-events-none"
                :key="tag.id"
                v-for="tag in plan.tags"
              >
                {{ tag.name }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
@Component({})
export default class PlanCards extends Vue {
  /** @type {import('../../graphql/types').Plan[]} */
  @Prop(Array) plans;

  handlePlanClicked(plan) {
    this.$router.push(`/plan/${plan.id}`);
  }

  isValidMunicipality(municipality) {
    return municipality && municipality !== "&nbsp;";
  }
}
</script>
