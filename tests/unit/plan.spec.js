import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Plan from "@/views/Plan.vue";
import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Plan.vue", () => {
  let plan = {
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
    name: "הקמת 4 מבנים למגורים ומבנה לשימושים מעורבים, פסגת זאב, ירושלים",
    municipality: "ירושלים",
    targets: "יצירת מתחם שימושים מעורבים לאורך ציר הרכבת הקלה.",
    type: "תוכנית",
    meetings: [
      {
        id: "5d417e03250469572551dc06",
        date: new Date("2019-08-13"),
        number: 2019042,
        committee: {
          id: "123",
          sid: "ועדה מחוזית לתכנון ולבניה מחוז ירושלים - ועדת משנה להתנגדויות"
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
    ],
    comments: [
      {
        id: "5d6cbd43c75c1f41ebd3b1ab",
        title: "תגובה ראשונה",
        name: "Sofia Sofi",
        content: "ראשונה",
        createdAt:
          "[native Date Mon Sep 02 2019 09:57:07 GMT+0300 (Israel Daylight Time)]",
        parent: null,
        user: {
          firstName: "Sofia",
          lastName: "Sofi",
          userImage: { url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg" }
        }
      },
      {
        id: "5d6cbd4fc75c1f41ebd3b1ac",
        title: "תגובה לתגובה ראשונה",
        name: "Sofia Sofi",
        content: "שנייה",
        createdAt:
          "[native Date Mon Sep 02 2019 09:57:19 GMT+0300 (Israel Daylight Time)]",
        parent: null,
        user: {
          firstName: "Sofia",
          lastName: "Sofi",
          userImage: { url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg" }
        },
        children: []
      },
      {
        id: "5d6cbe68c75c1f41ebd3b1ae",
        title: "תגובה לראשונה",
        name: "Sofia Sofi",
        content: "היי",
        createdAt:
          "[native Date Mon Sep 02 2019 10:02:00 GMT+0300 (Israel Daylight Time)]",
        parent: { id: "5d6cbd43c75c1f41ebd3b1ab" },
        user: {
          firstName: "Sofia",
          lastName: "Sofi",
          userImage: { url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg" }
        },
        children: []
      },
      {
        id: "5d6cc4e3c75c1f41ebd3b1af",
        title: "אהלן",
        name: "Sofia Sofi",
        content: "שלום",
        createdAt:
          "[native Date Mon Sep 02 2019 10:29:39 GMT+0300 (Israel Daylight Time)]",
        parent: { id: "5d6cbd43c75c1f41ebd3b1ab" },
        user: {
          firstName: "Sofia",
          lastName: "Sofi",
          userImage: { url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg" }
        },
        children: []
      },
      {
        id: "5d6cc516c75c1f41ebd3b1b0",
        title: "tvki",
        name: "Sofia Sofi",
        content: "hello",
        createdAt:
          "[native Date Mon Sep 02 2019 10:30:30 GMT+0300 (Israel Daylight Time)]",
        parent: null,
        user: {
          firstName: "Sofia",
          lastName: "Sofi",
          userImage: { url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg" }
        },
        children: []
      },
      {
        id: "5d6cc59cc75c1f41ebd3b1b1",
        title: "נושא",
        name: "רבי צדוק",
        content: "אהלן",
        createdAt:
          "[native Date Mon Sep 02 2019 10:32:44 GMT+0300 (Israel Daylight Time)]",
        parent: null,
        user: null,
        children: []
      },
      {
        id: "5d6cd0f7c75c1f41ebd3b1b2",
        title: "פלאפל זה טעים",
        name: "יוסי מורנו",
        content: "הכי טעים",
        createdAt:
          "[native Date Mon Sep 02 2019 11:21:11 GMT+0300 (Israel Daylight Time)]",
        parent: null,
        user: null
      },
      {
        id: "5d6cd103c75c1f41ebd3b1b3",
        title: "לא נכון",
        name: "שונא פלאפל",
        content: "זה ממש גרוע",
        createdAt:
          "[native Date Mon Sep 02 2019 11:21:23 GMT+0300 (Israel Daylight Time)]",
        parent: { id: "5d6cd0f7c75c1f41ebd3b1b2" },
        user: null,
        children: []
      },
      {
        id: "5d6e451fe8b5e8141a55f8d0",
        title: "יונתן הקטן",
        name: "aviran katz",
        content: "רץ בבוקר אל הגן",
        createdAt:
          "[native Date Tue Sep 03 2019 13:49:03 GMT+0300 (Israel Daylight Time)]",
        parent: null,
        user: {
          firstName: "aviran",
          lastName: "katz",
          userImage: { url: "/uploads/6cd42495303f4eeba4740bb8fdea73b2.png" }
        }
      },
      {
        id: "5d6e452be8b5e8141a55f8d1",
        title: "הוא טיפס",
        name: "aviran katz",
        content: "על העץ",
        createdAt:
          "[native Date Tue Sep 03 2019 13:49:15 GMT+0300 (Israel Daylight Time)]",
        parent: { id: "5d6e451fe8b5e8141a55f8d0" },
        user: {
          firstName: "aviran",
          lastName: "katz",
          userImage: { url: "/uploads/6cd42495303f4eeba4740bb8fdea73b2.png" }
        },
        children: []
      }
    ]
  };
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: {
        [Getters.SELECTED_PLAN]: plan,
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
    expect(wrapper.find("MeetingCards-stub").exists()).toBeTruthy();
    expect(wrapper.vm.planMeetings).toHaveLength(1);
    const planMeeting = wrapper.vm.planMeetings[0];
    expect(planMeeting.headline).toBe(
      wrapper.vm.plan.meetings[0].committee.sid
    );
    expect(planMeeting.date).toBe(wrapper.vm.plan.meetings[0].date);
    expect(planMeeting.id).toBe(wrapper.vm.plan.meetings[0].id);
    expect(planMeeting.isEditable).toBe(false);
    plan.meetings = [];
    expect(wrapper.find("MeetingCards-stub").exists()).toBeFalsy();
    expect(wrapper.vm.planMeetings).toHaveLength(0);
  });
  it("loads plan status when it exists", () => {
    expect(wrapper.find("v-icon-stub").exists()).toBeTruthy();
    expect(wrapper.find("v-icon-stub").text()).toBe("mdi-update");
    plan.status = "";
    expect(wrapper.find("v-icon-stub").exists()).toBeFalsy();
  });
  it("loads plan number when it exists", () => {
    expect(wrapper.text()).toContain(plan.number);
    plan.number = undefined;
    expect(wrapper.text()).not.toContain("תכנית מספר");
  });
  it("loads attached files when it exists", () => {
    expect(wrapper.find("FileCards-stub").exists()).toBeTruthy();
    plan.attachedFiles = [];
    expect(wrapper.find("FileCards-stub").exists()).toBeFalsy();
  });
});
