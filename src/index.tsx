import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql",
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
)

reportWebVitals()
