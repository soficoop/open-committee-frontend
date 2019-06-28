import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { request } from "graphql-request";
import { MutationTypes, ActionTypes } from "./constants";

Vue.use(Vuex);

const apiEndpoint =
  process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337/graphql";

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
    async [ActionTypes.FETCH_UPCOMING_MEETINGS](context) {
      const res = await request(
        apiEndpoint,
        `query {
          meetings(where: {date_gt: "${new Date()}"} sort: "date"){
            _id
            sid
            date
            committee {
              sid
            }
            plans {
              _id
              sid
              status
            }
          }
        }`
      );
      for (const meetings of res.meetings) {
        meetings.date = new Date(meetings.date);
      }
      context.commit(MutationTypes.SET_UPCOMING_MEETINGS, res.meetings);
    },
    [ActionTypes.SET_MEETING](context, meeting) {
      context.commit(MutationTypes.SET_SELECTED_MEETING, meeting);
    }
  },
  plugins: [createPersistedState()]
});
