<template>
  <v-layout column>
    <v-flex xs1>
      <v-expand-transition>
        <v-card class="pa-1">
          <v-btn
            block
            large
            depressed
            :text="!isCreatingNewComment"
            @click="setCommentCreation(!isCreatingNewComment)"
          >
            <v-icon left>mdi-plus</v-icon>
            צור התייחסות חדשה
          </v-btn>
          <div v-if="isCreatingNewComment" class="ma-3"></div>
          <v-expand-transition>
            <NewComment
              v-if="isCreatingNewComment"
              @submit="setCommentCreation(false)"
            />
          </v-expand-transition>
        </v-card>
      </v-expand-transition>
    </v-flex>
    <v-flex my-2 v-if="rootComments.length">
      <v-card flat>
        <v-card-text>
          <v-row v-for="comment in rootComments" :key="comment.id" dense>
            <v-col cols="2" sm="1">
              <v-img
                aspect-ratio="1"
                :src="generateUrlFromComment(comment)"
                class="s-circle mx-auto"
                max-width="48"
              ></v-img>
            </v-col>
            <v-col cols="10">
              <h4 class="subtitle-1 font-weight-semibold primary--text">
                <span tabindex="0">{{ comment.title }}</span>
              </h4>
              <h5 class="subtitle-2 font-weight-light accent--text">
                <span tabindex="0">{{ getCommenter(comment) }}</span>
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
              <a href="javascript:void(0)" @click="toggleReply(comment.id)">
                הגב להתייחסות
              </a>
              <v-expand-transition>
                <NewComment
                  v-if="replyingTo == comment.id"
                  :parent="comment.id"
                  @submit="setCommentCreation(false)"
                />
              </v-expand-transition>
              <v-row
                v-for="child in comment.children"
                :key="child.id"
                my-2
                dense
              >
                <v-col cols="2" sm="1">
                  <v-img
                    aspect-ratio="1"
                    max-width="48"
                    :src="generateUrlFromComment(comment)"
                    class="s-circle mx-auto"
                  ></v-img>
                </v-col>
                <v-col cols="10">
                  <h4 class="subtitle-1 font-weight-semibold primary--text">
                    <span tabindex="0">{{ child.title }}</span>
                  </h4>
                  <h5 class="subtitle-2 font-weight-light accent--text">
                    <span tabindex="0">{{ getCommenter(child) }}</span>
                    <span> • </span>
                    <span tabindex="0">
                      {{ child.createdAt.toLocaleDateString("he") }}
                    </span>
                  </h5>
                  <p
                    tabindex="0"
                    class="body-1 whitespace-preline my-1"
                    v-html="child.content"
                  ></p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import NewComment from "./NewComment";
import { Getter, Action } from "vuex-class";
import { Getters, ActionTypes, apiEndpoint } from "../helpers/constants";

@Component({ components: { NewComment } })
export default class Comments extends Vue {
  /** @type {import("../../graphql/types").Plan} */
  @Getter(Getters.SELECTED_PLAN) plan;
  @Action(ActionTypes.FETCH_PLAN) fetchPlan;
  isCreatingNewComment = false;
  replyingTo = "";

  /**
   * Gets executed when the comment creation button is clicked
   * @param {boolean} value Desired comment creation state
   */
  setCommentCreation(value) {
    this.replyingTo = "";
    this.isCreatingNewComment = value;
  }

  /**
   * Generates url for a comment's user image
   * @param {import("../../graphql/types").Comment} comment
   * @returns {string} url
   */
  generateUrlFromComment(comment) {
    return comment.user && comment.user.userImage
      ? apiEndpoint + comment.user.userImage.url
      : "/img/userImage.svg";
  }

  toggleReply(commentId) {
    this.isCreatingNewComment = false;
    this.replyingTo = this.replyingTo == commentId ? "" : commentId;
  }

  /**
   * Gets the commenter of a given comment
   * @param {import("../../graphql/types").Comment} comment The comment object
   * @returns {string} name of the commenter
   */
  getCommenter(comment) {
    return comment.user
      ? `${comment.user.firstName} ${comment.user.lastName}`
      : comment.name;
  }

  get rootComments() {
    return this.plan.comments.filter(comment => comment.parent == null);
  }
}
</script>
