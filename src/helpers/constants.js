export const MutationTypes = Object.freeze({
  SET_UPCOMING_MEETINGS: "SET_UPCOMING_MEETINGS",
  SET_SELECTED_MEETING: "SET_SELECTED_MEETING",
  SET_SELECTED_PLAN: "SET_SELECTED_PLAN",
  SET_JWT: "SET_JWT",
  SET_USER: "SET_USER",
  SET_MANAGABLE_MEETINGS: "SET_MANAGABLE_MEETINGS"
});
export const ActionTypes = Object.freeze({
  FETCH_UPCOMING_MEETINGS: "FETCH_UPCOMING_MEETINGS",
  SET_MEETING: "SET_MEETING",
  FETCH_MEETING: "FETCH_MEETING",
  FETCH_MANAGABLE_MEETINGS: "FETCH_MANAGABLE_MEETINGS",
  FETCH_PLAN: "FETCH_PLAN",
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  UPDATE_USER: "UPDATE_USER"
});
export const Getters = Object.freeze({
  MANAGABLE_MEETINGS: "MANAGABLE_MEETINGS",
  UPCOMING_MEETINGS: "UPCOMING_MEETINGS",
  SELECTED_MEETING: "SELECTED_MEETING",
  SELECTED_PLAN: "SELECTED_PLAN",
  JWT: "JWT",
  USER: "USER"
});

export const apiEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}` || "http://localhost:1337";

export const graphqlEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/graphql` ||
  "http://localhost:1337/graphql";

export const authEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/auth/local` ||
  "http://localhost:1337/auth/local";

export const uploadEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/upload` ||
  "http://localhost:1337/upload";
