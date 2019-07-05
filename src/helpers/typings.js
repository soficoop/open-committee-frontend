/**
 * @typedef Meeting
 * @property {string} id
 * @property {string} sid
 * @property {Committee} committee
 * @property {Date} date
 * @property {number} number
 * @property {Plan[]} plans
 */

/**
 * @typedef Committee
 * @property {string} id
 * @property {string} sid
 * @property {Meeting[]} meetings
 */

/**
 * @typedef User
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} organization
 * @property {string} job
 * @property {string} city
 */

/**
 * @typedef Plan
 * @property {string} id
 * @property {string} sid
 * @property {Meeting[]} meetings
 */
export {};
