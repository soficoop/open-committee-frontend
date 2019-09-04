<template>
  <v-container class="pa-md-12" fill-height v-if="user">
    <v-row justify="center">
      <v-col cols="12" lg="auto" align-self="center">
        <v-card flat class="pa-4">
          <v-row class="w-100" justify="center" justify-sm="start">
            <v-col cols="auto" class="py-0">
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
          </v-row>
          <v-row justify="center" justify-lg="start">
            <v-col cols="10" sm="auto">
              <v-card flat class="img-wrapper p-relative overflow-hidden">
                <img
                  :src="userImageUrl"
                  alt="user image placeholder"
                  class="user-image object-fit"
                />
                <form>
                  <label
                    for="userImage"
                    class="title d-block pa-3 cursor-pointer"
                  >
                    <v-icon color="white" right>mdi-camera</v-icon>
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
              </v-card>
            </v-col>

            <v-col cols="12" lg="auto">
              <div v-if="user.job">
                <span class="font-weight-bold ml-1">תפקיד:</span>
                <span>{{ user.job }}</span>
              </div>
              <div v-if="user.organization">
                <span class="font-weight-bold ml-1">שייכות לארגון:</span>
                <span>{{ user.organization }}</span>
              </div>
              <div v-if="user.city">
                <span class="font-weight-bold ml-1">עיר:</span>
                <span>{{ user.city }}</span>
              </div>
            </v-col>
            <v-col lg="auto">
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
                    <v-btn color="blue darken-1" text @click="dialog = false"
                      >סגירה</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="updateInfo()"
                      >שמירה</v-btn
                    >
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
    if (this.user.userImage != null) {
      return apiEndpoint + this.user.userImage.url;
    }
    return "/img/userImage.svg";
  }
}
</script>

<style scoped>
.box-shadow-none {
  box-shadow: none !important;
}
.w-100 {
  width: 100%;
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
