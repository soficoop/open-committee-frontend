<template>
  <v-layout column>
    <v-flex xs1>
      <v-expand-transition>
        <v-card class="pa-1" v-if="!hasSubmitted">
          <v-btn
            block
            large
            depressed
            :text="!isCreatingNewComment"
            @click="toggleCommentCreation"
          >
            <v-icon left>mdi-plus</v-icon>
            צור התייחסות חדשה
          </v-btn>
          <v-expand-transition>
            <v-card-text v-if="isCreatingNewComment">
              <v-layout row wrap>
                <v-flex xs12 md6 pa-1>
                  <v-text-field
                    outlined
                    hide-details
                    label="נושא"
                    v-model="title"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6 pa-1>
                  <v-text-field
                    outlined
                    hide-details
                    label="שם"
                    v-model="name"
                  ></v-text-field>
                </v-flex>
                <v-flex pa-1>
                  <v-textarea
                    outlined
                    hide-details
                    label="תוכן ההתייחסות"
                    v-model="content"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 pa-1>
                  <v-btn
                    block
                    color="primary"
                    @click="submit"
                    :loading="isSubmitting"
                    :disabled="!canSubmit"
                  >
                    שליחה
                    <v-icon class="mdi-flip-h" right>mdi-send</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-expand-transition>
        </v-card>
      </v-expand-transition>
    </v-flex>
    <v-flex my-2 v-if="plan.comments.length">
      <v-card flat>
        <v-card-text>
          <v-flex
            v-for="comment in plan.comments"
            :key="comment.id"
            class="my-5"
          >
            <v-row>
              <v-col cols="1" class="text-center">
                <v-img
                  v-if="comment.user && comment.user.userImage"
                  width="48"
                  height="48"
                  :src="generateUrlFromComment(comment.user.userImage.url)"
                  class="s-circle"
                ></v-img>
                <v-icon v-else class="mdi-48px">mdi-account-circle</v-icon>
              </v-col>
              <v-col>
                <h4 class="subtitle-1 font-weight-semibold primary--text">
                  <span tabindex="0">{{ comment.title }}</span>
                </h4>
                <h5 class="subtitle-2 font-weight-light accent--text">
                  <span tabindex="0">{{ comment.name }}</span>
                  <span> • </span>
                  <span tabindex="0">
                    {{ comment.createdAt.toLocaleDateString("he") }}
                  </span>
                </h5>
                <p
                  tabindex="0"
                  class="body-1 whitespace-preline my-1"
                  v-html="comment.content"
                ></p>
                <a href="javascript:void(0)">
                  הגב להתייחסות
                </a>
              </v-col>
            </v-row>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { Getters, ActionTypes, apiEndpoint } from "../helpers/constants";
import { makeGqlRequest } from "../helpers/functions";
import { createComment } from "../helpers/mutations";

@Component
export default class Comments extends Vue {
  /** @type {import("../../graphql/types").Plan} */
  @Getter(Getters.SELECTED_PLAN) plan;
  @Action(ActionTypes.FETCH_PLAN) fetchPlan;
  content = "";
  isCreatingNewComment = false;
  isSubmitting = false;
  name = "";
  title = "";
  hasSubmitted = false;
  get canSubmit() {
    return this.name && this.title && this.content;
  }
  /**
   * Gets executed when the comment creation button is clicked
   */
  toggleCommentCreation() {
    this.isCreatingNewComment = !this.isCreatingNewComment;
  }
  /**
   * Submits a comment
   */
  async submit() {
    this.isSubmitting = true;
    await makeGqlRequest(createComment, {
      plan: this.plan.id,
      name: this.name,
      title: this.title,
      content: this.content
    });
    await this.fetchPlan(this.plan.id);
    this.hasSubmitted = true;
  }
  /**
   * Generates url for a comment's user image
   * @param {import("../../graphql/types").Comment} comment
   * @returns {string} url
   */
  generateUrlFromComment(comment) {
    return apiEndpoint + comment.user.userImage.url;
  }
}
</script>
