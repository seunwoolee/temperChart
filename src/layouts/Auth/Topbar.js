import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  toolbar: {
    // minHeight: 64,
  },
  logos: {
    fontSize: '1rem',
    color: theme.palette.common.white,
  },
}));

function Topbar({ className, ...rest }) {
  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/auth/login">
          <Button
            className={classes.logos}
          >
            <AssessmentIcon className={classes.logoutIcon} />
            온도차트
          </Button>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
}

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
