import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createBrowserHistory} from "history";
import {configureStore} from "./store";
import {Provider as StoreProvider} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import {theme} from "./theme";

const history = createBrowserHistory();
const store = configureStore();

const app = (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </StoreProvider>
)

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
