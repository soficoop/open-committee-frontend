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
export async function sendForgotPasswordEmail(userMail) {
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

/**
 * Checks whether a given string represents a valid email address
 * @param {string} email a given email string
 * @returns {boolean} true if the email is valid, false otherwise
 */
export function checkIfEmailIsValid(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export async function delayScrollToFocusedElement() {
  return new Promise(resolve =>
    setTimeout(() => {
      document.activeElement.scrollIntoView({
        behavior: "smooth"
      });
      resolve();
    }, 300)
  );
}

export async function debounce(callback, timeout = 500) {
  if (window.debounceTimeoutId) {
    clearTimeout(window.debounceTimeoutId);
  }
  window.debounceTimeoutId = setTimeout(async () => {
    await callback();
  }, timeout);
}

/**
 * Maps comments that returned from the API to CommentModel array
 * @param {import("../../graphql/types").Comment[]} comments API comments
 * @returns {import("../helpers/typings").CommentModel[]}
 */
export function mapApiComments(comments) {
  return (
    comments &&
    comments.map(c => {
      let visibleContent = c.content;
      let isFullContentVisible = true;
      let words = c.content.split(" ");
      if (words.length > 50) {
        visibleContent = words.slice(0, 50).join(" ") + "...";
        isFullContentVisible = false;
      }
      return {
        ...c,
        isFullContentVisible,
        visibleContent,
        children: mapApiComments(c.children)
      };
    })
  );
}
