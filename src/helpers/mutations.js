export const createUser = `mutation createUser(
  $email: String!
  $password: String!
  $firstName: String!
  $lastName: String!
  $city: String
  $organization: String
  $job: String
) {
  createUser(
    input: {
      data: {
        username: $email
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        city: $city
        organization: $organization
        job: $job
      }
    }
  ) {
    user {
      id
    }
  }
}`;

export const createMeeting = `mutation createMeeting(
  $committee: ID!
  $date: DateTime!
  $number: Int
  $title: String
  $decisions: ID
  $protocol: ID
  $transcript: ID
  $additionalFiles: [ID]
  $background: String
  $plans: [ID!]!
) {
  createMeeting(
    input: {
      data: {
        background: $background
        committee: $committee
        date: $date
        number: $number
        title: $title
        decisions: $decisions
        protocol: $protocol
        transcript: $transcript
        additionalFiles: $additionalFiles
        plans: $plans
        addedManually: true
        isHidden: false
      }
    }
  ) {
    meeting {
      id
    }
  }
}`;

export const createSubject = `mutation createSubject(
  $title: String!
  $sections: String
  $files: [ID]
  $update: DateTime
) {
  createPlan(
    input: {
      data: {
        name: $title
        type: "נושא"
        addedManually: true
        sections: $sections
        attachedFiles: $files
        lastUpdate: $update
      }
    }
  ) {
    plan {
      id
    }
  }
}`;

export const tagPlan = `mutation tagPlan($planId:ID! $tags: [String!]!) {
  tagPlan(
    planId: $planId
    tags: $tags
  ) {
    plan {
      id
      tags {
        id
        name
      }
    }
  }
}`;

export const updateMyMeeting = `mutation udpateMyMeeting(
  $id: ID!
  $addedManually: Boolean
  $background: String
  $summary: String
  $committee: ID!
  $date: DateTime!
  $number: Int
  $title: String
  $decisions: ID
  $protocol: ID
  $transcript: ID
  $additionalFiles: [ID]
  $plans: [ID!]!
) {
  updateMyMeeting(
    input: {
      where: { id: $id }
      data: {
        background: $background
        committee: $committee
        date: $date
        number: $number
        title: $title
        summary: $summary
        decisions: $decisions
        protocol: $protocol
        transcript: $transcript
        additionalFiles: $additionalFiles
        plans: $plans
        addedManually: $addedManually
      }
    }
  ) {
    meeting {
      id
    }
  }
}`;

export const updateMe = `mutation UpdateMe(
  $id: ID!
  $data: editUserInput!
) {
  updateMe(
    input: {
      where: { id: $id }
      data: $data
    }
  ) {
    user {
      id
      username
      email
      provider
      confirmed
      blocked
      role {
        type
        name
      }
      firstName
      lastName
      organization
      job
      userImage {
        url
      }
      city
      committees {
        id
        sid
      }
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
  }
}`;

export const createComment = `mutation createComment(
  $title: String!
  $name: String!
  $content: String!
  $plan: ID!
  $parent: ID
  $user: ID
  $files: [ID]
) {
  createComment(
    input: {
      data: {
        title: $title
        name: $name
        content: $content
        plan: $plan
        user: $user
        parent: $parent
        isPinned: false
        isHidden: false
        files: $files
      }
    }
  ) {
    comment {
      id
    }
  }
}`;

export const emailMeeting = `mutation emailMeeting($id:ID!) {
  emailMeeting(input:{where:{id:$id}}) {
    meeting {
      id
    }
    recipients {
      email
    }
  }
}`;

export const hideMeeting = `mutation hideMeeting(
  $id: ID!
) {
  updateMyMeeting(
    input: {
      where: { id: $id }
      data: {
        isHidden: true
      }
    }
  ) {
    meeting {
      id 
    }
  }
}`;

export const updateComment = `mutation updateComment(
  $id: ID!
  $isHidden: Boolean
  $isPinned: Boolean
) {
  updateComment(
    input: {
      where: { id: $id }
      data: {
        isHidden: $isHidden
        isPinned: $isPinned
      }
    }
  ) {
    comment {
      id
      isHidden
      isPinned
    }
  }
}`;

export const updateMyPlan = `mutation updateMyPlan(
  $id: ID!
  $title: String
  $commentsAreLocked: Boolean
  $sections: String
  $files: [ID]
  $update: DateTime
) {
  updateMyPlan(
    input: {
      where: { id: $id }
      data: {
        name: $title
        sections: $sections
        attachedFiles: $files
        lastUpdate: $update
        commentsAreLocked: $commentsAreLocked
      }
    }
  ) {
    plan {
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
        name
        url
        size
      }
    }
  }
}`;

export const hideMyComment = `mutation hideMyComment($id: ID!) {
  updateMyComment(input: { where: { id: $id }, data: { isHidden: true } }) {
    comment {
      isHidden
    }
  }
}`;

export const createContactApplication = `mutation createContactApplication(
  $name: String!
  $email: String!
  $message: String!
) {
  createContactApplication(
    input: { data: { name: $name, email: $email, message: $message } }
  ) {
    contactApplication {
      id
      name
      email
      message
    }
  }
}`;

export const tokenSignIn = `mutation tokenSignIn($token: String!) {
  tokenSignIn(token: $token) {
    user {
      id
    }
  }
}`;
