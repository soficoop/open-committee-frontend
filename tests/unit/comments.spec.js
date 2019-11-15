import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Comments from "@/components/Comments.vue";
import { Getters } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Comments.vue", () => {
  let plan = {
    id: "5d417e0e250469572551dca1",
    comments: [
      {
        id: "5d6cbd43c75c1f41ebd3b1ab",
        title: "נדב",
        name: "Sofia Sofi",
        content: "ראשונה",
        createdAt: new Date("Mon Sep 02 2019"),
        parent: null,
        isHidden: false,
        isPinned: true,
        user: {
          firstName: "Sofia",
          lastName: "Sofi",
          userImage: { url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg" }
        },
        children: [
          {
            id: "5d6cbe68c75c1f41ebd3b1ae",
            title: "תגובה לראשונה",
            name: "Sofia Sofi",
            content: "היי",
            createdAt: new Date("Mon Sep 02 2019"),
            isHidden: true,
            user: {
              firstName: "Sofia",
              lastName: "Sofi",
              userImage: {
                url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg"
              }
            }
          },
          {
            id: "5d7e130b4223d2493c5dda05",
            title: "תגובה ממש ארוכה",
            name: "אבירן כץ",
            content:
              "תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה תגובה ממש ארוכה ",
            createdAt: new Date("2019-09-15"),
            isHidden: false,
            user: {
              firstName: "אבירן",
              lastName: "כץ",
              userImage: {
                url: "/uploads/0eaa88562ea74e7781dde7bee2a92c08.jpg"
              }
            }
          },
          {
            id: "5d6cc4e3c75c1f41ebd3b1af",
            title: "אהלן",
            name: "Sofia Sofi",
            content: "שלום",
            createdAt: new Date("Mon Sep 02 2019"),
            isHidden: true,
            user: {
              firstName: "Sofia",
              lastName: "Sofi",
              userImage: {
                url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg"
              }
            }
          }
        ]
      },
      {
        id: "5d6cbd4fc75c1f41ebd3b1ac",
        title: "נדב1",
        name: "Sofia Sofi",
        content: "שנייה",
        isHidden: false,
        isPinned: true,
        createdAt: new Date("Mon Sep 02 2019"),
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
        title: "נדב2",
        name: "Sofia Sofi",
        content: "היי",
        isHidden: false,
        isPinned: false,
        createdAt: new Date("Mon Sep 02 2019"),
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
        createdAt: new Date("Mon Sep 02 2019"),
        parent: { id: "5d6cbd43c75c1f41ebd3b1ab" },
        isHidden: false,
        isPinned: false,
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
        createdAt: new Date("Mon Sep 02 2019"),
        isHidden: false,
        isPinned: true,
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
        createdAt: new Date("Mon Sep 02 2019"),
        isHidden: false,
        isPinned: false,
        parent: null,
        user: null,
        children: []
      },
      {
        id: "5d6cd0f7c75c1f41ebd3b1b2",
        title: "פלאפל זה טעים",
        name: "יוסי מורנו",
        content: "הכי טעים",
        createdAt: new Date("Mon Sep 02 2019"),
        isHidden: false,
        isPinned: false,
        parent: null,
        user: null,
        children: [
          {
            id: "5d6cd103c75c1f41ebd3b1b3",
            title: "לא נכון",
            name: "שונא פלאפל",
            content: "זה ממש גרוע",
            isHidden: false,
            createdAt: new Date("Mon Sep 02 2019"),
            user: null
          }
        ]
      },
      {
        id: "5d6cd103c75c1f41ebd3b1b3",
        title: "לא נכון",
        name: "שונא פלאפל",
        content: "זה ממש גרוע",
        createdAt: new Date("Mon Sep 02 2019"),
        isHidden: false,
        isPinned: false,
        parent: { id: "5d6cd0f7c75c1f41ebd3b1b2" },
        user: null,
        children: []
      },
      {
        id: "5d6e451fe8b5e8141a55f8d0",
        title: "יונתן הקטן",
        name: "aviran katz",
        content: "רץ בבוקר אל הגן",
        createdAt: new Date("Tue Sep 03 2019"),
        isHidden: false,
        isPinned: false,
        parent: null,
        user: {
          firstName: "aviran",
          lastName: "katz",
          userImage: { url: "/uploads/6cd42495303f4eeba4740bb8fdea73b2.png" }
        },
        children: [
          {
            id: "5d6e452be8b5e8141a55f8d1",
            title: "הוא טיפס",
            name: "aviran katz",
            content: "על העץ",
            createdAt: new Date("Tue Sep 03 2019"),
            isHidden: true,
            user: {
              firstName: "aviran",
              lastName: "katz",
              userImage: {
                url: "/uploads/6cd42495303f4eeba4740bb8fdea73b2.png"
              }
            }
          }
        ]
      },
      {
        id: "5d6e452be8b5e8141a55f8d1",
        title: "הוא טיפס",
        name: "aviran katz",
        content: "על העץ",
        createdAt: new Date("Tue Sep 03 2019"),
        isPinned: false,
        isHidden: true,
        parent: { id: "5d6e451fe8b5e8141a55f8d0" },
        user: {
          firstName: "aviran",
          lastName: "katz",
          userImage: { url: "/uploads/6cd42495303f4eeba4740bb8fdea73b2.png" }
        },
        children: []
      },
      {
        id: "5d7de1e44640b2235c260887",
        title: "התייחסות כבר יותר ארוכה",
        name: "אבירן כץ",
        content:
          "התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה\nהתייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה התייחסות קצת ארוכה",
        createdAt: new Date("2019-09-15"),
        isPinned: false,
        isHidden: false,
        parent: null,
        user: {
          firstName: "אבירן",
          lastName: "כץ",
          userImage: { url: "/uploads/0eaa88562ea74e7781dde7bee2a92c08.jpg" }
        },
        children: []
      }
    ]
  };
  /** @type {import("@vue/test-utils").Wrapper} */
  let wrapper;
  let privilegedUsers = ["5da74a0687c6474bf6838131"];
  let commentsAreLocked = false;
  let mocks = {
    $store: {
      getters: {
        [Getters.SELECTED_PLAN]: plan
      }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(Comments, {
      mocks,
      propsData: { privilegedUsers, commentsAreLocked },
      methods: {
        fetchComments() {
          this.comments = this.mapApiComments(plan.comments);
        }
      },
      vuetify: new Vuetify()
    });
  });
  it("contains new comment button", () => {
    const newCommentButton = wrapper.find("v-btn-stub");
    expect(newCommentButton.text()).toContain("התייחסות חדשה");
    expect(newCommentButton.attributes("disabled")).toBeFalsy();
    wrapper.setProps({ commentsAreLocked: true });
    expect(newCommentButton.attributes("disabled")).toBeTruthy();
  });
  it("displays NewComment component when it should", () => {
    expect(wrapper.find("NewComment-stub").exists()).toBeFalsy();
    wrapper.vm.isCreatingNewComment = true;
    expect(wrapper.find("NewComment-stub").exists()).toBeTruthy();
  });
  it("generates correct root comments", () => {
    expect(wrapper.vm.rootComments).toHaveLength(
      plan.comments.reduce((n, comment) => n + (comment.parent == null), 0)
    );
  });
  it("shortens a long comment", () => {
    for (const comment of wrapper.vm.comments) {
      expect(comment.isFullContentVisible).toBe(
        comment.content.split(" ").length <= 50
      );
    }
  });
  it("has visual indication for a pinned comment", () => {
    expect(wrapper.findAll("v-tooltip-stub").length).toBe(3);
  });
  it("generates single comment components", () => {
    expect(wrapper.findAll("Comment-stub")).toHaveLength(
      wrapper.vm.rootComments.length +
        wrapper.vm.rootComments.reduce(
          (sum, comment) => sum + comment.children.length,
          0
        )
    );
  });
});
