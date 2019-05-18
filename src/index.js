import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
// APOLLO
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import introspectionQueryResultData from './fragmentTypes.json';
// FRAGMENT MATCHER
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});
// APOLLO CLIENT
// const GRAPHQL_ENDPOINT = '//localhost:4000/graphql';
const GRAPHQL_ENDPOINT = 'https://graphql-nodejs-book-api.herokuapp.com/graphql';


const client = new ApolloClient({
    // uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache({ fragmentMatcher }).restore(),
    link: createUploadLink({ uri: GRAPHQL_ENDPOINT })
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
