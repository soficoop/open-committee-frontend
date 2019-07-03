/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex, { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { request } from "graphql-request";
import { MutationTypes, ActionTypes, Getters } from "../helpers/constants";
import { dateTimeRevive } from "../helpers/functions";
import { getMeetings, getMeeting, getPlan } from "../helpers/queries.js";
/* eslint-enable no-unused-vars */

Vue.use(Vuex);

const graphqlEndpoint =
  process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337/graphql";
const authEndpoint = "http://localhost:1337/auth/local";

export default new Vuex.Store({
  state: {
    /**@type {import("../helpers/typings").Meeting[]} */
    upcomingMeetigs: [],
    /**@type {import("../helpers/typings").Meeting} */
    selectedMeeting: null,
    plans: [],
    selectedPlan: null,
    jwt: "",
    /**@type import("../helpers/typings").User */
    user: null
  },
  mutations: {
    /**
     * Sets the current user by the given user
     * @param {import("../helpers/typings").User} user
     */
    [MutationTypes.SET_USER](state, user) {
      state.user = user;
    },
    [MutationTypes.SET_UPCOMING_MEETINGS](state, payload) {
      state.upcomingMeetigs = payload;
    },
    /**
     * Sets the selected meeting in state by a given meeting
     * @param {import("../helpers/typings").Meeting} meeting Meeting to set as the selected meeting
     */
    [MutationTypes.SET_SELECTED_MEETING](state, meeting) {
      const meetingIndexInState = state.upcomingMeetigs.findIndex(
        m => m.id == meeting.id
      );
      if (meetingIndexInState == -1) {
        state.upcomingMeetigs.push(meeting);
      } else {
        state.upcomingMeetigs[meetingIndexInState] = meeting;
      }
      state.selectedMeeting = meeting;
    },
    [MutationTypes.SET_SELECTED_PLAN](state, plan) {
      const planIndexInState = state.plans.findIndex(p => p.sid == plan.sid);
      if (planIndexInState == -1) {
        state.plans.push(plan);
      } else {
        state.plans[planIndexInState] = plan;
      }
      state.selectedPlan = plan;
    },
    [MutationTypes.SET_JWT](state, jwt) {
      state.jwt = jwt;
    }
  },
  getters: {
    [Getters.UPCOMING_MEETINGS](state) {
      return state.upcomingMeetigs;
    },
    [Getters.SELECTED_MEETING](state) {
      return state.selectedMeeting;
    },
    [Getters.SELECTED_PLAN](state) {
      return state.selectedPlan;
    },
    [Getters.JWT](state) {
      return state.jwt;
    }
  },
  actions: {
    /**
     * Fetches upcoming meeting (partial)
     * @param {Store} context The store object
     */
    async [ActionTypes.FETCH_UPCOMING_MEETINGS](context) {
      let date = new Date();
      date.setHours(0);
      const res = await request(graphqlEndpoint, getMeetings, { date: date });
      let meetings = JSON.parse(JSON.stringify(res.meetings), dateTimeRevive);
      context.commit(MutationTypes.SET_UPCOMING_MEETINGS, meetings);
    },
    [ActionTypes.SET_MEETING](context, meeting) {
      context.commit(MutationTypes.SET_SELECTED_MEETING, meeting);
    },
    /**
     * Sign ups a user
     * @param {import("../helpers/typings").User} user
     */
    async [ActionTypes.SIGN_UP](context, user) {
      user.username = user.email;
      const res = await fetch(`${authEndpoint}/register`, {
        method: "post",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
      });
      const result = await res.json();
      if (result.jwt) {
        context.commit(MutationTypes.SET_JWT, result.jwt);
        return true;
      }
      return false;
    },
    async [ActionTypes.SIGN_IN](context, user) {
      const res = await fetch(`${authEndpoint}`, {
        method: "post",
        body: JSON.stringify({
          identifier: user.email,
          password: user.password
        }),
        headers: { "Content-Type": "application/json" }
      });
      const result = await res.json();
      if (result.jwt) {
        context.commit(MutationTypes.SET_JWT, result.jwt);
        return true;
      }
      return false;
    },
    [ActionTypes.SIGN_OUT](context) {
      context.commit(MutationTypes.SET_JWT, "");
      context.commit(MutationTypes.SET_USER, null);
    },
    /**
     * Fetches a meeting by its ID
     * @param {Store} context the store object
     * @param {stirng} id ID of meeting to fetch
     */
    async [ActionTypes.FETCH_MEETING](context, id) {
      const res = await request(graphqlEndpoint, getMeeting, { id: id });
      let meeting = JSON.parse(JSON.stringify(res.meeting), dateTimeRevive);
      context.commit(MutationTypes.SET_SELECTED_MEETING, meeting);
    },
    /**
     * Fetches a plan by its ID
     * @param {Store} context the store object
     * @param {stirng} id ID of plan to fetch
     */
    async [ActionTypes.FETCH_PLAN](context, id) {
      const res = await request(graphqlEndpoint, getPlan, { id: id });
      let plan = JSON.parse(JSON.stringify(res.plan), dateTimeRevive);
      context.commit(MutationTypes.SET_SELECTED_PLAN, plan);
    }
  },
  plugins: [
    createPersistedState({
      arrayMerger(store, saved) {
        return JSON.parse(JSON.stringify(saved), dateTimeRevive);
      }
    })
  ]
});
