import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/querys/getUserById"

export const useGetUserById = (id?: string|number) => {
    if (!id) throw new Error("ID WAS NOT PROVIDED", {
        cause: "id is required."
    })
    return useQuery(GET_USER, {
        variables: { id },
        onError: (error) => console.error(error)
    })
}