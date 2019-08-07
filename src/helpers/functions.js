import { GraphQLClient } from "graphql-request";
import { graphqlEndpoint, uploadEndpoint } from "./constants";

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
 * @param {string} jwt the json web token (https://strapi.io/documentation/3.0.0-beta.x/guides/authentication.html#token-usage)
 * @returns {import("../../graphql/types").UploadFile}
 */
export async function uploadFile(file, jwt) {
  const body = new FormData();
  body.append("files", file);
  const res = await fetch(uploadEndpoint, {
    method: "post",
    body: body,
    headers: { Authorization: `Bearer ${jwt}` }
  });
  return (await res.json())[0];
}
