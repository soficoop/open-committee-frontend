<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          outlined
          hide-details
          label="נושא"
          v-model="title"
          @click="suggestLogin"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :disabled="this.user ? true : false"
          outlined
          hide-details
          label="שם"
          v-model="name"
          @click="suggestLogin"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea
          outlined
          hide-details
          maxlength="1000"
          label="תוכן ההתייחסות"
          v-model="content"
          @click="suggestLogin"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-file-input
          label="קבצים מצורפים"
          hide
          hide-details
          outlined
          rounded
          multiple
          v-model="files"
        >
          <template v-slot:selection="{ text, index }">
            <v-chip
              small
              label
              close
              color="primary"
              @click:close="files.splice(index, 1)"
            >
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Mutation } from "vuex-class";
import { makeGqlRequest, uploadFile } from "../helpers/functions";
import { createComment } from "../helpers/mutations";
import { Prop, Watch } from "vue-property-decorator";

@Component
export default class NewComment extends Vue {
  /** @type {import("../../graphql/types").Plan} */
  @Getter selectedPlan;
  /** @type {import("../../graphql/types").UsersPermissionsUser} */
  @Getter user;
  @Prop(String) parent;
  @Mutation setLoginDialog;
  content = "";
  isCreatingNewComment = false;
  isSubmitting = false;
  name = "";
  title = "";
  /** @type {File[]} */
  files = [];
  wasLoginSuggested = false;

  @Watch("user")
  onUserChanged() {
    this.setNameByUser();
  }

  created() {
    this.setNameByUser();
  }

  setNameByUser() {
    if (this.user) {
      this.name = `${this.user.firstName} ${this.user.lastName}`;
    }
  }

  get canSubmit() {
    return this.name != "" && this.title != "" && this.content != "";
  }

  /**
   * Submits a comment
   */
  async submit() {
    this.isSubmitting = true;
    const files = await this.uploadFiles();
    await makeGqlRequest(createComment, {
      plan: this.selectedPlan.id,
      name: this.name,
      title: this.title,
      content: this.content,
      user: this.user && this.user.id,
      parent: this.parent,
      isPinned: false,
      isHidden: false,
      files
    });
    this.$emit("submit");
    this.isSubmitting = false;
  }

  suggestLogin() {
    if (!this.user && !this.wasLoginSuggested) {
      this.setLoginDialog(true);
      this.wasLoginSuggested = true;
    }
  }

  async uploadFiles() {
    let files = [];
    for (const file of this.files) {
      files.push(await uploadFile(file));
    }
    return files.map(file => file.id);
  }
}
</script>
