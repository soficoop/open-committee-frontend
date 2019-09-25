import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
// import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Login.vue", () => {
  //   let login = {
  //     authenticationFailed: false,
  //     dialog: false,
  //     forgotPasswordData: {
  //       email: "",
  //       mailSent: ""
  //     },
  //     loader: false,
  //     loginData: {
  //       email: "",
  //       password: "",
  //       showPassword: false
  //     },
  //     tab: 0
  //   };

  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Login, {
      vuetify: new Vuetify()
    });
  });

  it("renders correct fields", () => {
    // console.log(wrapper.find("[name='password']"));
    expect(wrapper.find("[name='email']").exists()).toBeTruthy();
    // expect(wrapper.find("[name='password']").exists()).toBeFalsy();
    // login.loginData.email = "nadav@soficoop.com";
    // expect(wrapper.find("[name='password']").exists()).toBeTruthy();
    // expect(wrapper.find("[name='job']").attributes("value")).toEqual("מפתח");
    // expect(wrapper.find("[name='organization']").exists()).toBeTruthy();
    // expect(wrapper.find("[name='organization']").attributes("value")).toEqual(
    //   "sofi"
    // );
    //     expect(wrapper.find("[name='firstName']").exists()).toBeTruthy();
    //     expect(wrapper.find("[name='firstName']").attributes("value")).toEqual(
    //       "נדב"
    //     );
    //     expect(wrapper.find("[name='lastName']").exists()).toBeTruthy();
    //     expect(wrapper.find("[name='lastName']").attributes("value")).toEqual(
    //       "מורנו"
    //     );
    //     expect(wrapper.find("[name='city']").exists()).toBeTruthy();
    //     expect(wrapper.find("[name='city']").attributes("value")).toEqual(
    //       "zur-moshe"
    //     );
  });
  //   it("does not load job title and value when it is not available", () => {
  //     user.job = "";
  //     expect(wrapper.text()).not.toContain("תפקיד");
  //     expect(wrapper.text()).not.toContain("מפתח");
  //     user.job = "מפתח";
  //   });
  //   it("does not load organization title and value when it is not available", () => {
  //     user.organization = "";
  //     expect(wrapper.text()).not.toContain("שייכות לארגון");
  //     expect(wrapper.text()).not.toContain("sofi");
  //     user.organization = "sofi";
  //   });
  //   it("does not load city title and value when it is not available", () => {
  //     user.city = "";
  //     expect(wrapper.text()).not.toContain("עיר");
  //     expect(wrapper.text()).not.toContain("zur-moshe");
  //   });
  //   it("computes hasImage getter correctly", () => {
  //     user.userImage = null;
  //     expect(wrapper.vm.hasImage).toBeFalsy();
  //     user.userImage = undefined;
  //     expect(wrapper.vm.hasImage).toBeFalsy();
  //   });
  //   it("computes userImageUrl getter correctly", () => {
  //     expect(wrapper.vm.userImageUrl).toEqual("/img/userImage.svg");
  //     user.userImage = null;
  //     expect(wrapper.vm.userImageUrl).toEqual("/img/userImage.svg");
  //     user.userImage = { url: "/uploads/87da1bdd384f49f2a90f59fe7b5f9fa0.png" };
  //     expect(wrapper.vm.userImageUrl).toContain(
  //       "/uploads/87da1bdd384f49f2a90f59fe7b5f9fa0.png"
  //     );
  //   });
  //   it("computes userImageAlt getter correctly", () => {
  //     expect(wrapper.vm.userImageAlt).toEqual("user image");
  //     user.userImage = null;
  //     expect(wrapper.vm.userImageAlt).toEqual("user image placeholder");
  //     user.userImage = undefined;
  //     expect(wrapper.vm.userImageAlt).toEqual("user image placeholder");
  //   });
});
