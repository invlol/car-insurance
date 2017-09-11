import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import 'bulma/css/bulma.css'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj3aab8m2f6qz0182y9lliztm'
});
const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
