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
  it("renders correct field values in dialog", () => {
    expect(wrapper.find("[label='תפקיד']").exists()).toBeTruthy();
    expect(wrapper.find("[label='תפקיד']").attributes("value")).toEqual("מפתח");
  });
  //   it("generates valid plan meetings", () => {
  //     expect(wrapper.find("MeetingCards-stub").exists()).toBeTruthy();
  //     expect(wrapper.vm.planMeetings).toHaveLength(1);
  //     const planMeeting = wrapper.vm.planMeetings[0];
  //     expect(planMeeting.headline).toBe(
  //       wrapper.vm.plan.meetings[0].committee.sid
  //     );
  //     expect(planMeeting.date).toBe(wrapper.vm.plan.meetings[0].date);
  //     expect(planMeeting.id).toBe(wrapper.vm.plan.meetings[0].id);
  //     expect(planMeeting.isEditable).toBe(false);
  //     plan.meetings = [];
  //     expect(wrapper.find("MeetingCards-stub").exists()).toBeFalsy();
  //     expect(wrapper.vm.planMeetings).toHaveLength(0);
  //   });
  //   it("loads plan status when it exists", () => {
  //     expect(wrapper.find("v-icon-stub").exists()).toBeTruthy();
  //     expect(wrapper.find("v-icon-stub").text()).toBe("mdi-update");
  //     plan.status = "";
  //     expect(wrapper.find("v-icon-stub").exists()).toBeFalsy();
  //   });
  //   it("loads plan number when it exists", () => {
  //     expect(wrapper.text()).toContain(plan.number);
  //     plan.number = undefined;
  //     expect(wrapper.text()).not.toContain("תכנית מספר");
  //   });
  //   it("loads attached files exists", () => {
  //     expect(wrapper.find("FileCards-stub").exists()).toBeTruthy();
  //     plan.attachedFiles = [];
  //     expect(wrapper.find("FileCards-stub").exists()).toBeFalsy();
  //   });
});
