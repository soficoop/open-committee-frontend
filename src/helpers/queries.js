/**
 * Gets meetings with date greater than given date
 * @param {Date} date meetings start date
 * @returns {string} getMeetings query
 */
export function getMeetings(date) {
  return `query getMeetings{
  meetings(where: {date_gt: "${date.toISOString()}", isHidden_ne: true} sort: "date"){
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
        meetings(sort: "date:desc" where: {id_ne: "${id}", isHidden_ne: true}) {
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
          ext
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
        ext
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
        ext
        url
          }
      additionalFiles {
        id
        name
        ext
        url
      }
    }
  }`;
}

export const getPlan = `query getPlan($id: ID!) {
  plan(id: $id) {
    id
    sid
    stype
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
    commentsAreLocked
    tags {
      name
      id
    }
    meetings(where: { isHidden_ne: true }) {
      id
      date
      number
      committee {
        sid
        id
        users {
          id
        }
      }
    }
    attachedFiles {
      id
      ext
      name
      url
      size
    }
  }
}`;

export function getCommentsByPlan(id) {
  return `query getCommentsByPlan {
    comments(
      where: { plan_eq: "${id}", isHidden_ne: true }
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
        organization
        userImage {
          url
        }
      }
      files {
        ext
        name
        url
      }
      children(where: { isHidden_ne: true }) {
        id
        title
        name
        content
        isHidden
        createdAt
        files {
          ext
          name
          url
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
      }
    }
  }`;
}

export function getCommitteeMeetings(committeeIds) {
  return `query getCommitteeMeetings {
    meetings(where: { committee_in: ${JSON.stringify(
      committeeIds
    )}, isHidden_ne: true}) {
      id
      number
      addedManually
      date
      isHidden
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
    subscribedTags {
      id
      name
    }
    subscribedMunicipalities {
      id
      sid
    }
    subscribedLocations {
      id
      name
      lat
      lng
      radius
    }
  }
}`;

export const getAllCommittees = `query committees {
  committees(where: {isHidden_ne: true}) {
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

export const getAllTags = `query tags {
  tags {
    id
    name
  }
}`;

export const getAllMunicipalities = `query municipalities {
  municipalities(
    where: { isHidden_ne: true }
  ) {
    id
    sid
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
