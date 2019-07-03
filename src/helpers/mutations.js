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
