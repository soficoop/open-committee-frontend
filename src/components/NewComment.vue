<template>
  <v-layout wrap>
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
        :disabled="this.user ? true : false"
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
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { Getters, ActionTypes } from "../helpers/constants";
import { makeGqlRequest } from "../helpers/functions";
import { createComment } from "../helpers/mutations";
import { Prop } from "vue-property-decorator";

@Component
export default class NewComment extends Vue {
  /** @type {import("../../graphql/types").Plan} */
  @Getter(Getters.SELECTED_PLAN) plan;
  /** @type {import("../../graphql/types").UsersPermissionsUser} */
  @Getter(Getters.USER) user;
  @Action(ActionTypes.FETCH_PLAN) fetchPlan;
  @Prop(String) parent;
  content = "";
  isCreatingNewComment = false;
  isSubmitting = false;
  name = "";
  title = "";

  created() {
    if (this.user) {
      this.name = `${this.user.firstName} ${this.user.lastName}`;
    }
  }

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
      content: this.content,
      user: this.user && this.user.id,
      parent: this.parent
    });
    await this.fetchPlan(this.plan.id);
    this.$emit("submit");
    this.isSubmitting = false;
  }
}
</script>
