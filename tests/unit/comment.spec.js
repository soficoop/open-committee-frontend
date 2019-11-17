import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Comment from "@/components/Comment.vue";
import { Getters, apiEndpoint } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Comment.vue", () => {
  let comment = {
    id: "5dcd8d45e46e6c1c5cae1954",
    title: "sdgdf",
    name: "אבירן כץ",
    content: "gsfdgfdsg",
    createdAt: new Date("Thu Nov 14 2019 19:22:13 GMT+0200"),
    isHidden: false,
    isPinned: false,
    parent: null,
    user: {
      firstName: "אבירן",
      lastName: "כץ",
      id: "5d8359f6be96155b71f5c6f9",
      job: "מתכנת",
      userImage: { url: "/uploads/2d08922d359742249508cbb37b34e658.jpeg" }
    },
    children: [],
    isFullContentVisible: true,
    visibleContent: "gsfdgfdsg"
  };
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let user = null;
  const shallow = () => {
    wrapper = shallowMount(Comment, {
      propsData: {
        comment,
        isPinAllowed: false,
        isReplyAllowed: false,
        isCommenterAdmin: false,
        isUserAdmin: false
      },
      mocks: {
        $store: {
          getters: {
            [Getters.USER]: user
          }
        }
      },
      vuetify: new Vuetify()
    });
  };
  beforeEach(shallow);
  it("renders comment", () => {
    const text = wrapper.text();
    expect(text).toContain(comment.title);
    expect(text).toContain(comment.name);
    expect(text).toContain(comment.visibleContent);
  });
  it("displays only allowed actions", () => {
    const text = wrapper.text();
    expect(text).not.toContain("הגב להתייחסות");
    expect(text).not.toContain("נעץ");
    expect(text).not.toContain("קרא עוד");
    expect(text).not.toContain("מחק");
  });
  it("highlights an admin commenter", () => {
    wrapper.setProps({ isCommenterAdmin: true });
    expect(wrapper.find("h5").classes("font-weight-bold")).toBeTruthy();
  });
  it("allows to pin the comment by props", () => {
    wrapper.setProps({ isPinAllowed: true });
    expect(wrapper.text()).not.toContain("נעץ");
    wrapper.setProps({ isUserAdmin: true });
    expect(wrapper.text()).toContain("נעץ");
    wrapper.find("a").trigger("click");
    expect(wrapper.emitted("pin")).toBeTruthy();
  });
  it("allows an admin to delete a comment", () => {
    wrapper.setProps({ isUserAdmin: true });
    expect(wrapper.text()).toContain("מחק");
    wrapper.find("a").trigger("click");
    expect(wrapper.emitted("remove")).toBeTruthy();
  });
  it("allows a user to delete their own comment", () => {
    expect(wrapper.vm.isUserCommentOwner).toBeFalsy();
    user = comment.user;
    shallow();
    expect(wrapper.vm.isUserCommentOwner).toBeTruthy();
    expect(wrapper.text()).toContain("מחק");
    wrapper.find("a").trigger("click");
    expect(wrapper.emitted("remove")).toBeTruthy();
    user = null;
  });
  it("correctly displays or hides reply form", () => {
    wrapper.setProps({ isReplyAllowed: true });
    expect(wrapper.text()).toContain("הגב להתייחסות");
    expect(wrapper.find("NewComment-stub").exists()).toBeFalsy();
    wrapper.find("a").trigger("click");
    expect(wrapper.vm.isReplying).toBeTruthy();
    expect(wrapper.find("NewComment-stub").exists()).toBeTruthy();
    wrapper.vm.handleCommentSubmitted();
    expect(wrapper.vm.isReplying).toBeFalsy();
    expect(wrapper.find("NewComment-stub").exists()).toBeFalsy();
    expect(wrapper.emitted("newCommentSubmit")).toBeTruthy();
  });
  it("displays correct commenter image", () => {
    expect(wrapper.find("v-img-stub").props("src")).toBe(wrapper.vm.imageUrl);
    expect(wrapper.vm.imageUrl).toBe(apiEndpoint + comment.user.userImage.url);
    comment.user.userImage = null;
    expect(wrapper.vm.imageUrl).toBe("/img/userImage.svg");
  });
});
