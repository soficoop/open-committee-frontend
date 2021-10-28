import Vue from "vue";
import Router from "vue-router";
import { authEndpoint } from "../helpers/constants";
import LandingPage from "../views/LandingPage.vue";
const About = () => import("../views/About.vue");
const Login = () => import("../views/Login.vue");
const Meeting = () => import("../views/Meeting.vue");
const Plan = () => import("../views/Plan.vue");
const Manage = () => import("../views/Manage.vue");
const ManageMeeting = () => import("../views/ManageMeeting.vue");
const User = () => import("../views/User.vue");
const Subscriptions = () => import("../views/Subscriptions.vue");
const ResetPassword = () => import("../views/ResetPassword.vue");
const Contact = () => import("../views/Contact.vue");
const Search = () => import("../views/Search.vue");
const Terms = () => import("../views/Terms.vue");
const PrivacyPolicy = () => import("../views/PrivacyPolicy.vue");
const Unsubscribe = () => import("../views/Unsubscribe.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/meeting/:meetingId",
      name: "meeting",
      component: Meeting,
    },
    {
      path: "/plan/:planId",
      name: "plan",
      component: Plan,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      children: [
        { path: "user-is-confirmed" },
        {
          path: ":providerName",
          async beforeEnter(to, from, next) {
            const res = await fetch(
              `${authEndpoint}/${to.params.providerName}/callback${window.location.search}`
            );
            const json = await res.json();
            next({ path: "/", query: { token: json.jwt } });
          },
        },
      ],
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage,
    },
    {
      path: "/manage/meeting/new",
      component: ManageMeeting,
    },
    {
      path: "/manage/meeting/:id",
      component: ManageMeeting,
    },
    {
      path: "/user",
      name: "user",
      component: User,
    },
    {
      path: "/user/me",
      component: User,
    },
    {
      path: "/subscriptions",
      component: Subscriptions,
    },
    {
      path: "/reset-password/:code",
      component: ResetPassword,
    },
    {
      path: "/contact",
      component: Contact,
    },
    {
      path: "/search",
      component: Search,
    },
    {
      path: "/terms",
      component: Terms,
    },
    {
      path: "/privacy-policy",
      component: PrivacyPolicy,
    },
    {
      path: "/unsubscribe",
      component: Unsubscribe,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
