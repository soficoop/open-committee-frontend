import Vue from "vue";
import { mount } from "@vue/test-utils";
import AgendaCards from "@/components/AgendaCards.vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
const items = [
  {
    id: "5d0be21ae321d1583c0676a0",
    headline: "תכנית מספר 456-0129064",
    description: "בר/1/122 חוות שיאון",
    bullets: [
      { key: "סטטוס", value: "החלטה בדיון בהתנגדויות" },
      { key: "עדכון אחרון", value: "30.6.2019" },
      { key: "מיקום", value: "ממערב לקיבוץ חפץ חיים" }
    ]
  },
  {
    id: "5d0be21ae321d1583c0676a1",
    headline: "תכנית מספר 402-0596544",
    description: "הסדרת צומת גלמה כביש 444 טב/3634",
    bullets: [
      { key: "סטטוס", value: "החלטה בדיון לאימוץ הליכי הפקדה" },
      { key: "עדכון אחרון", value: "18.3.2019" },
      { key: "מיקום", value: "שכונת אל-גלמה  טייבה" }
    ]
  },
  {
    id: "5d0be21be321d1583c0676a2",
    headline: "תכנית מספר 408-0546879",
    description: "נת/7/400/צ -  שטחים לצורכי ציבור",
    bullets: [
      { key: "סטטוס", value: "עיון שר האוצר-התכנית לא טעונה אישור השר" },
      { key: "עדכון אחרון", value: "16.6.2019" },
      { key: "מיקום", value: null }
    ]
  }
];

describe("AgendaCards.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(AgendaCards, {
      propsData: { items, hoveredItem: "" },
      vuetify: new Vuetify()
    });
  });
  it("renders agenda cards.", () => {
    expect(wrapper.findAll(".v-card").length).toBe(3);
  });
  it("contains 3 headlines.", () => {
    for (const item of items) {
      expect(wrapper.html()).toContain(item.headline);
    }
  });
  it("contains 3 descriptions.", () => {
    for (const item of items) {
      expect(wrapper.html()).toContain(item.description);
    }
  });
  it("contains 3 descriptions.", () => {
    wrapper.setProps({ hoveredItem: items[0].id });
    for (const bullet of items[0].bullets) {
      expect(wrapper.html()).toContain(bullet.key);
      expect(wrapper.html()).toContain(bullet.value);
    }
  });
  it("doesn't contain null value bullet.", () => {
    wrapper.setProps({ hoveredItem: items[2].id });
    expect(wrapper.html()).toContain("סטטוס");
    expect(wrapper.html()).not.toContain("מיקום");
  });
});
