import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './apollo';

ReactDOM.render(
<ApolloProvider client={client}>
    <App />
</ApolloProvider>, 
document.getElementById('root'));


serviceWorker.unregister();
// makes it so that just the components changing within the app will refresh as you update them,
// rather than refreshing the entire page
if (module.hot) module.hot.accept();