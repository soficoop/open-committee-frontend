export const apiEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}` || "http://localhost:1337";

export const filesEndpoint = process.env.VUE_APP_FILES_ENDPOINT || "";
export const isOrganizationMode =
  process.env.VUE_APP_ORGANIZATION_MODE === "true";

export const graphqlEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/graphql` ||
  "http://localhost:1337/graphql";

export const authEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/auth` || "http://localhost:1337/auth";

export const uploadEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/upload` ||
  "http://localhost:1337/upload";

export const forgotPasswordEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/auth/forgot-password` ||
  "http://localhost:1337/auth/forgot-password";

export const resetPasswordEndpoint =
  `${process.env.VUE_APP_API_ENDPOINT}/auth/reset-password` ||
  "http://localhost:1337/auth/reset-password";
