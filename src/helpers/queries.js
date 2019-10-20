/**
 * Gets meetings with date greater than given date
 * @param {Date} date meetings start date
 * @returns {string} getMeetings query
 */
export function getMeetings(date) {
  return `query getMeetings{
  meetings(where: {date_gt: "${date.toISOString()}"} sort: "date"){
    id
    date
    committee {
      sid
    }
  }
}`;
}

/**
 * Gets a single meeting
 * @param {string} id meeting ID
 * @returns {string} getMeeting query
 */
export function getMeeting(id) {
  return `query getMeeting {
    meeting(id: "${id}"){
      id
      sid
      addedManually
      background
      number
      title
      date
      summary
      committee {
        id
        sid
        parent {
          sid
        }
        meetings(sort: "date:desc" where: {_id_ne: "${id}"}) {
          id
          date
          number
          title
        }
      }
      plans {
        id
        addedManually
        attachedFiles {
          id
          name
        }
        type
        name
        number
        status
        lastUpdate
        location
        sections
      }
      protocol {
        id
        name
        url
      }
      transcript {
        id
        name
        url
      }
      decisions {
        id
        name
        url
          }
      additionalFiles {
        id
        name
        url
      }
    }
  }`;
}

export const getPlan = `query getPlan($id: ID!) {
  plan(id: $id){
    id
    sid
    number
    addedManually
    lastUpdate
    location
    status
    sections
    name
    municipality
    settlement
    street
    houseNumber
    targets
    type
    lockComments
    meetings {
      id
      date
      number
      committee {
        sid,
        id,
        users {
          id
        }
      }
    }
    attachedFiles {
      id
      name
      url
      size
    }
    comments {
      id
    }
  }
}`;

export function getCommentsByPlan(id) {
  return `query getCommentsByPlan {
    comments(
      where: { plan_eq: "${id}" }
      sort: "isPinned:desc,createdAt:asc"
    ) {
      id
      title
      name
      content
      createdAt
      isHidden
      isPinned
      parent {
        id
      }
      user {
        firstName
        lastName
        id
        job
        userImage {
          url
        }
      }
      children {
        id
        title
        name
        content
        isHidden
        createdAt
        user {
          firstName
          lastName
          id
          job
          userImage {
            url
          }
        }
      }
    }
  }`;
}

export function getCommitteeMeetings(committeeIds) {
  return `query getCommitteeMeetings {
    meetings(where: { committee_in: ${JSON.stringify(committeeIds)} }) {
      id
      number
      addedManually
      date
      committee {
        id
        sid
      }
    }
  }`;
}

export function getPlans(number) {
  return `query plans {
    plans(where: { number_contains: "${number}" }) {
      id
      number
      name
    }
  }`;
}

export const getCurrentUser = `query($id: ID!) {
  user(id: $id) {
    id
    username
    email 
    provider
    confirmed
    blocked
    role {
      type
    }
    firstName
    lastName
    organization
    job
    userImage {
      url
    }
    city
	}
}
`;

export const getUserSubscriptions = `query getUserSubscriptions($id: ID!) {
  user(id: $id) {
    subscribedCommittees {
      id
      sid
    }
  }
}`;

export const getAllCommittees = `query committees {
  committees {
    id
    sid
    users {
      id
    }
    area {
      id
      sid
    }
  }
}`;

export const findUser = `query findUser($id: ID!) {
  user(id: $id) {
    id
    username
    email
    role {
      name
    }
    firstName
    lastName
    city
    job
    organization
    userImage {
      url
    }
    committees {
      sid
      id
    }
  }
}`;
