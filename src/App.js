import React from 'react';
import { Provider } from 'react-redux';
import store from './common/store/store';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TopicsMaster from './components/TopicsMaster';
import './style.scss';

const API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN,
      client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'https://api.github.com/graphql',
        headers: {
            authorization: `bearer ${API_TOKEN}`
        }
      });

const App = () => {
    return(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <TopicsMaster />
            </ApolloProvider>
        </Provider>
    );
}
export default App;