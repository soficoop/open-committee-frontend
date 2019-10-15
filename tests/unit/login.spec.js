import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Login.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Login, {
      vuetify: new Vuetify()
    });
  });
  it("has correct subscribtion button status", () => {
    expect(wrapper.find("#submit-button").props("disabled")).toBeTruthy();
    wrapper.setData({
      signupData: {
        firstName: "נדב",
        lastName: "סופי",
        email: "asd@awd.com",
        password: "asdsadasdasd"
      }
    });
    expect(wrapper.find("#submit-button").props("disabled")).toBeFalsy();
  });
});
