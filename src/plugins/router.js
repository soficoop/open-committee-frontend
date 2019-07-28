import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
const About = () => import("../views/About.vue");
const Login = () => import("../views/Login.vue");
const Meeting = () => import("../views/Meeting.vue");
const Plan = () => import("../views/Plan.vue");
const Manage = () => import("../views/Manage.vue");
const NewMeeting = () => import("../views/NewMeeting.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/meeting/:meetingId",
      name: "meeting",
      component: Meeting
    },
    {
      path: "/plan/:planId",
      name: "plan",
      component: Plan
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage
    },
    {
      path: "/manage/meeting/new",
      component: NewMeeting
    }
  ]
});
