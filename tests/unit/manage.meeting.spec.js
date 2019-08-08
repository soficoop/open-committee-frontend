import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import ManageMeeting from "@/views/ManageMeeting.vue";
import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("ManageMeeting.vue", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let mocks = {
    $store: {
      getters: { [Getters.USER]: "", [Getters.JWT]: "" }
    },
    $route: {
      params: {}
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(ManageMeeting, {
      mocks,
      vuetify: new Vuetify()
    });
  });
  it("requires meeting number, date, committee and an agenda item in order to submit a meeting", () => {
    expect(wrapper.vm.isFormValid).toBeFalsy();
    wrapper.vm.meetingNumber = "1";
    expect(wrapper.vm.isFormValid).toBeFalsy();
    wrapper.vm.committee = "1";
    expect(wrapper.vm.isFormValid).toBeFalsy();
    wrapper.vm.meetingDateString = "2019-08-01";
    expect(wrapper.vm.isFormValid).toBeFalsy();
    wrapper.vm.addedPlans.push("1");
    expect(wrapper.vm.isFormValid).toBeTruthy();
  });
  it("computes agendaItems by addedPlans and addedSubject", () => {
    wrapper.vm.addedSubjects.push({
      id: new Date().getTime(),
      title: "title",
      description: "description",
      attachedFiles: [new File([], "a")]
    });
    expect(wrapper.vm.agendaItems).toHaveLength(1);
    wrapper.vm.addedPlans.push({
      id: "dsf3rnjfxg",
      number: "2323",
      type: "תכנית",
      name: "תכנית נסיון",
      updatedAt: new Date("2018-08-08"),
      location: "מיקום לדוגמא"
    });
    expect(wrapper.vm.agendaItems).toHaveLength(2);
  });
  it("adds a subject with addSubject method.", () => {
    expect(wrapper.vm.addedSubjects).toHaveLength(0);
    wrapper.vm.newSubject.title = "כותרת";
    wrapper.vm.newSubject.description = "description";
    wrapper.vm.newSubject.attachedFiles = [new File([], "new")];
    wrapper.vm.addSubject();
    expect(wrapper.vm.addedSubjects).toHaveLength(1);
  });
  it("removes an added plan using handleAgendaItemRemoveClicked.", () => {
    wrapper.vm.addedPlans = [
      {
        id: "5d417e0c250469572551dc9f",
        sid:
          "CliOXy1vENq3YA20poC//aEUSBcaMou0GfdD4Ta/7+Q4gi4BGiOVdB//3wOrFDmS2Nwp2w6dhvzWopHd3UxOpH32H56NBhLXoeoV7DCg7NM=",
        number: "601-0217067",
        lastUpdate: new Date("2019-02-19"),
        location:
          "שטח התכנית נמצא ברח' יהדות דרום אפריקה פינת עולי גרדום, אופקים",
        name: "מגורים, מסחר ותעסוקה ברח' יהדות דרום אפריקה, אופקים",
        municipality: "אופקים",
        targets:
          "יצירת מסגרת תכנונית להקמת בניין של מגורים מסחר ותעסוקה ברח' יהדות דרום אפריקה פינת רח' עולי גרדום, אופקים.",
        type: "תוכנית",
        meetings: [
          {
            id: "5d417e03250469572551dc05",
            date: new Date("2019-08-19"),
            number: 2019016
          }
        ]
      }
    ];
    wrapper.vm.handleAgendaItemRemoveClicked("5d417e0c250469572551dc9f");
    expect(wrapper.vm.addedPlans).toHaveLength(0);
  });
});
