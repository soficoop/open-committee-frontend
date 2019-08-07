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
  $description: String
  $files: [ID]
  $update: DateTime
) {
  createPlan(
    input: {
      data: {
        name: $title
        type: "נושא"
        addedManually: true
        sections: $description
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

export const updateMeeting = `mutation udpateMeeting(
  $id: ID!
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
  updateMeeting(
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
        addedManually: true
      }
    }
  ) {
    meeting {
      id
    }
  }
}`;
