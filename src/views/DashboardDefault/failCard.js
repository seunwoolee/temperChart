import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, Typography, Avatar
} from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

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
    backgroundColor: "red",
    height: 48,
    width: 48
  }
}));

function FailCard({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <div className={classes.details}>
          <Typography variant="h3">
            기준이탈
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <NotInterestedIcon />
      </Avatar>
    </Card>
  );
}

FailCard.propTypes = {
  className: PropTypes.string
};

export default FailCard;
