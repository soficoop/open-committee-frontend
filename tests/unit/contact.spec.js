import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Contact from "@/views/Contact.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Contact.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Contact, {
      vuetify: new Vuetify()
    });
  });
  it("computes canSendApplication correctly", () => {
    expect(wrapper.vm.canSendApplication).toBeFalsy();
    wrapper.vm.name = "Testy";
    expect(wrapper.vm.canSendApplication).toBeFalsy();
    wrapper.vm.email = "Testy@test.com";
    expect(wrapper.vm.canSendApplication).toBeFalsy();
    wrapper.vm.message = "Testy Test";
    expect(wrapper.vm.canSendApplication).toBeTruthy();
  });
  it("displays correct error message", () => {
    wrapper.vm.hasApplicationFailed = true;
    expect(wrapper.text()).toContain("שגיאה לא צפויה קרתה");
  });
  it("displays correct success message", () => {
    wrapper.vm.hasSentApplication = true;
    expect(wrapper.text()).toContain("פנייתכם התקבלה");
  });
});
