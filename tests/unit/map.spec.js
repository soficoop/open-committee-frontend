import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Map from "@/components/Map.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Map.vue", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            place_id: 198988769,
            licence:
              "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
            osm_type: "relation",
            osm_id: 1392849,
            boundingbox: [
              "32.4445108",
              "32.5052219",
              "34.9415819",
              "35.0151261"
            ],
            lat: "32.475041",
            lon: "34.9761087",
            display_name: "פרדס חנה - כרכור, מחוז חיפה, 55446, ישראל",
            class: "boundary",
            type: "administrative",
            importance: 0.359244663650663,
            icon:
              "https://nominatim.openstreetmap.org/images/mapicons/poi_boundary_administrative.p.20.png"
          }
        ])
    })
  );
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Map, {
      vuetify: new Vuetify(),
      propsData: { query: "פרדס חנה-כרכור" }
    });
  });

  it("loads query", () => {
    expect(wrapper.vm.query).toBe("פרדס חנה-כרכור");
  });
  it("renders map", () => {
    expect(wrapper.find("Leaflet-stub").exists()).toBeTruthy();
  });
  it("has a center", () => {
    expect(wrapper.vm.center).toEqual({ lat: "32.475041", lon: "34.9761087" });
  });
});
