import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/root';

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql",
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</React.StrictMode>
)
