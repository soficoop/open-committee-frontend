import Vue from "vue";
import Vuex from "vuex";
import { request } from "graphql-request";

Vue.use(Vuex);

const apiEndpoint =
  process.env.VUE_APP_API_ENDPOINT || "http://localhost:1337/graphql";

export default new Vuex.Store({
  state: { upcomingMeetigs: [] },
  mutations: {
    SET_UPCOMING_MEETINGS(state, payload) {
      state.upcomingMeetigs = payload;
    }
  },
  getters: {
    upcomingMeetings(state) {
      return state.upcomingMeetigs;
    }
  },
  actions: {
    async fetchUpcomingMeetings(context) {
      const res = await request(
        apiEndpoint,
        `query {
          meetings(where: {date_gt: "${new Date()}"}){
            _id
            sid
            date
            committee {
              sid
            }
          }
        }`
      );
      for (const meetings of res.meetings) {
        meetings.date = new Date(meetings.date);
      }
      context.commit("SET_UPCOMING_MEETINGS", res.meetings);
    }
  }
});
