import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import NewComment from "@/components/NewComment.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("NewComment.vue", () => {
  let plan = {
    id: "5d417e0e250469572551dca1"
  };
  let user = { firstName: "Open", lastName: "Committee" };
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: {
        selectedPlan: plan,
        user
      }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(NewComment, {
      mocks,
      vuetify: new Vuetify()
    });
  });
  it("displays text fields for name, title and comments", () => {
    expect(wrapper.find("[label=שם]").exists()).toBeTruthy();
    expect(wrapper.vm.name).toEqual(`${user.firstName} ${user.lastName}`);
    expect(wrapper.find("[label=נושא]").exists()).toBeTruthy();
    expect(wrapper.find('[label="תוכן ההתייחסות"]').exists()).toBeTruthy();
  });
  it("disables name input if a user is logged in", () => {
    expect(wrapper.find("[label=שם]").props("disabled")).toBeTruthy();
    mocks.$store.getters.user = null;
    expect(wrapper.find("[label=שם]").props("disabled")).toBeFalsy();
    mocks.$store.getters.user = user;
  });
  it("computes canSubmit correctly", () => {
    wrapper.vm.name = "";
    expect(wrapper.vm.canSubmit).toBeFalsy();
    wrapper.vm.title = "TITLE";
    expect(wrapper.vm.canSubmit).toBeFalsy();
    wrapper.vm.content = "CONTENT";
    expect(wrapper.vm.canSubmit).toBeFalsy();
    wrapper.vm.name = "NAME";
    expect(wrapper.vm.canSubmit).toBeTruthy();
  });
});
