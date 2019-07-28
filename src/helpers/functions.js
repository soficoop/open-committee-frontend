import request from "graphql-request";
import { graphqlEndpoint } from "./constants";

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
 */
export async function makeGqlRequest(query, variables) {
  const res = await request(graphqlEndpoint, query, variables);
  return JSON.parse(JSON.stringify(res), dateTimeRevive);
}
