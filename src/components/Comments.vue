<template>
  <div>
    <v-row>
      <v-col>
        <v-expand-transition>
          <v-card>
            <v-btn
              :disabled="commentsAreLocked"
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
      </v-col>
    </v-row>

    <v-row v-if="rootComments.length">
      <v-col>
        <v-card
          v-for="comment in rootComments"
          :outlined="comment.isPinned"
          flat
          :key="comment.id"
          class="comment border my-2 pa-3"
        >
          <v-tooltip bottom v-if="comment.isPinned">
            <template v-slot:activator="{ on }">
              <v-icon class="p-absolute l-1 t-2" v-on="on">mdi-pin</v-icon>
            </template>
            <span>ההתייחסות נעוצה</span>
          </v-tooltip>

          <v-card-text>
            <div>
              <v-row dense class="my-2">
                <v-col cols="2" sm="1" class="text-center">
                  <v-img
                    aspect-ratio="1"
                    :src="generateImageUrlFromComment(comment)"
                    class="b-radius-50 mx-auto"
                    max-width="50"
                  >
                  </v-img>
                </v-col>
                <v-col>
                  <div class="pa-4">
                    <h4 class="subtitle-1 font-weight-semibold primary--text">
                      <span tabindex="0">{{ comment.title }}</span>
                    </h4>
                    <h5
                      class="subtitle-2 secondary--text d-flex align-center"
                      :class="[
                        isCommentsAdmin(comment)
                          ? 'font-weight-bold'
                          : 'font-weight-light'
                      ]"
                    >
                      <v-icon
                        color="secondary"
                        v-if="isCommentsAdmin(comment)"
                        small
                        class="ml-1"
                        >mdi-shield-check
                      </v-icon>
                      <span class="ml-1" tabindex="0"
                        >{{ getCommenter(comment) }} •
                      </span>
                      <span
                        class="ml-1"
                        v-if="isCommentsAdmin(comment) && comment.user.job"
                        >{{ comment.user.job }} •
                      </span>
                      <span tabindex="0">
                        {{ comment.createdAt.toLocaleDateString("he") }}
                      </span>
                    </h5>
                    <p tabindex="0" class="body-1 whitespace-preline my-1">
                      {{ comment.visibleContent }}
                    </p>
                    <v-row>
                      <v-col cols="auto" v-if="!comment.isFullContentVisible">
                        <a
                          href="javascript:void(0)"
                          class="me-2"
                          @click="showFullComment(comment)"
                        >
                          קרא עוד
                        </a>
                      </v-col>
                      <v-col cols="auto" v-if="!commentsAreLocked">
                        <a
                          href="javascript:void(0)"
                          @click="toggleReply(comment.id)"
                          class="comment-action grey--text"
                        >
                          הגב להתייחסות
                        </a>
                      </v-col>
                      <v-col cols="auto" v-if="currentUserIsCommentsAdmin">
                        <a
                          href="javascript:void(0)"
                          @click="pinComment(comment)"
                          class="grey--text"
                        >
                          {{ comment.isPinned ? "בטל נעיצה" : "נעץ" }}
                        </a>
                      </v-col>
                      <v-col cols="auto" v-if="currentUserIsCommentsAdmin">
                        <a
                          href="javascript:void(0)"
                          @click="removeComment(comment)"
                          class="grey--text"
                        >
                          מחק
                        </a>
                      </v-col>
                    </v-row>

                    <v-expand-transition>
                      <NewComment
                        v-if="replyingTo == comment.id"
                        :parent="comment.id"
                        @submit="handleCommentSubmitted"
                      />
                    </v-expand-transition>
                  </div>
                </v-col>
              </v-row>
              <v-row
                v-for="child in childComments(comment)"
                :key="child.id"
                class="comment my-2"
                dense
              >
                <v-col cols="2" sm="1"></v-col>
                <v-col cols="2" sm="1" class="text-center">
                  <v-img
                    aspect-ratio="1"
                    max-width="50"
                    :src="generateImageUrlFromComment(child)"
                    class="b-radius-50 mx-auto"
                  ></v-img>
                </v-col>
                <v-col>
                  <div class="pa-4">
                    <h4 class="subtitle-1 font-weight-semibold primary--text">
                      <span tabindex="0">{{ child.title }}</span>
                    </h4>
                    <h5
                      class="subtitle-2 secondary--text d-flex align-center"
                      :class="[
                        isCommentsAdmin(child)
                          ? 'font-weight-bold'
                          : 'font-weight-light'
                      ]"
                    >
                      <v-icon
                        color="secondary"
                        v-if="isCommentsAdmin(child)"
                        small
                        class="ml-1"
                        >mdi-shield-check
                      </v-icon>
                      <span class="ml-1" tabindex="0"
                        >{{ getCommenter(child) }} •
                      </span>
                      <span
                        class="ml-1"
                        v-if="isCommentsAdmin(child) && child.user.job"
                        >{{ child.user.job }} •
                      </span>
                      <span tabindex="0">
                        {{ child.createdAt.toLocaleDateString("he") }}
                      </span>
                    </h5>
                    <p tabindex="0" class="body-1 whitespace-preline my-1">
                      {{ child.visibleContent }}
                    </p>
                    <v-row
                      v-if="
                        !child.isFullContentVisible ||
                          currentUserIsCommentsAdmin
                      "
                    >
                      <v-col cols="auto" v-if="!child.isFullContentVisible">
                        <a
                          href="javascript:void(0)"
                          @click="showFullComment(child)"
                          class="grey--text"
                        >
                          קרא עוד
                        </a>
                      </v-col>
                      <v-col cols="auto" v-if="currentUserIsCommentsAdmin">
                        <a
                          href="javascript:void(0)"
                          @click="removeComment(child)"
                          class="grey--text"
                        >
                          מחק
                        </a>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay v-model="loader" z-index="9999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import NewComment from "./NewComment";
import { Getter } from "vuex-class";
import { Getters, apiEndpoint } from "../helpers/constants";
import { getCommentsByPlan } from "../helpers/queries";
import { updateComment } from "../helpers/mutations";
import { makeGqlRequest } from "../helpers/functions";
import { Prop } from "vue-property-decorator";

@Component({ components: { NewComment } })
export default class Comments extends Vue {
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter(Getters.USER) currentUser;
  @Getter(Getters.JWT) jwt;
  /** @type {import("../../graphql/types").Plan} */
  @Getter(Getters.SELECTED_PLAN) plan;
  /** @type {import("../../graphql/types").Comment[]} */
  comments = [];
  isCreatingNewComment = false;
  replyingTo = "";
  loader = false;

  @Prop(Array) privilegedUsers;
  @Prop(Boolean) commentsAreLocked;
  @Prop(Boolean) currentUserIsCommentsAdmin;

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

  async removeComment(comment) {
    this.loader = true;
    const res = await makeGqlRequest(
      updateComment,
      {
        id: comment.id,
        isHidden: true
      },
      this.jwt
    );
    comment.isHidden = !!res;
    this.loader = !res;
  }

  async pinComment(comment) {
    this.loader = true;
    const res = await makeGqlRequest(
      updateComment,
      {
        id: comment.id,
        isPinned: !comment.isPinned
      },
      this.jwt
    );
    comment.isPinned = !comment.isPinned;
    this.loader = !res;
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
    return this.comments.filter(
      comment => comment.parent == null && !comment.isHidden
    );
  }

  childComments(parentComment) {
    return parentComment.children.filter(
      childComment => !childComment.isHidden
    );
  }

  isCommentsAdmin(comment) {
    return !!comment.user && this.privilegedUsers.includes(comment.user.id);
  }
}
</script>
