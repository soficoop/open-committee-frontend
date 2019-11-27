import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Manage from "@/views/Manage.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Manage.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: { managableMeetings: [] }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(Manage, {
      mocks,
      methods: { fetchManagableMeetings: () => [] }
    });
  });
  it("loads empty state.", () => {
    expect(wrapper.html()).toContain("אין ישיבות");
  });
  it("loads meetings.", () => {
    mocks.$store.getters.managableMeetings = [
      {
        id: "5d428452454ad41498dd73a1",
        number: 1,
        date: new Date("2019-08-02"),
        committee: {
          id: "5d2d74c0db29571dda10ff4a",
          sid: "ועדה מחוזית לתכנון ולבניה מחוז ירושלים"
        }
      }
    ];
    expect(wrapper.vm.meetings).toHaveLength(1);
    expect(wrapper.vm.meetings[0].headline).toBe(
      "ועדה מחוזית לתכנון ולבניה מחוז ירושלים"
    );
    expect(wrapper.vm.meetings[0].id).toBe("5d428452454ad41498dd73a1");
    expect(wrapper.vm.meetings[0].date.getTime()).toBe(
      new Date("2019-08-02").getTime()
    );
  });
});
