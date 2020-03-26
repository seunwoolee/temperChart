import React, {useEffect, useState} from 'react';
import {HashRouter, Redirect, Router, Switch, Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {createBrowserHistory} from 'history';
import MomentUtils from '@date-io/moment';
import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {theme} from './theme';
import {configureStore} from './store';
import routes from './routes';
import routes_auth from "./routes_auth";
import ScrollReset from './components/ScrollReset';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/main.scss';
import {authCheckState} from "./actions";
import {Dispatch} from "redux";
import {Home} from "@material-ui/icons";
import Login from "./views/Login";


const history = createBrowserHistory();

function App() {
  const dispatch: Dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    dispatch(authCheckState());
    // history.push('/reportSign');
    // token ? history.push('/reportSign') : history.push('/auth/login');
    if (!token) {
      history.push('/');
    }
  }, []);


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {/*<HashRouter history={history}>*/}
      <Router history={history}>
        <ScrollReset/>
        {renderRoutes(routes)}
      </Router >
    </MuiPickersUtilsProvider>
  );
}

export default App;
