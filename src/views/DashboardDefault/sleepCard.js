import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, Typography, Avatar, colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: "#ffc300",
    height: 48,
    width: 48
  }
}));

function SleepCard({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <div className={classes.details}>
          <Typography variant="h3">
            살균미가동
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <CheckCircleOutlineIcon />
      </Avatar>
    </Card>
  );
}

SleepCard.propTypes = {
  className: PropTypes.string
};

export default SleepCard;
