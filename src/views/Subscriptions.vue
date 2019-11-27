<template>
  <v-container pa-md-12 pa-5>
    <v-row class="mb-5">
      <v-col>
        <h1 class="display-1 font-weight-black primary--text" tabindex="0">
          ההתראות שלי
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs background-color="transparent" v-model="currentTab">
          <v-tab class="title" tabindex="0">לפי ועדה</v-tab>
          <v-tab class="title" tabindex="0">לפי מיקום</v-tab>
          <v-tab class="title" tabindex="0" disabled>לפי נושא (בקרוב)</v-tab>
          <v-tabs-items v-model="currentTab" class="transparent">
            <v-tab-item>
              <CommitteeSubscription />
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col>
                  <h4 class="title primary--text" tabindex="0">
                    התראות לפי מיקום זמינות במערכת "מעירים".
                  </h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <a
                    href="https://meirim.org"
                    target="blank"
                    class="secondary--text"
                  >
                    למעבר לאתר מעירים
                  </a>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import CommitteeSubscription from "../components/CommitteeSubscription.vue";

@Component({ components: { CommitteeSubscription } })
export default class Subscriptions extends Vue {
  currentTab = 0;
}
</script>
