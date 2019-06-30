/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex, { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { request } from "graphql-request";
import { MutationTypes, ActionTypes } from "../helpers/constants";
import { dateTimeRevive } from "../helpers/functions";
import { getMeetings, getMeeting, getPlan } from "../helpers/queries.js";
import { createUser } from "../helpers/mutations";
/* eslint-enable no-unused-vars */

Vue.use(Vuex);

const apiEndpoint =
  process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337/graphql";

export default new Vuex.Store({
  state: {
    /**@type {import("../helpers/typings").Meeting[]} */
    upcomingMeetigs: [],
    /**@type {import("../helpers/typings").Meeting} */
    selectedMeeting: null,
    plans: [],
    selectedPlan: null
  },
  mutations: {
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
    }
  },
  getters: {
    upcomingMeetings(state) {
      return state.upcomingMeetigs;
    },
    selectedMeeting(state) {
      return state.selectedMeeting;
    },
    selectedPlan(state) {
      return state.selectedPlan;
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
      const res = await request(apiEndpoint, getMeetings, { date: date });
      let meetings = JSON.parse(JSON.stringify(res.meetings), dateTimeRevive);
      context.commit(MutationTypes.SET_UPCOMING_MEETINGS, meetings);
    },
    [ActionTypes.SET_MEETING](context, meeting) {
      context.commit(MutationTypes.SET_SELECTED_MEETING, meeting);
    },
    /**
     * Fetches a meeting by its ID
     * @param {Store} context the store object
     * @param {stirng} id ID of meeting to fetch
     */
    async [ActionTypes.FETCH_MEETING](context, id) {
      const res = await request(apiEndpoint, getMeeting, { id: id });
      let meeting = JSON.parse(JSON.stringify(res.meeting), dateTimeRevive);
      context.commit(MutationTypes.SET_SELECTED_MEETING, meeting);
    },
    /**
     * Fetches a plan by its ID
     * @param {Store} context the store object
     * @param {stirng} id ID of plan to fetch
     */
    async [ActionTypes.FETCH_PLAN](context, id) {
      const res = await request(apiEndpoint, getPlan, { id: id });
      let plan = JSON.parse(JSON.stringify(res.plan), dateTimeRevive);
      context.commit(MutationTypes.SET_SELECTED_PLAN, plan);
    },
    /**
     * Creates a new user
     * @param {Store} context The store object
     * @param {import("../helpers/typings").User} user User object for user which is going to be created
     */
    async [ActionTypes.CREATE_USER](context, user) {
      const res = await request(apiEndpoint, createUser, {
        email: user.email,
        password: user.password
      });
      if (res.data.createUser.user == null) {
        return res;
      }
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
