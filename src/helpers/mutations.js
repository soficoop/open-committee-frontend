export const createUser = `mutation createUser($email: String!, $password: String!) {
  createUser(
    input: { data: { username: $email, email: $email, password: $password } }
  ) {
    user {
      id
    }
  }
}`;
