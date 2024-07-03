import { useQuery } from '@apollo/client';
import { PageInput } from '../types/pagination';
import { FETCH_USERS } from '../graphql/query/getUsers';
import { useQuery } from '@apollo/client';
import { PageInput } from '../types/pagination';
import { FETCH_USERS } from '../graphql/query/getUsers';

export const useGetUsers = (data?: PageInput) => {
  if (!data)
    throw new Error('DATA WAS NOT PROVIDED', {
      cause: 'data is required. data should have a type of PageInput',
    });
  return useQuery(FETCH_USERS, {
    variables: { data },
    onError: (error) => console.error(error),
  });
};
