import { gql } from '@apollo/client';

export const FETCH_USERS = gql(`
    query GetUsers($data: PageInput) {
        users(data: $data) {
            nodes {
              id
              name
              email
            }
        }
    }
`);
