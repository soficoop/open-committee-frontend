import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { authEndpoint } from "../helpers/constants";
import { dateTimeRevive, makeGqlRequest } from "../helpers/functions";
import {
  getMeetings,
  getMeeting,
  getPlan,
  getCommitteeMeetings,
  getUserSubscriptions,
  getAllCommittees,
  getAllMunicipalities,
  findUser,
  getAllTags
} from "../helpers/queries.js";
import {
  updateMe,
  updateMyPlan,
  tokenSignIn,
  tagPlan
} from "../helpers/mutations.js";

Vue.use(Vuex);

const storeOptions = {
  /**@type {import("../helpers/typings").StoreState} */
  state: {
    /**@type {import("../../graphql/types").Committee[]} */
    committees: [],
    isLoading: false,
    isLoginVisible: false,
    jwt: "",
    lastPath: "",
    /** @type {import("../../graphql/types").Meeting[]} */
    managableMeetings: [],
    /** @type {import("../../graphql/types").Municipality[]} */
    municipalities: [],
    plans: [],
    /**@type {import("../../graphql/types").Meeting} */
    selectedMeeting: null,
    selectedPlan: null,
    /** @type {import("../../graphql/types").Tag[]} */
    tags: [],
    /**@type {import("../../graphql/types").Meeting[]} */
    upcomingMeetigs: [],
    /**@type {import("../../graphql/types").UsersPermissionsUser} */
    user: null
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
     * Sets the visibility of the login dialog
     * @param {import("../helpers/typings").StoreState} state
     * @param {boolean} value
     */
    setLoginDialog(state, value) {
      state.isLoginVisible = value;
    },
    /**
     * Sets the current municipalities by the given ones
     * @param {import("../helpers/typings").StoreState} state
     * @param {import("../../graphql/types").Municipality[]} municipalities
     */
    setMunicipalities(state, municipalities) {
      state.municipalities = municipalities;
    },
    /**
     * Sets the current tags by the given ones
     * @param {import("../helpers/typings").StoreState} state
     * @param {import("../../graphql/types").Tag[]} tags
     */
    setTags(state, tags) {
      state.tags = tags;
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
    setLastPath(state, lastPath) {
      state.lastPath = lastPath;
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
    isLoading(state) {
      return state.isLoading;
    },
    isLoginVisible(state) {
      return state.isLoginVisible;
    },
    jwt(state) {
      return state.jwt;
    },
    lastPath(state) {
      return state.lastPath;
    },
    managableMeetings(state) {
      return state.managableMeetings;
    },
    municipalities(state) {
      return state.municipalities;
    },
    selectedMeeting(state) {
      return state.selectedMeeting;
    },
    selectedPlan(state) {
      return state.selectedPlan;
    },
    tags(state) {
      return state.tags;
    },
    upcomingMeetings(state) {
      return state.upcomingMeetigs;
    },
    user(state) {
      return state.user;
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
     * Fetches all municipalities
     * @param {import("vuex").Store<import("../helpers/typings").StoreState>} context
     */
    async fetchMunicipalities(context) {
      const { municipalities } = await makeGqlRequest(getAllMunicipalities);
      context.commit(
        storeOptions.mutations.setMunicipalities.name,
        municipalities
      );
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
     * Fetches all tags
     * @param {import("vuex").Store<import("../helpers/typings").StoreState>} context
     */
    async fetchTags(context) {
      const { tags } = await makeGqlRequest(getAllTags);
      context.commit(storeOptions.mutations.setTags.name, tags);
    },
    /**
     * Sign ups a user
     * @param {import("../../graphql/types").UsersPermissionsUser} user
     */
    async signUp(context, user) {
      user.username = user.email;
      const res = await fetch(`${authEndpoint}/local/register`, {
        method: "post",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
      });
      const result = await res.json();
      return !!result.user;
    },
    /**
     * Performs sign in
     * @param {import("vuex").Store} context The store object
     * @param {import("../../graphql/types").UsersPermissionsUser} user user to sign in
     */
    async signIn(context, user) {
      const res = await fetch(`${authEndpoint}/local`, {
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
    signOut(context) {
      context.commit(storeOptions.mutations.setJwt.name, "");
      context.commit(storeOptions.mutations.setUser.name, null);
      context.commit(storeOptions.mutations.setManagableMeetings.name, []);
    },
    /**
     * Fetches a meeting by its ID
     * @param {import("vuex").Store} context the store object
     * @param {stirng} id ID of meeting to fetch
     */
    async fetchMeeting(context, id) {
      const { meeting } = await makeGqlRequest(getMeeting(id));
      context.commit(storeOptions.mutations.setSelectedMeeting.name, meeting);
    },
    /**
     * Fetches a plan by its ID
     * @param {import("vuex").Store} context the store object
     * @param {string} id ID of plan to fetch
     */
    async fetchPlan(context, id) {
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
        context.commit(storeOptions.mutations.setManagableMeetings.name, []);
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
     * @param {string} token a refresh token (optional)
     */
    async refreshUser(context, token) {
      let id = context.state.user && context.state.user.id;
      if (token) {
        context.commit(storeOptions.mutations.setJwt.name, token);
        const result = await makeGqlRequest(tokenSignIn, { token });
        id = result.tokenSignIn.user.id;
      }
      if (!id) return;
      const { user } = await makeGqlRequest(
        findUser,
        { id },
        context.state.jwt
      );
      context.commit(storeOptions.mutations.setUser.name, user);
      await context.dispatch(storeOptions.actions.fetchManagableMeetings.name);
    },
    /**
     * adds multiple tags to the selected plan (in the store state)
     * @param {import("vuex").Store<import("../helpers/typings").StoreState>} context the store object
     * @param {string[]} tags tags to add
     */
    async tagSelectedPlan(context, tags) {
      const selectedPlan = context.state.selectedPlan;
      if (!selectedPlan || !selectedPlan.id) {
        return;
      }
      try {
        const res = await makeGqlRequest(
          tagPlan,
          {
            planId: selectedPlan.id,
            tags
          },
          context.state.jwt
        );
        context.commit(storeOptions.mutations.setSelectedPlan.name, {
          ...selectedPlan,
          ...res.tagPlan.plan
        });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    /**
     * Update user
     * @param {import("vuex").Store} context the store object
     * @param {import("../../graphql/types").EditUserInput} updatedUserFields
     */
    async updateUser(context, updatedUserFields) {
      const res = await makeGqlRequest(
        updateMe,
        {
          id: context.state.user.id,
          data: updatedUserFields
        },
        context.state.jwt
      );
      context.commit(storeOptions.mutations.setUser.name, res.updateMe.user);
    },
    /**
     * Update plan
     * @param {import("vuex").Store} context the store object
     * @param {import("../../graphql/types").Plan} updatedPlanFields
     */
    async updatePlan(context, updatedPlanFields) {
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
      const storeUser = context.getters.user;
      if (!storeUser) {
        return;
      }
      const result = await makeGqlRequest(
        getUserSubscriptions,
        { id: storeUser.id },
        context.getters.jwt
      );
      context.commit(storeOptions.mutations.setUser.name, {
        ...storeUser,
        subscribedCommittees: result.user.subscribedCommittees,
        subscribedLocations: result.user.subscribedLocations,
        subscribedMunicipalities: result.user.subscribedMunicipalities,
        subscribedTags: result.user.subscribedTags
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
