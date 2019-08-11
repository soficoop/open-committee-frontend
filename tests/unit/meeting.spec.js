import Vue from "vue";
import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";
import Meeting from "@/views/Meeting.vue";
import { Getters, ActionTypes } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Meeting.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let meeting = {
    id: "5d417e03250469572551dc08",
    sid: "4000054206",
    addedManually: null,
    background: null,
    number: 2019012,
    title: null,
    date: new Date("Mon Aug 12 2019 12:00:00"),
    summary: null,
    committee: {
      id: "5d2d75b0db29571dda11018a",
      sid: "ועדה מחוזית לתכנון ולבניה מחוז המרכז - ועדת המשנה הנקודתית",
      parent: { sid: "ועדה מחוזית לתכנון ולבניה מחוז המרכז" },
      meetings: [
        {
          id: "5d417e05250469572551dc89",
          date: new Date("Mon Jul 08 2019 12:00:00"),
          number: 2019011,
          title: null
        }
      ]
    },
    plans: [
      {
        id: "5d417e10250469572551dcb0",
        type: "נושא",
        name: "אישור פרוטוקול",
        number: "מחוז מרכז (1)",
        status: null,
        lastUpdate: new Date("Thu Jan 01 1970 12:00:00"),
        location: null
      },
      {
        id: "5d417e10250469572551dcb1",
        type: "תוכנית",
        name: "עח/17/29, חרב לאת, שפיגל, הגדלת אזור מגורים בנחלה",
        number: "409-0650044",
        status: "בדיקת תנאי סף-קיום תנאי סף",
        lastUpdate: new Date("Sun Jul 14 2019 12:00:00"),
        location: "פינת רחובות הדקל והשיטה בחרב לאת."
      },
      {
        id: "5d417e10250469572551dcb2",
        type: "תוכנית",
        name: "צוקי ארסוף",
        number: "401-0612416",
        status: "בדיקת תנאי סף-קיום תנאי סף",
        lastUpdate: new Date("Mon Jul 15 2019 12:00:00"),
        location: 'שכונת "צוקי ארסוף" הצמודה לגבולו הדרומי של קיבוץ געש'
      },
      {
        id: "5d417e10250469572551dcb3",
        type: "תוכנית",
        name: "הסדרת חיבור רחוב המייסדים באבן יהודה לרחוב החרוב בכפר נטר",
        number: "457-0718056",
        status: "בדיקת תנאי סף-קיום תנאי סף",
        lastUpdate: new Date("Wed Jul 10 2019 12:00:00"),
        location:
          "נקודת ההשקה בין אבן-יהודה לכפר נטר. בקצהו המערבי של רחוב המייסדים בשכונת באר גנים באבן-יהודה, וקצהו המזרחי של רחוב החרוב בכפר נטר."
      },
      {
        id: "5d417e10250469572551dcb4",
        type: "תוכנית",
        name: "אורימור- מתחם מגורים",
        number: "457-0523878",
        status: "קבלת תכנית",
        lastUpdate: new Date("Tue Oct 09 2018 12:00:00"),
        location:
          "שטח במועצה המקומית אבן יהודה הממוקם מערבית לדרך העצמאות וגובל בה"
      },
      {
        id: "5d417e10250469572551dcb5",
        type: "נושא",
        name: "הפסקה",
        number: "הפסקה",
        status: null,
        lastUpdate: new Date("Thu Jan 01 1970 12:00:00"),
        location: null
      },
      {
        id: "5d417e10250469572551dcb6",
        type: "בקשה",
        name: 'אישור ו. מחוזית בשל קרבה לקו מתח גבוה-בניית 4 יח"ד',
        number: "רצ/ ש/ 920",
        status: null,
        lastUpdate: new Date("Thu Jan 01 1970 12:00:00"),
        location: null
      },
      {
        id: "5d417e10250469572551dcb7",
        type: "תוכנית",
        name:
          'שינוי ייעוד קרקע חקלאית למגורים ותוספת של 26 יח"ד במושב גני יוחנן',
        number: "426-0158626",
        status: "פרסום הודעה בדבר דחיית תכנית באתר אינטרנט",
        lastUpdate: new Date("Mon Dec 05 2016 12:00:00"),
        location:
          "קרקע חקלאית, חלקה מספר 2 ,  ממוקמת ברחוב הנרקיס במושב גני יוחנן. החלקה גובלת מצפון בחלקת מגורים וחממות, מדרום אזור מגורים, הרחבה של המושב."
      },
      {
        id: "5d417e10250469572551dcb8",
        type: "בקשה",
        name: "מתחם מגורים לעובדים זרים.",
        number: "ממ/ ש/ 937",
        status: null,
        lastUpdate: new Date("Thu Jan 01 1970 12:00:00"),
        location: null
      },
      {
        id: "5d417e10250469572551dcb9",
        type: "תוכנית",
        name: 'ממ/3/1477 שינוי משצ"פ למבנה ציבור-שרותי חרום והצלה',
        number: "455-0761189",
        status: "בדיקת תנאי סף-קיום תנאי סף",
        lastUpdate: new Date("Tue Jul 16 2019 12:00:00"),
        location: "רחוב הסביון,רחוב היוצר."
      },
      {
        id: "5d417e10250469572551dcba",
        type: "תוכנית",
        name: "חזית מסחרית ומגורים - טב/3691",
        number: "402-0730796",
        status: "בדיקת תנאי סף-קיום תנאי סף",
        lastUpdate: new Date("Wed Jul 10 2019 12:00:00"),
        location:
          'במרחק כ- 200 מטר צפונה ממסגד "עלי בן אבי טאלב" ובצמוד לכביש הטבעת המזרחי .'
      }
    ],
    protocol: null,
    transcript: null,
    decisions: null,
    additionalFiles: []
  };
  let actions = {
    [ActionTypes.FETCH_MEETING]: jest.fn(),
    [ActionTypes.FETCH_MANAGABLE_MEETINGS]: jest.fn()
  };
  let store = new Vuex.Store({
    state: { meeting },
    getters: {
      [Getters.MANAGABLE_MEETINGS]() {
        return [];
      },
      [Getters.SELECTED_MEETING]() {
        return meeting;
      }
    },
    actions
  });
  beforeEach(() => {
    wrapper = shallowMount(Meeting, {
      store,
      vuetify: new Vuetify()
    });
  });
  it("loads meeting number when title is unavailable", () => {
    expect(wrapper.text()).toContain("ישיבה מספר");
  });
  it("loads meeting title when it is available", () => {
    meeting.title = "כותרת ישיבה";
    expect(wrapper.text()).not.toContain("ישיבה מספר");
    expect(wrapper.text()).toContain("כותרת ישיבה");
  });
  it("meeting is not editable", () => {
    expect(wrapper.vm.isMeetingEditable).toBeFalsy();
    expect(wrapper.text()).not.toContain("עריכת ישיבה");
  });
  it("has 11 agenda items", () => {
    expect(wrapper.vm.agendaItems).toHaveLength(11);
    expect(wrapper.text()).toContain("סדר יום");
  });
  it("has 1 other meeting of committee", () => {
    expect(wrapper.text()).toContain("דיונים נוספים של הועדה");
    expect(wrapper.vm.otherMeetingsOfCommittee).toHaveLength(1);
  });
  it("doesn't display empty plans header", () => {
    meeting.plans = [];
    expect(wrapper.vm.agendaItems).toHaveLength(0);
    expect(wrapper.text()).not.toContain("סדר יום");
  });
  it("doesn't display empty meetings header", () => {
    meeting.committee.meetings = [];
    expect(wrapper.vm.otherMeetingsOfCommittee).toHaveLength(0);
    expect(wrapper.text()).not.toContain("דיונים נוספים של הועדה");
  });
});
