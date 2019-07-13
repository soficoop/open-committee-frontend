import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Navigation from "@/components/Navigation.vue";
import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Navigation.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Navigation, {
      mocks: {
        $store: {
          getters: { [Getters.JWT]: "12345", [Getters.USER]: { role: "" } }
        }
      },
      stubs: {
        "router-link": "<div></div>"
      }
    });
  });
  it("renders navigation drawer.", () => {
    expect(wrapper.contains("v-navigation-drawer-stub")).toBeTruthy();
  });
});
