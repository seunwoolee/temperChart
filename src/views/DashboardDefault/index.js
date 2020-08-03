import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Container, Grid} from '@material-ui/core';
import Page from 'src/components/Page';
import {useHistory} from "react-router";
import PerformanceOverTime from './PerformanceOverTime';
import FailCard from "./failCard";
import RealTime from "./RealTime";
import OkCard from "./okCard";
import SleepCard from "./sleepCard";
import axios from "../../utils/my_axios";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(2)
  }
}));

export const MachineState = Object.freeze({
  ok: Symbol("ok"),
  error: Symbol("error"),
  sleep: Symbol("sleep")
});

function DashboardDefault() {
  const classes = useStyles();
  const [currentTemperRows, setCurrentTemperRows] = useState([0, 0, 0, 0, 0, 0]);
  const [chartRows, setChartRows] = useState([]);
  const [machineState, setMachineState] = useState(MachineState.sleep);
  const [refresh, setRefresh] = useState(true);
  const history = useHistory();

  const fetchCurrentTemperRow = () => {
    setRefresh(prevState => !prevState);
    const config = {headers: {Authorization: `Token ${localStorage.getItem('token')}`}};

    axios.get(`temperchart/get_current_chart_data/`, config)
      .then((response) => {
        // 기준이탈, 살균중, 살균미가동 type 로직
        if (response.data.length === 0) {
          setCurrentTemperRows([0, 0, 0, 0, 0, 0]);
          return setMachineState(MachineState.sleep);
        }

        if (response.data[4] > 70 || response.data[4] < 68) {
          setMachineState(MachineState.error);
        } else {
          setMachineState(MachineState.ok);
        }

        if (currentTemperRows[5] !== response.data[4]) {
          const newCurrentTemperRows = [...currentTemperRows];
          newCurrentTemperRows.shift();
          newCurrentTemperRows.push(response.data[4]);
          setCurrentTemperRows(newCurrentTemperRows);
        }
      });
  };

  useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      history.push('/auth/login');
    }
    let mounted = true;

    setInterval(() => {
      if (mounted) {
        fetchCurrentTemperRow();
      }
    }, 2000);

    return () => {
      mounted = false;
    };
  }, [fetchCurrentTemperRow, history]);

  return (
    <Page
      className={classes.root}
      title="온도차트"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          className={classes.grid}
        >
          <Grid
            item
            lg={2}
            sm={6}
            xs={12}
          >
            <FailCard/>
          </Grid>
          <Grid
            item
            lg={2}
            sm={6}
            xs={12}
          >
            <OkCard/>
          </Grid>
          <Grid
            item
            lg={2}
            sm={6}
            xs={12}
          >
            <SleepCard/>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
          >
            <RealTime machineState={machineState} currentTemperRows={currentTemperRows}/>
          </Grid>
          <Grid
            item
            lg={12}
            xs={12}
          >
            <PerformanceOverTime />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardDefault;
