<template>
  <v-layout fill-height wrap>
    <v-row class="w-100" justify="center" justify-sm="start">
      <v-col cols="auto">
        <h1
          :class="{
            'headline font-weight-black primary--text mb-3':
              $vuetify.breakpoint.smAndDown,
            'font-weight-black primary--text mb-3': $vuetify.breakpoint.mdAndUp
          }"
          tabindex="0"
        >
          {{ user.firstName + " " + user.lastName }}
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center" justify-lg="start">
      <v-col cols="10" sm="auto">
        <div class="img-wrapper p-relative overflow-hidden">
          <img
            :src="userImageUrl"
            alt="user image placeholder"
            class="user-image object-fit"
          />
          <form>
            <label for="userImage" class="title d-block pa-3 cursor-pointer">
              <span
                class="v-icon notranslate mdi mdi-camera theme--light color-white ml-3"
              ></span>
              <span>עדכן תמונה</span>
            </label>
            <input
              @change="updateUserImage()"
              id="userImage"
              type="file"
              name="file"
              ref="file"
              class="screen-reader-input"
            />
            <input type="submit" class="screen-reader-input" />
          </form>
        </div>
      </v-col>

      <v-col cols="12" sm xl="5">
        <v-tabs
          grow
          show-arrows
          class="mb-3"
          v-model="tab"
          background-color="transparent"
        >
          <v-tab @click="authenticationFailed = false">פרטים</v-tab>
          <v-tab @click="authenticationFailed = false">עריכת פרטים</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="overflow-hidden pa-1 transparent">
          <v-tab-item>
            <div v-if="user.job.length">
              <span class="font-weight-bold ml-1">תפקיד:</span>
              <span>{{ user.job }}</span>
            </div>
            <div v-if="user.organization.length">
              <span class="font-weight-bold ml-1">שייכות לארגון:</span>
              <span>{{ user.organization }}</span>
            </div>
            <div v-if="user.city.length">
              <span class="font-weight-bold ml-1">עיר:</span>
              <span>{{ user.city }}</span>
            </div>
          </v-tab-item>
          <v-tab-item>
            <v-text-field
              label="תפקיד"
              v-model="userInfoData.job"
              name="job"
              class="pl-1"
            ></v-text-field>
            <v-text-field
              label="שייכות לארגון"
              v-model="userInfoData.organization"
              name="organization"
              class="pl-1"
            ></v-text-field>
            <v-text-field
              label="עיר"
              v-model="userInfoData.city"
              name="city"
              class="pl-1"
            ></v-text-field>
            <v-btn block large color="secondary" @click="updateInfo()"
              >עדכן</v-btn
            >
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-layout>
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

  editMode = false;
  userInfoData = {};
  tab = null;

  mounted() {
    this.userInfoData = {
      city: this.user.city,
      organization: this.user.organization,
      job: this.user.job
    };
  }

  async updateInfo() {
    await this.updateUserAction(this.userInfoData);
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
    if (this.user.userImage !== null) {
      return apiEndpoint + this.user.userImage.url;
    }
    return require("../assets/userImage.png");
  }
}
</script>

<style scoped>
.bg-transparent {
  background-color: transparent !important;
}
.box-shadow-none {
  box-shadow: none !important;
}
.bg-green {
  background-color: #71b790;
}
.cursor-pointer {
  cursor: pointer;
}
.screen-reader-input {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}
.w-100 {
  width: 100%;
}
.color-white {
  color: #ffffff;
}
.user-image {
  -o-object-fit: cover;
  object-fit: cover;
  max-width: 100%;
  height: auto;
}
.p-relative {
  position: relative;
}
.user-image + form {
  transition: transform 0.3s;
  position: absolute;
  color: #ffffff;
  width: 100%;
  bottom: 0;
  text-align: right;
  font-weight: 600;
  left: 0;
  right: 0;
  background-color: #71b790;
}
@media (min-width: 960px) {
  .img-wrapper:hover form {
    transform: translateY(0);
  }
  .user-image {
    display: block;
    width: 310px;
    height: 310px;
  }
  .user-image + form {
    transform: translateY(100%);
  }
}
</style>
