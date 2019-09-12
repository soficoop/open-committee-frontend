import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import User from "@/views/User.vue";
import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("User.vue", () => {
  let user = {
    _id: "5d7031217aeaf53846765332",
    confirmed: true,
    blocked: false,
    committees: [
      {
        id: "5d0be070e321d1583c067568",
        sid: "ועדה מחוזית לתכנון ולבניה מחוז המרכז"
      }
    ],
    lastName: "מורנו",
    city: "zur-moshe",
    organization: "sofi",
    username: "nadavmoreno",
    firstName: "נדב",
    email: "nadavmoreno@gmail.com",
    job: "מפתח",
    provider: "local",
    createdAt: "2019-09-04T21:48:17.590Z",
    updatedAt: "2019-09-11T14:42:46.771Z",
    id: "5d7031217aeaf53846765332",
    userImage: {
      _id: "5d7907e61663e0478090a8cf",
      name: "aviran.png",
      sha256: "s8wVqPMG6Ks6RHdolB6o9qWhYWchRRi0AHkppTkf_qc",
      hash: "87da1bdd384f49f2a90f59fe7b5f9fa0",
      ext: ".png",
      mime: "image/png",
      size: "549.65",
      url: "/uploads/87da1bdd384f49f2a90f59fe7b5f9fa0.png",
      provider: "local",
      related: [
        {
          _id: "5d7907e61663e0478090a8d0",
          ref: "5d7031217aeaf53846765332",
          kind: "UsersPermissionsUser",
          field: "userImage"
        }
      ],
      createdAt: "2019-09-11T14:42:46.723Z",
      updatedAt: "2019-09-11T14:42:46.732Z",
      id: "5d7907e61663e0478090a8cf"
    }
  };
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: {
        [Getters.USER]: user
      }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(User, {
      mocks,
      methods: { updateInfo: jest.fn() },
      vuetify: new Vuetify()
    });
  });
  it("loads user from the store", () => {
    expect(wrapper.vm.user).not.toBeUndefined();
  });
  it("renders correct fields values in dialog", () => {
    expect(wrapper.find("[name='job']").exists()).toBeTruthy();
    expect(wrapper.find("[name='job']").attributes("value")).toEqual("מפתח");
    expect(wrapper.find("[name='organization']").exists()).toBeTruthy();
    expect(wrapper.find("[name='organization']").attributes("value")).toEqual(
      "sofi"
    );
    expect(wrapper.find("[name='firstName']").exists()).toBeTruthy();
    expect(wrapper.find("[name='firstName']").attributes("value")).toEqual(
      "נדב"
    );
    expect(wrapper.find("[name='lastName']").exists()).toBeTruthy();
    expect(wrapper.find("[name='lastName']").attributes("value")).toEqual(
      "מורנו"
    );
    expect(wrapper.find("[name='city']").exists()).toBeTruthy();
    expect(wrapper.find("[name='city']").attributes("value")).toEqual(
      "zur-moshe"
    );
  });
  it("does not load job title and value when it is not available", () => {
    user.job = "";
    expect(wrapper.text()).not.toContain("תפקיד");
    expect(wrapper.text()).not.toContain("מפתח");
    user.job = "מפתח";
  });
  it("does not load organization title and value when it is not available", () => {
    user.organization = "";
    expect(wrapper.text()).not.toContain("שייכות לארגון");
    expect(wrapper.text()).not.toContain("sofi");
    user.organization = "sofi";
  });
  it("does not load city title and value when it is not available", () => {
    user.city = "";
    expect(wrapper.text()).not.toContain("עיר");
    expect(wrapper.text()).not.toContain("zur-moshe");
  });
  it("computes hasImage getter correctly", () => {
    user.userImage = null;
    expect(wrapper.vm.hasImage).toBeFalsy();
    user.userImage = undefined;
    expect(wrapper.vm.hasImage).toBeFalsy();
  });
  it("computes userImageUrl getter correctly", () => {
    expect(wrapper.vm.userImageUrl).toEqual("/img/userImage.svg");
    user.userImage = null;
    expect(wrapper.vm.userImageUrl).toEqual("/img/userImage.svg");
    user.userImage = { url: "/uploads/87da1bdd384f49f2a90f59fe7b5f9fa0.png" };
    expect(wrapper.vm.userImageUrl).toContain(
      "/uploads/87da1bdd384f49f2a90f59fe7b5f9fa0.png"
    );
  });
  it("computes userImageAlt getter correctly", () => {
    expect(wrapper.vm.userImageAlt).toEqual("user image");
    user.userImage = null;
    expect(wrapper.vm.userImageAlt).toEqual("user image placeholder");
    user.userImage = undefined;
    expect(wrapper.vm.userImageAlt).toEqual("user image placeholder");
  });
});
