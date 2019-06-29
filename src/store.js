/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex, { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { request } from "graphql-request";
import { MutationTypes, ActionTypes } from "./helpers/constants";
import { dateTimeRevive } from "./helpers/functions";
/* eslint-enable no-unused-vars */

Vue.use(Vuex);

const apiEndpoint =
  process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337/graphql";

/** @type {Store<{upcomingMeetigs: any[], selectedMeeting: any}>} */
export default new Vuex.Store({
  state: { upcomingMeetigs: [], selectedMeeting: null },
  mutations: {
    [MutationTypes.SET_UPCOMING_MEETINGS](state, payload) {
      state.upcomingMeetigs = payload;
    },
    [MutationTypes.SET_SELECTED_MEETING](state, payload) {
      state.selectedMeeting = payload;
    }
  },
  getters: {
    upcomingMeetings(state) {
      return state.upcomingMeetigs;
    },
    selectedMeeting(state) {
      return state.selectedMeeting;
    }
  },
  actions: {
    /**
     * Fetches upcoming meeting (partial)
     * @param {Store} context The store object
     */
    async [ActionTypes.FETCH_UPCOMING_MEETINGS](context) {
      const res = await request(
        apiEndpoint,
        `query {
          meetings(where: {date_gt: "${new Date()}"} sort: "date"){
            id
            date
            committee {
              sid
            }
          }
        }`
      );
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
      const res = await request(
        apiEndpoint,
        `query {
          meeting(id: "${id}"){
            id
            sid
            number
            date
            committee {
              sid
              parent {
                sid
              }
              meetings {
                id
                date
                number
              }
            }
            plans {
              id
              name
              number
              status
              lastUpdate
              location
            }
          }
        }`
      );
      let meeting = JSON.parse(JSON.stringify(res.meeting), dateTimeRevive);
      const meetingIndexInState = this.state.upcomingMeetigs.findIndex(
        m => m.sid == meeting.sid
      );
      if (meetingIndexInState == -1) {
        this.state.upcomingMeetigs.push(meeting);
      } else {
        this.state.upcomingMeetigs[meetingIndexInState] = meeting;
      }
      context.commit(MutationTypes.SET_SELECTED_MEETING, meeting);
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
