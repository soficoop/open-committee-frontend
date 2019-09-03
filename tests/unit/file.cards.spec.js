import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import FileCards from "@/components/FileCards.vue";
import { apiEndpoint } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("FileCards class", () => {
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let files = [
    {
      id: "5d5244b9270bac2cc03358d6",
      name: "2012ב מועד א3.pdf",
      url: "/uploads/6c2bc95fb8be43e7b9c0a071ce34ca66.pdf"
    },
    {
      id: "5d5243cd270bac2cc03358d3",
      name: "File.msg",
      url: "/uploads/468e0c0b22c04c818010758550ea64da.msg"
    },
    {
      id: "5d5243cd270bac2cc03358d2",
      name: "env.docker",
      url: "/uploads/34fce02495a24cde88836bd70eefd2c5.docker"
    }
  ];
  beforeEach(() => {
    wrapper = shallowMount(FileCards, {
      propsData: { files },
      vuetify: new Vuetify()
    });
  });
  it("loads files", () => {
    expect(wrapper.vm.files).toHaveLength(3);
  });
  it("renders 3 file cards", () => {
    expect(wrapper.findAll("v-card-stub")).toHaveLength(3);
  });
  it("renders correct titles", () => {
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      expect(
        wrapper
          .findAll("v-card-text-stub")
          .at(i)
          .text()
      ).toBe(fileName);
    }
  });
  it("renders correct links", () => {
    for (let i = 0; i < files.length; i++) {
      const fileUrl = files[i].url;
      expect(
        wrapper
          .findAll("v-btn-stub")
          .at(i)
          .attributes().href
      ).toBe(apiEndpoint + fileUrl);
    }
  });
});
