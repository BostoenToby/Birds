import gql from 'graphql-tag'

export const CREATE_USER = gql`
  mutation CreateUser($uid: String!) {
    createUser(createUserInput: { uid: $uid }) {
      id
      uid
      observations {
        id
        title
        description
        creadetAt
        updatedAt
      }
      observationsCount
      createdAt
      updatedAt
    }
  }
`
