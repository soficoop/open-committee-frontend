/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex, { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { request } from "graphql-request";
import { MutationTypes, ActionTypes } from "./helpers/constants";
import { dateTimeRevive } from "./helpers/functions";
import { getMeetings, getMeeting, getPlan } from "./helpers/queries.js";
/* eslint-enable no-unused-vars */

Vue.use(Vuex);

const apiEndpoint =
  process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337/graphql";

/** @type {Store<{upcomingMeetigs: any[], selectedMeeting: any}>} */
export default new Vuex.Store({
  state: {
    upcomingMeetigs: [],
    selectedMeeting: null,
    plans: [],
    selectedPlan: null
  },
  mutations: {
    [MutationTypes.SET_UPCOMING_MEETINGS](state, payload) {
      state.upcomingMeetigs = payload;
    },
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
