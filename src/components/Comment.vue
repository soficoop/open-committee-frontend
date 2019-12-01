<template>
  <v-row dense class="my-2">
    <v-col cols="2" sm="1" class="text-center">
      <v-img
        aspect-ratio="1"
        :src="imageUrl"
        class="b-radius-50 mx-auto"
        max-width="50"
      ></v-img>
    </v-col>
    <v-col>
      <h4 class="subtitle-1 font-weight-semibold primary--text">
        <span tabindex="0">{{ comment.title }}</span>
      </h4>
      <h5
        class="subtitle-2 secondary--text"
        :class="[isCommenterAdmin ? 'font-weight-bold' : 'font-weight-light']"
      >
        <v-icon color="secondary" v-if="isCommenterAdmin" small class="me-1">
          mdi-shield-check
        </v-icon>
        <span class="me-1" tabindex="0"> {{ commenter }} • </span>
        <span class="me-1" v-if="comment.user && comment.user.job">
          {{ comment.user.job }} •
        </span>
        <span class="me-1" v-if="comment.user && comment.user.organization">
          {{ comment.user.organization }} •
        </span>
        <span tabindex="0">
          {{ comment.createdAt.toLocaleDateString("he") }}
        </span>
      </h5>
      <p tabindex="0" class="body-1 whitespace-preline my-1">
        {{ comment.visibleContent }}
      </p>
      <v-row v-if="comment.files && comment.files.length">
        <v-col>
          <h5
            class="subtitle-2 font-weight-semibold primary--text"
            tabindex="0"
          >
            קבצים מצורפים
          </h5>
          <a
            class="me-2"
            target="blank"
            v-for="(file, i) in comment.files"
            :key="i"
            :href="generateUrlFromFile(file)"
          >
            {{ shortenFilename(file.name) }}
          </a>
        </v-col>
      </v-row>
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
        <v-col cols="auto" v-if="isReplyAllowed">
          <a
            href="javascript:void(0)"
            @click="isReplying = !isReplying"
            class="grey--text"
          >
            הגב להתייחסות
          </a>
        </v-col>
        <v-col cols="auto" v-if="isUserAdmin && isPinAllowed">
          <a
            href="javascript:void(0)"
            @click="pinComment(comment)"
            class="grey--text"
          >
            {{ comment.isPinned ? "בטל נעיצה" : "נעץ" }}
          </a>
        </v-col>
        <v-col cols="auto" v-if="isUserAdmin || isUserCommentOwner">
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
        <div v-if="isReplying">
          <NewComment
            :parent="comment.id"
            @submit="handleCommentSubmitted"
            class="ma-n3"
          />
        </div>
      </v-expand-transition>
    </v-col>
  </v-row>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import NewComment from "./NewComment";
import { Getter } from "vuex-class";
import { Getters, filesEndpoint } from "../helpers/constants";
import { Prop } from "vue-property-decorator";

@Component({ components: { NewComment } })
export default class Comment extends Vue {
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter(Getters.USER) currentUser;
  isReplying = false;
  /** @type {import("../helpers/typings").CommentModel} */
  @Prop(Object) comment;
  @Prop(Boolean) isUserAdmin;
  @Prop(Boolean) isCommenterAdmin;
  @Prop(Boolean) isReplyAllowed;
  @Prop(Boolean) isPinAllowed;

  /**
   * Handles submit event of NewComment component
   */
  async handleCommentSubmitted() {
    this.$emit("newCommentSubmit");
    this.isReplying = !this.isReplying;
  }

  async removeComment() {
    this.$emit("remove");
  }

  async pinComment() {
    this.$emit("pin");
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
   * Computes url for the user image
   * @returns {string} url
   */
  get imageUrl() {
    return this.comment.user && this.comment.user.userImage
      ? filesEndpoint + this.comment.user.userImage.url
      : "/img/userImage.svg";
  }

  /**
   * Computes the commenter
   * @returns {string} name of the commenter
   */
  get commenter() {
    return this.comment.user
      ? `${this.comment.user.firstName} ${this.comment.user.lastName}`
      : this.comment.name;
  }

  /**
   * Computes whether the current user is the one who made the comment
   * @reutns {boolean}
   */
  get isUserCommentOwner() {
    return (
      !!this.currentUser &&
      !!this.comment.user &&
      this.comment.user.id == this.currentUser.id
    );
  }

  generateUrlFromFile(file) {
    return filesEndpoint + file.url;
  }

  /**
   * Shortens long file names (i.e. "a-very-long-file-name.pdf" -> "a-very-lon...pdf")
   * @param {string} filename
   */
  shortenFilename(filename) {
    if (filename.length < 15) {
      return filename;
    }
    return `${filename.slice(0, 11)}...${filename.slice(
      filename.length - 3,
      filename.length
    )}`;
  }
}
</script>
