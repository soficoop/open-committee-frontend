<template>
  <v-layout column>
    <v-flex xs1>
      <v-card class="pa-1">
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
                <v-text-field outlined hide-details label="נושא"></v-text-field>
              </v-flex>
              <v-flex xs12 md6 pa-1>
                <v-text-field outlined hide-details label="שם"></v-text-field>
              </v-flex>
              <v-flex pa-1>
                <v-textarea
                  outlined
                  hide-details
                  label="תוכן ההתייחסות"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 pa-1>
                <v-btn block color="primary">
                  שליחה
                  <v-icon class="mdi-flip-h" right>mdi-send</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-expand-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class Comments extends Vue {
  content = "";
  isCreatingNewComment = false;
  isSubmitting = false;
  name = "";
  title = "";
  toggleCommentCreation() {
    this.isCreatingNewComment = !this.isCreatingNewComment;
  }
  submitComment() {
    this.isSubmitting = true;
  }
}
</script>
