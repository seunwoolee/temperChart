import React, {useEffect, useState} from 'react';
import {Redirect, Router} from 'react-router-dom';
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


const history = createBrowserHistory();

function App() {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState())
    const token = localStorage.getItem('token');
    if(!token){
      history.push('/auth/login');
    }
  }, [])

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router history={history}>
        <ScrollReset/>
        {renderRoutes(routes)}
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
