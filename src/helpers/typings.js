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
 * @property {{name:string}} role
 * @property {string[]} committees
 */

/**
 * @typedef Plan
 * @property {string} id
 * @property {Date} lastUpdate
 * @property {Meeting[]} meetings
 * @property {string} name
 * @property {string} number
 * @property {string} sid
 * @property {string} status
 */

/**
 * @typedef MeetingCard
 * @property {string} headline
 * @property {string} id
 * @property {Date} date
 */

/**
 * @typedef AgendaCard
 * @property {string} id
 * @property {string} headline
 * @property {string} description
 * @property {KeyValuePair[]} bullets
 * @property {Function} click
 */

/**
 * @typedef KeyValuePair
 * @property {string} key
 * @property {string} value
 */

/**
 * @typedef NewSubjectModel
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {File[]} attachedFiles
 */

export {};
