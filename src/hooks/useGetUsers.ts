import { gql, useQuery } from "@apollo/client";

const FETCH_USERS = gql(`
    query GetUsers($data: PageInput) {
        users(data: $data) {
            nodes {
              id
              name
              phone
              birthDate
              email
              role
            }
        }
    }
`)

export const useGetUsers = () => {
    return useQuery(FETCH_USERS, {
        onError: (error) => console.log(error)
    })
}