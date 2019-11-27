import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import SubscriptionToggle from "@/components/SubscriptionToggle.vue";
import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("SubscriptionToggle.vue", () => {
  let user = {
    id: "5d8359f6be96155b71f5c6f9",
    subscribedCommittees: [
      {
        id: "5d83578727e32d5875120517",
        sid: "ועדה מחוזית לתכנון ולבניה מחוז המרכז"
      },
      { id: "5d83578727e32d5875120518", sid: "ועדה ארצית" },
      {
        id: "5d83578727e32d587512051a",
        sid: "ועדה מחוזית לתכנון ולבניה מחוז ירושלים"
      },
      {
        id: "5d83585927e32d5875120725",
        sid: "ועדה מחוזית לתכנון ולבניה מחוז המרכז - ועדה מקצועית למים וביוב"
      },
      {
        id: "5d83585a27e32d5875120728",
        sid:
          "ועדה מחוזית לתכנון ולבניה מחוז הדרום - הועדה המחוזית לתכנון ולבניה מחוז הדרום"
      },
      {
        id: "5d83585a27e32d5875120729",
        sid: "ועדה מחוזית לתכנון ולבניה מחוז המרכז - ועדת משנה להתנגדויות"
      }
    ]
  };
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: {
        [Getters.USER]: user
      },
      actions: {
        updateUser: jest.fn
      }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(SubscriptionToggle, {
      mocks,
      methods: {
        fetchUserSubscriptions: jest.fn(),
        updateUser: jest.fn()
      },
      propsData: {
        committeeId: user.subscribedCommittees[0].id
      },
      vuetify: new Vuetify()
    });
  });
  it("computes isUserSubscribed correctly", () => {
    expect(wrapper.vm.isUserSubscribed).toBeTruthy();
    wrapper.setProps({ committeeId: "123" });
    expect(wrapper.vm.isUserSubscribed).toBeFalsy();
  });
  it("updates subscriptions on click", async () => {
    wrapper.setMethods({
      updateUser: jest.fn(),
      fetchUserSubscriptions: jest.fn()
    });
    await wrapper.vm.toggleSubscription();
    expect(wrapper.vm.updateUser).toHaveBeenCalled();
    expect(wrapper.vm.fetchUserSubscriptions).toHaveBeenCalled();
    expect(wrapper.vm.hasToggledSubscription).toBeTruthy();
  });
});
