<template>
  <v-layout column>
    <v-flex xs1>
      <v-expand-transition>
        <v-card>
          <v-btn
            block
            large
            depressed
            :color="`secondary ${isCreatingNewComment && 'darken-1'}`"
            @click="setCommentCreation(!isCreatingNewComment)"
          >
            <v-icon left>mdi-plus</v-icon>
            צור התייחסות חדשה
          </v-btn>
          <div v-if="isCreatingNewComment" class="pa-1"></div>
          <v-expand-transition>
            <NewComment
              class="px-1"
              v-if="isCreatingNewComment"
              @submit="handleCommentSubmitted"
            />
          </v-expand-transition>
          <div v-if="isCreatingNewComment" class="pa-1"></div>
        </v-card>
      </v-expand-transition>
    </v-flex>
    <v-flex my-2 v-if="rootComments.length">
      <v-card flat>
        <v-card-text>
          <div v-for="comment in rootComments" :key="comment.id">
            <v-row dense class="my-2">
              <v-col cols="2" sm="1">
                <v-img
                  aspect-ratio="1"
                  :src="generateImageUrlFromComment(comment)"
                  class="b-radius-50 mx-auto"
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
                <p tabindex="0" class="body-1 whitespace-preline my-1">
                  {{ comment.visibleContent }}
                </p>
                <a
                  href="javascript:void(0)"
                  class="me-2"
                  @click="showFullComment(comment)"
                  v-if="!comment.isFullContentVisible"
                >
                  קרא עוד
                </a>
                <a href="javascript:void(0)" @click="toggleReply(comment.id)">
                  הגב להתייחסות
                </a>
                <v-expand-transition>
                  <NewComment
                    v-if="replyingTo == comment.id"
                    :parent="comment.id"
                    @submit="handleCommentSubmitted"
                  />
                </v-expand-transition>
              </v-col>
            </v-row>
            <v-row v-for="child in comment.children" :key="child.id" my-2 dense>
              <v-col cols="2" sm="1"></v-col>
              <v-col cols="2" sm="1">
                <v-img
                  aspect-ratio="1"
                  max-width="48"
                  :src="generateImageUrlFromComment(child)"
                  class="b-radius-50 mx-auto"
                ></v-img>
              </v-col>
              <v-col cols="8">
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
                <p tabindex="0" class="body-1 whitespace-preline my-1">
                  {{ child.visibleContent }}
                </p>
                <a
                  href="javascript:void(0)"
                  @click="showFullComment(child)"
                  v-if="!child.isFullContentVisible"
                >
                  קרא עוד
                </a>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import NewComment from "./NewComment";
import { Getter } from "vuex-class";
import { Getters, apiEndpoint } from "../helpers/constants";
import { getCommentsByPlan } from "../helpers/queries";
import { makeGqlRequest } from "../helpers/functions";

@Component({ components: { NewComment } })
export default class Comments extends Vue {
  /** @type {import("../../graphql/types").Plan} */
  @Getter(Getters.SELECTED_PLAN) plan;
  /** @type {import("../../graphql/types").Comment[]} */
  comments = [];
  isCreatingNewComment = false;
  replyingTo = "";

  created() {
    this.fetchComments();
  }

  /**
   * Fetches comments for the selected plan
   */
  async fetchComments() {
    const { comments } = await makeGqlRequest(getCommentsByPlan(this.plan.id));
    this.comments = this.mapApiComments(comments);
  }

  /**
   * Handles submit event of NewComment component
   */
  async handleCommentSubmitted() {
    await this.fetchComments();
    this.setCommentCreation(false);
  }

  /**
   * Maps fetched comments to CommentModel array
   * @param {import("../../graphql/types").Comment[]} comments Fetched comments
   * @returns {import("../helpers/typings").CommentModel[]}
   */
  mapApiComments(comments) {
    return (
      comments &&
      comments.map(c => {
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
          children: this.mapApiComments(c.children)
        };
      })
    );
  }

  /**
   * Gets executed when the comment creation button is clicked
   * @param {boolean} value Desired comment creation state
   */
  setCommentCreation(value) {
    this.replyingTo = "";
    this.isCreatingNewComment = value;
  }

  /**
   * Displays full comment content
   * @param {import("../helpers/typings").CommentModel} comment
   */
  showFullComment(comment) {
    comment.isFullContentVisible = true;
    comment.visibleContent = comment.content;
  }

  /**
   * Generates url for a comment's user image
   * @param {import("../../graphql/types").Comment} comment
   * @returns {string} url
   */
  generateImageUrlFromComment(comment) {
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
    return this.comments.filter(comment => comment.parent == null);
  }
}
</script>
