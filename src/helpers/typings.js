/**
 *  @typedef NavItem
 *  @property {string} icon
 *  @property {string} text
 *  @property {string} to
 *  @property {Function} visible
 *  @property {Function} click
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

/**
 * @typedef CommentModel
 * @property {string} id
 * @property {string} title
 * @property {string} name
 * @property {Date} createdAt
 * @property {string} content
 * @property {import("../../graphql/types").UsersPermissionsUser} user
 * @property {CommentModel} children
 * @property {string} visibleContent
 * @property {boolean} isFullContentVisible
 */

export {};
