import { gql, useQuery } from "@apollo/client";
import { PageInput } from "../types/pagination";

const FETCH_USERS = gql(`
    query GetUsers($data: PageInput) {
        users(data: $data) {
            nodes {
              id
              name
              email
            }
        }
    }
`)

export const useGetUsers = (data?: PageInput) => {
    return useQuery(FETCH_USERS, {
        variables: { data },
        onError: (error) => console.error(error)
    })
}