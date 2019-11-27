import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { ActionTypes, Getters, authEndpoint } from "../helpers/constants";
import { dateTimeRevive, makeGqlRequest } from "../helpers/functions";
import {
  getMeetings,
  getMeeting,
  getPlan,
  getCommitteeMeetings,
  getUserSubscriptions,
  getAllCommittees,
  findUser
} from "../helpers/queries.js";
import { updateMe, updateMyPlan } from "../helpers/mutations.js";

Vue.use(Vuex);

const storeOptions = {
  state: {
    /**@type {import("../../graphql/types").Committee[]} */
    committees: [],
    /**@type {import("../../graphql/types").Meeting[]} */
    upcomingMeetigs: [],
    /**@type {import("../../graphql/types").Meeting} */
    selectedMeeting: null,
    plans: [],
    selectedPlan: null,
    jwt: "",
    /**@type {import("../../graphql/types").UsersPermissionsUser} */
    user: null,
    /** @type {import("../../graphql/types").Meeting[]} */
    managableMeetings: [],
    isLoading: false
  },
  mutations: {
    /**
     * Sets the current committees by the given ones
     * @param {any} state The current state
     * @param {import("../../graphql/types").Committee[]} committees
     */
    setCommittees(state, committees) {
      state.committees = committees;
    },
    /**
     * Sets the current user by the given user
     * @param {any} state The current state
     * @param {import("../../graphql/types").UsersPermissionsUser} user
     */
    setUser(state, user) {
      state.user = user;
    },
    /**
     * Sets the upcoming meetings in state by given meeting array
     * @param {any} state The current state
     * @param {import("../../graphql/types").Meeting[]} payload Meetings to set as upcoming meetings
     */
    setUpcomingMeetings(state, payload) {
      state.upcomingMeetigs = payload;
    },
    /**
     * Sets the selected meeting in state by a given meeting
     * @param {any} state The current state
     * @param {import("../../graphql/types").Meeting} meeting Meeting to set as the selected meeting
     */
    setSelectedMeeting(state, meeting) {
      const meetingIndexInState = state.upcomingMeetigs.findIndex(
        m => m.id == meeting.id
      );
      if (meeting.date > new Date()) {
        if (meetingIndexInState == -1) {
          state.upcomingMeetigs.push(meeting);
        } else {
          state.upcomingMeetigs[meetingIndexInState] = meeting;
        }
      }
      state.selectedMeeting = meeting;
    },
    /**
     * Sets the selected plan in state by a given plan
     * @param {any} state The current state
     * @param {import("../../graphql/types").Plan} plan Plan to set as the selected plan
     */
    setSelectedPlan(state, plan) {
      const planIndexInState = state.plans.findIndex(p => p.sid == plan.sid);
      if (planIndexInState == -1) {
        state.plans.push(plan);
      } else {
        state.plans[planIndexInState] = plan;
      }
      state.selectedPlan = plan;
    },
    setJwt(state, jwt) {
      state.jwt = jwt;
    },
    setManagableMeetings(state, meetings) {
      state.managableMeetings = meetings;
    },
    setLoading(state, value) {
      state.isLoading = value;
    }
  },
  getters: {
    committees(state) {
      return state.committees;
    },
    upcomingMeetings(state) {
      return state.upcomingMeetigs;
    },
    selectedMeeting(state) {
      return state.selectedMeeting;
    },
    selectedPlan(state) {
      return state.selectedPlan;
    },
    jwt(state) {
      return state.jwt;
    },
    [Getters.USER](state) {
      return state.user;
    },
    managableMeetings(state) {
      return state.managableMeetings;
    },
    isLoading(state) {
      return state.isLoading;
    }
  },
  actions: {
    /**
     * Fetches all committees
     * @param {import("vuex").Store} context the store object
     */
    async fetchCommittees(context) {
      const { committees } = await makeGqlRequest(getAllCommittees);
      context.commit(storeOptions.mutations.setCommittees.name, committees);
    },
    /**
     * Fetches upcoming meeting (partial)
     * @param {import("vuex").Store} context The store object
     */
    async fetchUpcomingMeetings(context) {
      let date = new Date();
      date.setHours(0);
      const res = await makeGqlRequest(getMeetings(date));
      let meetings = res.meetings.filter(meeting => meeting.committee);
      context.commit(storeOptions.mutations.setUpcomingMeetings.name, meetings);
    },
    /**
     * Sign ups a user
     * @param {import("../../graphql/types").UsersPermissionsUser} user
     */
    async [ActionTypes.SIGN_UP](context, user) {
      user.username = user.email;
      const res = await fetch(`${authEndpoint}/register`, {
        method: "post",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
      });
      const result = await res.json();
      return !!result.jwt;
    },
    /**
     * Performs sign in
     * @param {import("vuex").Store} context The store object
     * @param {import("../../graphql/types").UsersPermissionsUser} user user to sign in
     */
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
        context.commit(storeOptions.mutations.setJwt.name, result.jwt);
        context.commit(storeOptions.mutations.setUser.name, result.user);
        return { status: true };
      }
      return { status: false, message: result.message };
    },
    /**
     * Signs out the user by removing the user-related data from the store
     */
    [ActionTypes.SIGN_OUT](context) {
      context.commit(storeOptions.mutations.setJwt.name, "");
      context.commit(storeOptions.mutations.setUser.name, null);
      context.commit(storeOptions.mutations.setManagableMeetings.name, []);
    },
    /**
     * Fetches a meeting by its ID
     * @param {import("vuex").Store} context the store object
     * @param {stirng} id ID of meeting to fetch
     */
    async [ActionTypes.FETCH_MEETING](context, id) {
      const { meeting } = await makeGqlRequest(getMeeting(id));
      context.commit(storeOptions.mutations.setSelectedMeeting.name, meeting);
    },
    /**
     * Fetches a plan by its ID
     * @param {import("vuex").Store} context the store object
     * @param {string} id ID of plan to fetch
     */
    async [ActionTypes.FETCH_PLAN](context, id) {
      const { plan } = await makeGqlRequest(getPlan, { id: id });
      context.commit(storeOptions.mutations.setSelectedPlan.name, plan);
    },
    /**
     * Fetches managable meetings
     * @param {import("vuex").Store} context the store object
     */
    async fetchManagableMeetings(context) {
      if (
        !context.state.user ||
        context.state.user.role.name != "Administrator"
      ) {
        return;
      }
      const res = await makeGqlRequest(
        getCommitteeMeetings(
          context.state.user.committees.map(committee => committee.id)
        )
      );
      /** @type {import("../../graphql/types").Meeting[]} */
      const meetings = res.meetings;
      context.commit(
        storeOptions.mutations.setManagableMeetings.name,
        meetings
      );
    },
    /**
     * Refreshes current user
     * @param {import("vuex").Store} context the store object
     */
    async [ActionTypes.REFRESH_USER](context) {
      if (!context.state.user) return;
      const { user } = await makeGqlRequest(
        findUser,
        { id: context.state.user.id },
        context.state.jwt
      );
      context.commit(storeOptions.mutations.setUser.name, user);
    },
    /**
     * Update user
     * @param {import("vuex").Store} context the store object
     * @param {import("../../graphql/types").UsersPermissionsUser} updatedUserFields
     */
    async [ActionTypes.UPDATE_USER](context, updatedUserFields) {
      updatedUserFields.id = context.state.user.id;
      const res = await makeGqlRequest(
        updateMe,
        updatedUserFields,
        context.state.jwt
      );
      context.commit(storeOptions.mutations.setUser.name, res.updateMe.user);
    },
    /**
     * Update plan
     * @param {import("vuex").Store} context the store object
     * @param {import("../../graphql/types").Plan} updatedPlanFields
     */
    async [ActionTypes.UPDATE_PLAN](context, updatedPlanFields) {
      try {
        const res = await makeGqlRequest(
          updateMyPlan,
          updatedPlanFields,
          context.state.jwt
        );
        context.commit(
          storeOptions.mutations.setSelectedPlan.name,
          res.updateMyPlan.plan
        );
        return { status: true };
      } catch (e) {
        return { status: false, message: "שגיאה בשרת" };
      }
    },
    /**
     * Fetches user subscriptions and updates user accordingly
     * @param {import("vuex").Store} context the store object
     */
    async fetchUserSubscriptions(context) {
      const storeUser = context.getters[Getters.USER];
      const result = await makeGqlRequest(
        getUserSubscriptions,
        { id: storeUser.id },
        context.getters.jwt
      );
      context.commit(storeOptions.mutations.setUser.name, {
        ...storeUser,
        subscribedCommittees: result.user.subscribedCommittees
      });
    }
  },
  plugins: [
    createPersistedState({
      key: "open-committee",
      arrayMerger(store, saved) {
        return JSON.parse(JSON.stringify(saved), dateTimeRevive);
      }
    })
  ]
};

export default new Vuex.Store(storeOptions);
