import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Navigation from "@/components/Navigation.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Navigation.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: { jwt: "", user: { role: "" } }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(Navigation, {
      mocks,
      vuetify: new Vuetify(),
      stubs: {
        "router-link": "<div></div>"
      }
    });
  });
  it("renders navigation drawer.", () => {
    expect(wrapper.contains("v-navigation-drawer-stub")).toBeTruthy();
  });
  it("contains log in link.", () => {
    expect(wrapper.html()).not.toContain("logout");
    expect(wrapper.html()).not.toContain("subscriptions");
    expect(wrapper.html()).toContain("login");
  });
  it("contains links for a logged in user", () => {
    mocks.$store.getters.jwt = "12345";
    expect(wrapper.html()).toContain("login");
    expect(wrapper.html()).toContain("subscriptions");
    expect(wrapper.html()).not.toContain("manage");
  });
  it("contains admin links for a logged in admin", () => {
    mocks.$store.getters.user.role = { name: "Administrator" };
    expect(wrapper.html()).toContain("manage");
  });
});
