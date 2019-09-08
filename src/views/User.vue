<template>
  <v-container class="pa-md-12">
    <v-row class="justify-center justify-sm-start">
      <v-col cols="auto" sm="12" class="py-0">
        <h1
          :class="{
            'headline font-weight-black primary--text mb-3 d-inline':
              $vuetify.breakpoint.smAndDown,
            'font-weight-black primary--text mb-3 d-inline':
              $vuetify.breakpoint.mdAndUp
          }"
          tabindex="0"
        >
          {{ user.firstName + " " + user.lastName }}
        </h1>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-card flat class="pa-4">
          <v-row justify="center">
            <v-col cols="auto" sm="auto">
              <v-hover v-slot:default="{ hover }">
                <div class="img-wrapper b-radius-50 overflow-hidden p-relative">
                  <v-img
                    :src="userImageUrl"
                    alt="user image placeholder"
                    class="d-block user-image"
                  />
                  <v-expand-transition>
                    <v-btn
                      v-if="hover"
                      class="form--reveal text-center w-100 secondary"
                      height="25%"
                      @click="triggerImageInput"
                      absolute
                    >
                      <v-row justify="center" align="center" no-gutters>
                        <v-col cols="auto px-1">
                          <v-icon color="background">mdi-camera</v-icon>
                        </v-col>
                        <v-col cols="auto px-1">
                          <span
                            v-if="hasImage"
                            class="p-0 background--text title"
                            >עדכון
                          </span>
                          <span v-else class="p-0 background--text title"
                            >העלאה
                          </span>
                        </v-col>
                      </v-row>

                      <input
                        @change="updateUserImage()"
                        id="userImage"
                        type="file"
                        name="file"
                        ref="file"
                        class="screen-reader-input"
                        accept="image/jpeg, image/png"
                      />
                    </v-btn>
                  </v-expand-transition>
                  <v-expand-transition v-if="hasImage">
                    <v-btn
                      v-if="hover"
                      block
                      class="delete-btn--reveal error"
                      absolute
                      height="25%"
                      @click="removeUserImage"
                    >
                      <v-row justify="center" align="center" no-gutters>
                        <v-col cols="auto px-1">
                          <v-icon color="background">mdi-delete</v-icon>
                        </v-col>
                        <v-col cols="auto px-1">
                          <span class="p-0 background--text title">הסרה</span>
                        </v-col>
                      </v-row>
                    </v-btn>
                  </v-expand-transition>
                </div>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-card flat class="pa-4 h-100">
          <v-row justify="space-between">
            <v-col cols="auto">
              <div v-if="user.job" class="mb-1">
                <span class="body-1 font-weight-bold ml-1">תפקיד:</span>
                <span class="body-1">{{ user.job }}</span>
              </div>
              <div v-if="user.organization" class="mb-1">
                <span class="body-1 font-weight-bold ml-1">שייכות לארגון:</span>
                <span class="body-1">{{ user.organization }}</span>
              </div>
              <div v-if="user.city" class="mb-1">
                <span class="body-1 font-weight-bold ml-1">עיר:</span>
                <span class="body-1">{{ user.city }}</span>
              </div>
            </v-col>
            <v-col cols="auto">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn text color="primary" dark v-on="on" icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">עריכת פרטים</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="שם פרטי"
                            v-model="userInfoData.firstName"
                            name="firstName"
                            class="pl-1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="שם משפחה"
                            v-model="userInfoData.lastName"
                            name="lastName"
                            class="pl-1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="תפקיד"
                            v-model="userInfoData.job"
                            name="job"
                            class="pl-1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="שייכות לארגון"
                            v-model="userInfoData.organization"
                            name="organization"
                            class="pl-1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="עיר"
                            v-model="userInfoData.city"
                            name="city"
                            class="pl-1"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="secondary darken-1"
                      text
                      @click="dialog = false"
                      >סגירה
                    </v-btn>
                    <v-btn
                      color="secondary darken-1"
                      text
                      @click="updateInfo()"
                    >
                      שמירה
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Component from "vue-class-component";
import Vue from "vue";
import { Getter, Action } from "vuex-class";
import { Getters, ActionTypes } from "../helpers/constants";
import { apiEndpoint } from "../helpers/constants";
import { uploadUserImage } from "../helpers/functions";

@Component()
export default class User extends Vue {
  /**
   * @type {import("../../graphql/types").UsersPermissionsUser}
   */
  @Getter(Getters.USER) user;
  @Getter(Getters.JWT) jwt;
  @Action(ActionTypes.UPDATE_USER) updateUserAction;

  userInfoData = {};
  tab = null;
  dialog = false;

  mounted() {
    this.userInfoData = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      city: this.user.city,
      organization: this.user.organization,
      job: this.user.job
    };
  }

  async updateInfo() {
    await this.updateUserAction(this.userInfoData);
    this.dialog = false;
  }

  async updateUserImage() {
    const uploadedFile = await uploadUserImage(
      this.$refs.file.files[0],
      this.jwt,
      this.user.id
    );

    await this.updateUserAction({
      userImage: uploadedFile.id
    });
  }

  get userImageUrl() {
    if (this.user.userImage != null) {
      return apiEndpoint + this.user.userImage.url;
    }
    return "/img/userImage.png";
  }

  triggerImageInput() {
    const inputEl = this.$refs.file;
    inputEl.click();
  }

  async removeUserImage() {
    await this.updateUserAction({ userImage: null });
  }

  get hasImage() {
    return this.user.userImage != null;
  }
}
</script>

<style scoped>
.delete-btn--reveal {
  top: 0;
}
.form--reveal {
  bottom: 0;
}
.user-image {
  width: 200px;
  height: 200px;
}
</style>
