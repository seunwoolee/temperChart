import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card, CardHeader, CardContent, Divider
} from '@material-ui/core';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import {useHistory} from "react-router";
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/my_axios";
import Chart from './Chart';
import Header from '../../DashboardAnalytics/Header';
import moment from "moment";
import {useDispatch} from "react-redux";
import {isloading} from "../../../actions";
import LoadingBar from "../../../components/MY_LoadingBar";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {},
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginLeft: theme.spacing(1)
    }
  },
  inner: {
    height: 375,
    minWidth: 500
  },
  chart: {
    height: '100%'
  }
}));

function PerformanceOverTime({className}) {
  const classes = useStyles();
  const [temperRows, setTemperRows] = useState([]);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'));
  const [endDate, setEndDate] = useState(moment().subtract(1, 'days'));
  const [detail, setDetail] = useState(0.5);
  const history = useHistory();
  const dispatch = useDispatch();

  const increaseDetail = () => {
    setDetail(prevState => prevState + 0.2);
  };

  const decreaseDetail = () => {
    setDetail(prevState => (prevState > 0 ? prevState - 0.2 : 0));
  };

  const fetchTemperRows = () => {
    const config = {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`},
      params: {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).add(1, 'days').format('YYYY-MM-DD'),
      }
    };

    dispatch(isloading(true));
    axios.get(`temperchart/get_chart_data/`, config)
      .then((response) => {
        setTemperRows(response.data);
        dispatch(isloading(false));
        setDetail(0.5);
      })
      .catch(error => {
        dispatch(isloading(false));
        setDetail(0.5);
      });

  };

  useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      history.push('/auth/login');
    }
    fetchTemperRows();
  }, [history]);


  const xLabel = [];
  const currentTemperRows = [];
  const settingTemperRows = [];
  let initTemperature = 0;

  temperRows.forEach(row => {
    if (Math.abs(row[4] - initTemperature) > detail) {
      xLabel.push(row[0].substring(5) + row[1]);
      currentTemperRows.push(row[4]);
      settingTemperRows.push(row[3]);
      initTemperature = row[4];
    }
  });

  // const xLabel = temperRows.map(row => row[1]);
  // const currentTemperRows = temperRows.map(row => row[4]);
  // const settingTemperRows = temperRows.map(row => row[3]);

  const data = {
    currentTemperRows: {data: currentTemperRows},
    settingTemperRows: {data: settingTemperRows}
  };


  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <LoadingBar />

      <CardHeader
        action={(
          <>
            <IconButton onClick={increaseDetail}>
              <ZoomInIcon />
            </IconButton>
            <IconButton>
              <ZoomOutIcon onClick={decreaseDetail} />
            </IconButton>
          </>
        )}
        title="Temperature Chart"
      />
      <Header
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onSearchClick={fetchTemperRows}
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Chart
              className={classes.chart}
              data={data}
              labels={xLabel}
              onDetailed={setDetail}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
}

PerformanceOverTime.propTypes = {
  className: PropTypes.string
};

export default PerformanceOverTime;
