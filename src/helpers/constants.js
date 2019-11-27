export const ActionTypes = Object.freeze({
  FETCH_MEETING: "FETCH_MEETING",
  FETCH_PLAN: "FETCH_PLAN",
  REFRESH_USER: "REFRESH_USER",
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_PLAN: "UPDATE_PLAN"
});
export const Getters = Object.freeze({
  USER: "USER"
});

export const apiEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}` || "http://localhost:1337";

export const filesEndpoint = process.env.VUE_APP_FILES_ENDPOINT || "";

export const graphqlEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/graphql` ||
  "http://localhost:1337/graphql";

export const authEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/auth/local` ||
  "http://localhost:1337/auth/local";

export const uploadEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/upload` ||
  "http://localhost:1337/upload";

export const forgotPasswordEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/auth/forgot-password` ||
  "http://localhost:1337/auth/forgot-password";

export const resetPasswordEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/auth/reset-password` ||
  "http://localhost:1337/auth/reset-password";
