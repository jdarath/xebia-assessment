import React, { Component } from 'react';
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

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ApolloProvider client={client}>
                <TopicsMaster />
            </ApolloProvider>
        )
    }
}