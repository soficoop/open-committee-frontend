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
              @click="isCreatingNewComment = !isCreatingNewComment"
            >
              <v-icon left>mdi-plus</v-icon>צור התייחסות חדשה
            </v-btn>
            <v-expand-transition>
              <div v-if="isCreatingNewComment">
                <NewComment @submit="handleCommentSubmitted" />
              </div>
            </v-expand-transition>
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
          class="my-2 pa-3"
        >
          <v-tooltip bottom v-if="comment.isPinned">
            <template v-slot:activator="{ on }">
              <v-icon class="p-absolute l-1 t-2" v-on="on">mdi-pin</v-icon>
            </template>
            <span>ההתייחסות נעוצה</span>
          </v-tooltip>

          <v-card-text>
            <Comment
              :comment="comment"
              :isCommenterAdmin="isCommenterAdmin(comment)"
              :isUserAdmin="isCurrentUserCommentsAdmin"
              :isReplyAllowed="!commentsAreLocked"
              @newCommentSubmit="handleCommentSubmitted"
              @remove="removeComment(comment)"
              @pin="pinComment(comment)"
              isPinAllowed
            />
            <v-row
              v-for="child in comment.children"
              :key="child.id"
              class="my-2"
              dense
            >
              <v-col cols="2" sm="1"></v-col>
              <v-col>
                <Comment
                  :comment="child"
                  :isCommenterAdmin="isCommenterAdmin(child)"
                  :isUserAdmin="isCurrentUserCommentsAdmin"
                  :isReplyAllowed="false"
                  :isPinAllowed="false"
                  @remove="removeComment(child)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import NewComment from "./NewComment";
import Comment from "./Comment";
import { Getter, Mutation } from "vuex-class";
import { getCommentsByPlan } from "../helpers/queries";
import { updateComment, hideMyComment } from "../helpers/mutations";
import { makeGqlRequest, mapApiComments } from "../helpers/functions";
import { Prop, Watch } from "vue-property-decorator";

@Component({ components: { NewComment, Comment } })
export default class Comments extends Vue {
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter jwt;
  /** @type {import("../../graphql/types").Plan} */
  @Getter selectedPlan;
  @Mutation setLoading;
  /** @type {import("../../graphql/types").Comment[]} */
  comments = [];
  isCreatingNewComment = true;

  @Prop(Array) privilegedUsers;
  @Prop(Boolean) commentsAreLocked;
  @Prop(Boolean) isCurrentUserCommentsAdmin;

  @Watch("commentsAreLocked")
  onCommentsLockedChanged(value) {
    if (value) {
      this.isCreatingNewComment = false;
    }
  }

  @Watch("selectedPlan")
  onSelectedPlanChanged() {
    this.fetchComments();
  }

  created() {
    if (this.commentsAreLocked) {
      this.isCreatingNewComment = false;
    }
  }

  /**
   * Fetches comments for the selected plan
   */
  async fetchComments() {
    const { comments } = await makeGqlRequest(
      getCommentsByPlan(this.selectedPlan.id),
      undefined,
      this.jwt
    );
    this.comments = mapApiComments(comments);
  }

  /**
   * Handles submit event of NewComment component
   */
  async handleCommentSubmitted() {
    await this.fetchComments();
    this.isCreatingNewComment = false;
  }

  /**
   * Removes (i.e. sets "isHidden: true") a given comment
   * @param {import("../helpers/typings").CommentModel} comment comment to pin
   */
  async removeComment(comment) {
    this.setLoading(true);
    let query;
    let variables = { id: comment.id };
    if (this.isCurrentUserCommentsAdmin) {
      query = updateComment;
      variables.isHidden = true;
    } else {
      query = hideMyComment;
    }
    const res = await makeGqlRequest(query, variables, this.jwt);
    await this.fetchComments();
    this.setLoading(!res);
  }

  /**
   * Pins a given comment
   * @param {import("../helpers/typings").CommentModel} comment comment to pin
   */
  async pinComment(comment) {
    this.setLoading(true);
    const res = await makeGqlRequest(
      updateComment,
      {
        id: comment.id,
        isPinned: !comment.isPinned
      },
      this.jwt
    );
    comment.isPinned = !comment.isPinned;
    this.setLoading(!res);
  }

  /**
   * @returns {import("../helpers/typings").CommentModel[]} comments without a parent
   */
  get rootComments() {
    return this.comments.filter(comment => comment.parent == null);
  }

  /**
   * @param {import("../helpers/typings").CommentModel} comment a given comment
   * @returns true if the commenter of the given comment is a relevant admin, or false otherwise
   */
  isCommenterAdmin(comment) {
    return !!comment.user && this.privilegedUsers.includes(comment.user.id);
  }
}
</script>
