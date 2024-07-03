import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/root';

export const httpLink = createHttpLink({
  uri: "https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
