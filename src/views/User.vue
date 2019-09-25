<template>
  <v-container class="pa-md-12">
    <v-row class="justify-center justify-sm-start">
      <v-col cols="12" sm="6" md="4" xl="3">
        <v-card flat class="px-11 pt-11 pb-3">
          <v-row justify="space-between">
            <v-col class="">
              <v-row justify="center" class="mb-3">
                <v-col cols="auto" sm="auto" class="py-0">
                  <v-hover v-slot:default="{ hover }">
                    <div
                      class="img-wrapper b-radius-50 overflow-hidden p-relative"
                    >
                      <v-img
                        lazy-src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IiB4PSIwcHgiIHk9IjBweCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwogICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7CiAgICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM1OWRlZykKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNTlkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CiAgICAgICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuOwogICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgICAgICAgICB9CiAgICAgICAgXV0+PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJvdXRlciI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwwQzIyLjIwNTgsMCAyMy45OTM5LDEuNzg4MTMgMjMuOTkzOSwzLjk5MzlDMjMuOTkzOSw2LjE5OTY4IDIyLjIwNTgsNy45ODc4MSAyMCw3Ljk4NzgxQzE3Ljc5NDIsNy45ODc4MSAxNi4wMDYxLDYuMTk5NjggMTYuMDA2MSwzLjk5MzlDMTYuMDA2MSwxLjc4ODEzIDE3Ljc5NDIsMCAyMCwwWiIgc3R5bGU9ImZpbGw6YmxhY2s7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44NTc4Niw1Ljg1Nzg2QzcuNDE3NTgsNC4yOTgxNSA5Ljk0NjM4LDQuMjk4MTUgMTEuNTA2MSw1Ljg1Nzg2QzEzLjA2NTgsNy40MTc1OCAxMy4wNjU4LDkuOTQ2MzggMTEuNTA2MSwxMS41MDYxQzkuOTQ2MzgsMTMuMDY1OCA3LjQxNzU4LDEzLjA2NTggNS44NTc4NiwxMS41MDYxQzQuMjk4MTUsOS45NDYzOCA0LjI5ODE1LDcuNDE3NTggNS44NTc4Niw1Ljg1Nzg2WiIgc3R5bGU9ImZpbGw6cmdiKDIxMCwyMTAsMjEwKTsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzMi4wMTIyQzIyLjIwNTgsMzIuMDEyMiAyMy45OTM5LDMzLjgwMDMgMjMuOTkzOSwzNi4wMDYxQzIzLjk5MzksMzguMjExOSAyMi4yMDU4LDQwIDIwLDQwQzE3Ljc5NDIsNDAgMTYuMDA2MSwzOC4yMTE5IDE2LjAwNjEsMzYuMDA2MUMxNi4wMDYxLDMzLjgwMDMgMTcuNzk0MiwzMi4wMTIyIDIwLDMyLjAxMjJaIiBzdHlsZT0iZmlsbDpyZ2IoMTMwLDEzMCwxMzApOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksMjguNDkzOUMzMC4wNTM2LDI2LjkzNDIgMzIuNTgyNCwyNi45MzQyIDM0LjE0MjEsMjguNDkzOUMzNS43MDE5LDMwLjA1MzYgMzUuNzAxOSwzMi41ODI0IDM0LjE0MjEsMzQuMTQyMUMzMi41ODI0LDM1LjcwMTkgMzAuMDUzNiwzNS43MDE5IDI4LjQ5MzksMzQuMTQyMUMyNi45MzQyLDMyLjU4MjQgMjYuOTM0MiwzMC4wNTM2IDI4LjQ5MzksMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxMDEsMTAxLDEwMSk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMy45OTM5LDE2LjAwNjFDNi4xOTk2OCwxNi4wMDYxIDcuOTg3ODEsMTcuNzk0MiA3Ljk4NzgxLDIwQzcuOTg3ODEsMjIuMjA1OCA2LjE5OTY4LDIzLjk5MzkgMy45OTM5LDIzLjk5MzlDMS43ODgxMywyMy45OTM5IDAsMjIuMjA1OCAwLDIwQzAsMTcuNzk0MiAxLjc4ODEzLDE2LjAwNjEgMy45OTM5LDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoMTg3LDE4NywxODcpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTUuODU3ODYsMjguNDkzOUM3LjQxNzU4LDI2LjkzNDIgOS45NDYzOCwyNi45MzQyIDExLjUwNjEsMjguNDkzOUMxMy4wNjU4LDMwLjA1MzYgMTMuMDY1OCwzMi41ODI0IDExLjUwNjEsMzQuMTQyMUM5Ljk0NjM4LDM1LjcwMTkgNy40MTc1OCwzNS43MDE5IDUuODU3ODYsMzQuMTQyMUM0LjI5ODE1LDMyLjU4MjQgNC4yOTgxNSwzMC4wNTM2IDUuODU3ODYsMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxNjQsMTY0LDE2NCk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYuMDA2MSwxNi4wMDYxQzM4LjIxMTksMTYuMDA2MSA0MCwxNy43OTQyIDQwLDIwQzQwLDIyLjIwNTggMzguMjExOSwyMy45OTM5IDM2LjAwNjEsMjMuOTkzOUMzMy44MDAzLDIzLjk5MzkgMzIuMDEyMiwyMi4yMDU4IDMyLjAxMjIsMjBDMzIuMDEyMiwxNy43OTQyIDMzLjgwMDMsMTYuMDA2MSAzNi4wMDYxLDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoNzQsNzQsNzQpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksNS44NTc4NkMzMC4wNTM2LDQuMjk4MTUgMzIuNTgyNCw0LjI5ODE1IDM0LjE0MjEsNS44NTc4NkMzNS43MDE5LDcuNDE3NTggMzUuNzAxOSw5Ljk0NjM4IDM0LjE0MjEsMTEuNTA2MUMzMi41ODI0LDEzLjA2NTggMzAuMDUzNiwxMy4wNjU4IDI4LjQ5MzksMTEuNTA2MUMyNi45MzQyLDkuOTQ2MzggMjYuOTM0Miw3LjQxNzU4IDI4LjQ5MzksNS44NTc4NloiIHN0eWxlPSJmaWxsOnJnYig1MCw1MCw1MCk7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
                        :src="userImageUrl"
                        :alt="userImageAlt"
                        class="d-block user-image"
                      />
                      <v-expand-transition>
                        <v-btn
                          v-if="hover"
                          class="form--reveal text-center w-100 secondary"
                          height="50%"
                          @click="triggerImageInput"
                          absolute
                        >
                          <v-row justify="center" align="center" no-gutters>
                            <v-col cols="auto" class="px-1">
                              <v-icon color="background">mdi-camera</v-icon>
                            </v-col>
                            <v-col cols="auto" class="px-1">
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
                            @change="
                              removeUserImage();
                              updateUserImage();
                            "
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
                          height="50%"
                          @click="removeUserImage"
                        >
                          <v-row justify="center" align="center" no-gutters>
                            <v-col cols="auto px-1">
                              <v-icon color="background">mdi-delete</v-icon>
                            </v-col>
                            <v-col cols="auto px-1">
                              <span class="p-0 background--text title"
                                >הסרה</span
                              >
                            </v-col>
                          </v-row>
                        </v-btn>
                      </v-expand-transition>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 text-center">
                  <h1
                    class="headline primary--text font-weight-bold primary--text pb-6 s-border-bottom"
                    tabindex="0"
                  >
                    {{ user.firstName + " " + user.lastName }}
                  </h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="auto">
                  <v-card flat class="h-100">
                    <v-row>
                      <v-col cols="auto">
                        <div v-if="user.job" class="mb-4">
                          <h2 class="subtitle-1 primary--text">
                            תפקיד:
                          </h2>
                          <span class="title font-weight-medium">{{
                            user.job
                          }}</span>
                        </div>
                        <div v-if="user.organization" class="mb-4">
                          <h2 class="subtitle-1 primary--text">
                            שייכות לארגון:
                          </h2>
                          <span class="title font-weight-medium">{{
                            user.organization
                          }}</span>
                        </div>
                        <div v-if="user.city" class="mb-4">
                          <h2 class="subtitle-1 primary--text">
                            עיר:
                          </h2>
                          <span class="title font-weight-medium">{{
                            user.city
                          }}</span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  class="t-3 l-3"
                  color="primary"
                  dark
                  v-on="on"
                  icon
                  absolute
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline primary--text">עריכת פרטים</span>
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
                  <v-btn color="primary" text @click="dialog = false"
                    >סגירה
                  </v-btn>
                  <v-btn color="primary" text @click="updateInfo()">
                    שמירה
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
    return "/img/userImage.svg";
  }

  get userImageAlt() {
    const text = "user image";
    if (this.user.userImage != null) {
      return text;
    }
    return `${text} placeholder`;
  }

  triggerImageInput() {
    const inputEl = this.$refs.file;
    inputEl.click();
  }

  async removeUserImage() {
    await this.updateUserAction({ userImage: "" });
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
  width: 125px;
  height: 125px;
}
</style>
