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
 * @property {boolean} isEditable
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

/**
 * @typedef ResetPasswordData
 * @property {string} code
 * @property {string} password
 * @property {string} passwordConfirmation
 */

/**
 * @typedef StoreState
 * @property {import("../../graphql/types").Committee[]} committees
 * @property {boolean} isLoading
 * @property {strign} jwt
 * @property {import("../../graphql/types").Meeting[]} managableMeetings
 * @property {import("../../graphql/types").Municipality[]} municipalities
 * @property {import("../../graphql/types").Plan[]} plans
 * @property {import("../../graphql/types").Meeting | null} selectedMeeting
 * @property {import("../../graphql/types").Plan | null} selectedPlan
 * @property {import("../../graphql/types").Tag[]} tags
 * @property {import("../../graphql/types").Meeting[]} upcomingMeetigs
 * @property {import("../../graphql/types").UsersPermissionsUser | null} user
 */

export {};
