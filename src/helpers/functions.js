import { GraphQLClient } from "graphql-request";
import {
  graphqlEndpoint,
  uploadEndpoint,
  forgotPasswordEndpoint,
  resetPasswordEndpoint
} from "./constants";

export function dateTimeRevive(key, value) {
  var isDate;
  if (typeof value === "string") {
    isDate = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/.exec(
      value
    );
    if (isDate) {
      return new Date(value);
    }
  }
  return value;
}

/**
 * makes a graphQL request to the graphQL endpoint
 * @param {string} query the graphQL query
 * @param {any} variables query variables
 * @param {string} jwt current JWT
 */
export async function makeGqlRequest(query, variables, jwt) {
  const graphqlClient = new GraphQLClient(graphqlEndpoint);
  if (jwt) {
    graphqlClient.setHeader("Authorization", `Bearer ${jwt}`);
  }
  const res = await graphqlClient.request(query, variables);
  return JSON.parse(JSON.stringify(res), dateTimeRevive);
}

/**
 * Uploads a file to strapi
 * @param {File} file File to upload
 * @returns {import("../../graphql/types").UploadFile}
 */
export async function uploadFile(file) {
  const body = new FormData();
  body.append("files", file);
  const res = await fetch(uploadEndpoint, {
    method: "post",
    body: body
  });
  return (await res.json())[0];
}

/**
 * Uploads an user image to strapi
 * @param {File} file File to upload
 * @param {string} jwt the json web token (https://strapi.io/documentation/3.0.0-beta.x/guides/authentication.html#token-usage)
 * @returns {import("../../graphql/types").UploadFile}
 */
export async function uploadUserImage(file, jwt, userId) {
  const body = new FormData();
  body.append("files", file);
  body.append("refId", userId);
  body.append("ref", "user");
  body.append("source", "users-permissions");
  body.append("field", "userImage");
  const res = await fetch(uploadEndpoint, {
    method: "post",
    body: body,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return (await res.json())[0];
}

/**
 * Sends an email to a user with the link to the reset password page
 * @param {string} userMail user mail
 */
export async function sendForgotenPasswordEmail(userMail) {
  let data = {
    email: userMail
  };
  const res = await fetch(forgotPasswordEndpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  return !!result.ok;
}

/**
 * Reset the user password
 *
 * @param {import("./typings").ResetPasswordData} resetPassworddata
 */
export async function resetPassword(resetPassworddata) {
  let data = {
    code: resetPassworddata.code,
    password: resetPassworddata.password,
    passwordConfirmation: resetPassworddata.passwordConfirmation
  };
  const res = await fetch(resetPasswordEndpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  return !!result.jwt;
}
