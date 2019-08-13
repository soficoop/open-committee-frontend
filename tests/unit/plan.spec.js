import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Plan from "@/views/Plan.vue";
import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Plan.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: {
        [Getters.SELECTED_PLAN]: {
          id: "5d417e0e250469572551dca1",
          sid:
            "TOpflW7W09/1tYogOFwpUKSa5l8QAnVXet4B5OZvlYgFIW+78rXpJx5I0K38Nk7RWCr75PzCHQ1HCvsdw4PwNnGxbKHMb8kc2OfTmd9GWQs=",
          number: "101-0464859",
          lastUpdate: new Date("2018-10-23"),
          location:
            "התוכנית ממוקמת בשכונת פסגת זאב, בין רחובות משה דיין ושמחה הולצברג.",
          status: "החלטה בדיון בהתנגדויות",
          sections:
            '1. שינוי ייעוד הקרקע ממגורים ג\' לשימושים מעורבים ומגורים ג\'.2. קביעת בינוי והוראות לבינוי ופיתוח השטח עפ"י נספח הבינוי.3. קביעת מספר בניינים ל-4 מגדלים ועוד בניין שימושים מעורבים עם חניון מופרד.4. קביעת גובה הבניינים ל-18 קומות.5. קביעת מספר יח"ד ל- 286 יח"ד6. קביעת קווי בניין מרביים7. קביעת הנחיות פיתוח ועיצוב אדריכלי לבינוי ולזיקות ההנאה בין הבניינים.8. קביעת תנאים למתן היתר בנייה והיתר אכלוס.9. קביעת שלבי ביצוע למימוש הפרויקט ',
          name:
            "הקמת 4 מבנים למגורים ומבנה לשימושים מעורבים, פסגת זאב, ירושלים",
          municipality: "ירושלים",
          targets: "יצירת מתחם שימושים מעורבים לאורך ציר הרכבת הקלה.",
          type: "תוכנית",
          meetings: [
            {
              id: "5d417e03250469572551dc06",
              date: new Date("2019-08-13"),
              number: 2019042,
              committee: {
                sid:
                  "ועדה מחוזית לתכנון ולבניה מחוז ירושלים - ועדת משנה להתנגדויות"
              }
            }
          ],
          attachedFiles: [
            {
              id: "5d525a349d807b0eb5fd031c",
              name: "12.3 עצים בינריים.pdf",
              url: "/uploads/7548f0ee85e84266bf3e889207dd00f3.pdf",
              size: "493.40"
            },
            {
              id: "5d525a349d807b0eb5fd031b",
              name: "12.1 מחסנית.pdf",
              url: "/uploads/fb39bc1c1ef04fe28816204d0075cd73.pdf",
              size: "368.74"
            }
          ]
        },
        [Getters.MANAGABLE_MEETINGS]: []
      }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(Plan, {
      mocks,
      vuetify: new Vuetify()
    });
  });
  it("loads plan and managable meetings from the store", () => {
    expect(wrapper.vm.plan).not.toBeUndefined();
    expect(wrapper.vm.managableMeetings).not.toBeUndefined();
  });
  it("generates valid plan meetings", () => {
    expect(wrapper.vm.planMeetings).toHaveLength(1);
    const planMeeting = wrapper.vm.planMeetings[0];
    expect(planMeeting.headline).toBe(
      wrapper.vm.plan.meetings[0].committee.sid
    );
    expect(planMeeting.date).toBe(wrapper.vm.plan.meetings[0].date);
    expect(planMeeting.id).toBe(wrapper.vm.plan.meetings[0].id);
    expect(planMeeting.isEditable).toBe(false);
  });
});
