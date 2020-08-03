import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, Typography, Avatar, colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

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
    backgroundColor: "#2962ff",
    height: 48,
    width: 48
  }
}));

function OkCard({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <div className={classes.details}>
          <Typography variant="h3">
            살균중
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <RadioButtonUncheckedIcon />
      </Avatar>
    </Card>
  );
}

OkCard.propTypes = {
  className: PropTypes.string
};

export default OkCard;
