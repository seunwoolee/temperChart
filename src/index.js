import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import {Provider as StoreProvider} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import {Button} from "@material-ui/core";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./store";
import {theme} from "./theme";
import registerServiceWorker from "./registerServiceWorker";
import {axios_URL} from "./my_config";

const store = configureStore();
const app = (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreProvider>
);

// const app = (<h1>dd</h1>);
ReactDOM.render(app, document.getElementById('root'));
