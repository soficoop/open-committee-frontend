import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import MeetingCards from "@/components/MeetingCards.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

const meetings = [
  {
    id: "5d0be16ae321d1583c0675bc",
    headline: "ועדה מחוזית לתכנון ולבניה מחוז המרכז - ועדת משנה להתנגדויות",
    date: new Date("Sun Jul 14 2019 12:00:00 GMT+0300")
  },
  {
    id: "5d1b371395930237857229b5",
    headline:
      "ועדה מחוזית לתכנון ולבניה מחוז הדרום - ועדת משנה למיתקנים פוטו-וולטאים",
    date: new Date("Sun Jul 14 2019 12:00:00 GMT+0300")
  },
  {
    id: "5d1b371495930237857229b6",
    headline: "ועדה מחוזית לתכנון ולבניה מחוז הדרום - ועדת משנה סטטוטורית",
    date: new Date("Sun Jul 14 2019 12:00:00 GMT+0300")
  },
  {
    id: "5d0be169e321d1583c0675bb",
    headline: "ועדה מחוזית לתכנון ולבניה מחוז חיפה - ועדת משנה להתנגדויות",
    date: new Date("Mon Jul 15 2019 12:00:00 GMT+0300")
  }
];

describe("MeetingCards.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MeetingCards, {
      propsData: { meetings }
    });
  });
  it("renders meeting cards.", () => {
    expect(wrapper.findAll("v-card-stub").length).toBe(4);
  });
  it("has meeting headlines.", () => {
    for (const meeting of meetings) {
      expect(wrapper.html()).toContain(meeting.headline);
    }
  });
  it("has links to meetings.", () => {
    for (const meeting of meetings) {
      expect(wrapper.html()).toContain(`to="/meeting/${meeting.id}"`);
    }
  });
  it("has meeting dates.", () => {
    for (const meeting of meetings) {
      expect(wrapper.html()).toContain(meeting.date.toLocaleDateString("he"));
    }
  });
});
