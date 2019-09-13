import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Comments from "@/components/Comments.vue";
import { Getters, apiEndpoint } from "@/helpers/constants";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Comments.vue", () => {
  let plan = {
    id: "5d417e0e250469572551dca1",
    comments: [
      {
        id: "5d6cbd43c75c1f41ebd3b1ab",
        title: "תגובה ראשונה",
        name: "Sofia Sofi",
        content: "ראשונה",
        createdAt: new Date("Mon Sep 02 2019"),
        parent: null,
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
            user: {
              firstName: "Sofia",
              lastName: "Sofi",
              userImage: {
                url: "/uploads/6eaca8c4605e4c00aab10ee56b518806.jpg"
              }
            }
          },
          {
            id: "5d6cc4e3c75c1f41ebd3b1af",
            title: "אהלן",
            name: "Sofia Sofi",
            content: "שלום",
            createdAt: new Date("Mon Sep 02 2019"),
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
        title: "תגובה לתגובה ראשונה",
        name: "Sofia Sofi",
        content: "שנייה",
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
        title: "תגובה לראשונה",
        name: "Sofia Sofi",
        content: "היי",
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
        parent: null,
        user: null,
        children: [
          {
            id: "5d6cd103c75c1f41ebd3b1b3",
            title: "לא נכון",
            name: "שונא פלאפל",
            content: "זה ממש גרוע",
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
        [Getters.SELECTED_PLAN]: plan
      }
    }
  };
  beforeEach(() => {
    wrapper = shallowMount(Comments, {
      mocks,
      methods: {
        // mock fetchComments method
        fetchComments() {
          this.comments = plan.comments;
        }
      },
      vuetify: new Vuetify()
    });
  });
  it("contains new comment button", () => {
    expect(wrapper.text()).toContain("התייחסות חדשה");
  });
  it("displays NewComment component when it should", () => {
    expect(wrapper.find("NewComment-stub").exists()).toBeFalsy();
    wrapper.vm.setCommentCreation(true);
    expect(wrapper.find("NewComment-stub").exists()).toBeTruthy();
  });
  it("sets reply dialog to correct comment", () => {
    wrapper.vm.toggleReply(plan.comments[0].id);
    expect(wrapper.vm.isCreatingNewComment).toBeFalsy();
    expect(wrapper.vm.replyingTo).toBe(plan.comments[0].id);
    wrapper.vm.toggleReply(plan.comments[1].id);
    expect(wrapper.vm.isCreatingNewComment).toBeFalsy();
    expect(wrapper.vm.replyingTo).toBe(plan.comments[1].id);
    wrapper.vm.toggleReply(plan.comments[1].id);
    expect(wrapper.vm.isCreatingNewComment).toBeFalsy();
    expect(wrapper.vm.replyingTo).toBe("");
  });
  it("generates correct image URLS", () => {
    for (const comment of plan.comments) {
      if (comment.user != null) {
        expect(wrapper.vm.generateImageUrlFromComment(comment)).toEqual(
          apiEndpoint + comment.user.userImage.url
        );
      } else {
        expect(wrapper.vm.generateImageUrlFromComment(comment)).toEqual(
          "/img/userImage.svg"
        );
      }
    }
  });
  it("generates correct root comments", () => {
    expect(wrapper.vm.rootComments).toHaveLength(6);
  });
  it("displays correct commenters", () => {
    for (const comment of plan.comments) {
      if (comment.user != null) {
        expect(wrapper.vm.getCommenter(comment)).toEqual(
          `${comment.user.firstName} ${comment.user.lastName}`
        );
      } else {
        expect(wrapper.vm.getCommenter(comment)).toEqual(comment.name);
      }
    }
  });
});
