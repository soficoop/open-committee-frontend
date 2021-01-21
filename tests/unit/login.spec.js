import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Login.vue", () => {
  let loginData = {
    email: "asdasd@asda.com",
    password: "",
    showPassword: false
  };

  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Login, {
      mocks: {
        $route: { params: {} }
      },
      loginData,
      vuetify: new Vuetify()
    });
  });
  it("renders correct fields", () => {
    expect(wrapper.find("[name='login-email']").exists()).toBeTruthy();
    expect(wrapper.find("[name='login-password']").exists()).toBeFalsy();
    wrapper.setData({ loginData: { email: "asdasd@asda.com" } });
    expect(wrapper.find("[name='login-password']").exists()).toBeTruthy();
  });
  it("has the same email value in login and recovery", () => {
    wrapper.setData({ loginData: { email: "asdasd@asda.com" } });
    wrapper.vm.dialog = true;
    expect(wrapper.vm.loginData.email).toEqual(
      wrapper.vm.forgotPasswordData.email
    );
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
  it("displays login form on email confirmation", () => {
    wrapper = shallowMount(Login, {
      mocks: {
        $route: { path: "/login/user-is-confirmed", params: {} }
      },
      loginData,
      vuetify: new Vuetify()
    });
    expect(wrapper.vm.isUserConfirmed).toBeTruthy();
    expect(wrapper.text()).toContain("ההרשמה הושלמה, כעת ניתן להתחבר למערכת");
    expect(wrapper.vm.tab).toEqual(1);
    expect(
      wrapper.findAll("v-btn").filter(btn => btn.isVisible())
    ).toHaveLength(0);
  });
  it("displays initial tab by tab route param", () => {
    wrapper = shallowMount(Login, {
      mocks: {
        $route: { params: { tab: 0 } }
      },
      loginData,
      vuetify: new Vuetify()
    });
    expect(wrapper.vm.tab).toEqual(0);
    expect(wrapper.find("#submit-button").exists()).toBeTruthy();
    wrapper = shallowMount(Login, {
      mocks: {
        $route: { params: { tab: 1 } }
      },
      loginData,
      vuetify: new Vuetify()
    });
    expect(wrapper.vm.tab).toEqual(1);
    expect(
      wrapper.findAll("v-btn").filter(btn => btn.isVisible())
    ).toHaveLength(0);
  });
});
