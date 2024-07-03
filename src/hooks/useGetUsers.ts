import { useQuery } from '@apollo/client';
import { PageInput } from '../types/pagination';
import { FETCH_USERS } from '../graphql/query/getUsers';

export const useGetUsers = (data?: PageInput) => {
  return useQuery(FETCH_USERS, {
    variables: { data },
    onError: (error) => console.error(error),
  });
};
