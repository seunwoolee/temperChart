import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import gradients from 'src/utils/gradients';
import Chart from './Chart';
import moment from "moment";
import {MachineState} from "../index";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: gradients.indigo,
    color: theme.palette.primary.contrastText,
    '& .MuiCardHeader-action': {
      margin: 0
    }
  },
  content: {
    paddingTop: 0
  },
  itemDivider: {
    borderBottomColor: 'rgba(255,255,255,0.2)'
  },
  actions: {
    paddingTop: 0,
    justifyContent: 'flex-end'
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  },
  sleep: {
    backgroundImage: gradients.orange
  },
  error: {
    backgroundImage: gradients.red
  },
  ok: {
    backgroundImage: gradients.indigo
  }
}));


function RealTime({machineState, currentTemperRows}) {
  const classes = useStyles();
  const dateFormat = "YYYY-MM-DD HH:mm:ss";

  const getMachineState = () => {
    if (machineState === MachineState.sleep) {
      return classes.sleep;
    } else if (machineState === MachineState.ok) {
      return classes.ok;
    } else {
      return classes.error;
    }
  }

  const labels = currentTemperRows.map((value, i) => i);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      callbacks: {
        title: (tooltipItem) => tooltipItem[0].xLabel,
        label: (tooltipItem) => {
          let title = '';
          tooltipItem.datasetIndex === 0 ? title = '실제온도' : title = '설정온도';
          return `${title}: ${tooltipItem.yLabel}℃`;
        }
      }
    },
  };

  return (
    <Card
      className={clsx(classes.root, getMachineState())}
    >
      <CardHeader
        action={(
          <Typography
            color="inherit"
            gutterBottom
            variant="h3"
          >
            현재온도 :
            {' '}
            {currentTemperRows[5]}
          </Typography>
        )}
        title={(
          <Typography
            color="inherit"
            variant="h4"
          >
            {moment().format(dateFormat)}
          </Typography>
        )}
      />
      <CardContent className={classes.content}>
        <Chart
          data={currentTemperRows}
          labels={labels}
        />
      </CardContent>

    </Card>
  );
}

RealTime.propTypes = {
  machineState: PropTypes.string.isRequired,
  currentTemperRows: PropTypes.array.isRequired
};

export default RealTime;
