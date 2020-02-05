import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Typography,
  colors
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'src/utils/axios';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    maxHeight: 700,
  },
  content: {
    paddingTop: 0
  },
  search: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justify: 'space-between'
  },
  personAddIncon: {
    fontSize: 40,
    color: theme.palette.text.secondary
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '12px'
  },
  avatar: {
    height: 30,
    width: 30
  },
  listItem: {
    flexWrap: 'wrap'
  },
  formControl: {
    paddingRight: theme.spacing(1)
  },
  listItemText: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4)
  },
  connectButton: {
    marginLeft: 'auto'
  },
  arrowIconButtom: {
    paddingRight: theme.spacing(1)
  },
  pendingButton: {
    marginLeft: 'auto',
    color: theme.palette.common.white,
    backgroundColor: colors.orange[600],
    '&:hover': {
      backgroundColor: colors.orange[900]
    }
  },
  connectedButton: {
    marginLeft: 'auto',
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

function UserList({ className, ...rest }) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [connections, setConnections] = useState([]);

  const handleConnectToggle = (id) => {
    setConnections((prevConnections) => {
      const newConnections = _.map(prevConnections, _.clone);

      return newConnections.map((connection) => {
        if (connection.id === id) {
          connection.status = connection.status === 'connected' || connection.status === 'pending'
            ? 'not_connected'
            : 'pending';

          if (connection.status === 'pending') {
            setOpenSnackbar(true);
          }
        }

        return connection;
      });
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    let mounted = true;

    const fetchConnections = () => {
      axios.get('/api/users/1/connections').then((response) => {
        if (mounted) {
          setConnections(response.data.connections);
        }
      });
    };

    fetchConnections();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="결재선 선택" />
      <Divider />
      <div className={classes.search}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item >
            <Typography variant="h4" component="h4">
              결재순서
            </Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.arrowIconButtom} aria-label="down-order">
              <ArrowDownwardRoundedIcon className={classes.personAddIncon} color="inherit" />
            </IconButton>
            <IconButton className={classes.arrowIconButtom} aria-label="up-order">
              <ArrowUpwardRoundedIcon className={classes.personAddIncon} color="inherit" />
            </IconButton>
            <IconButton style={{paddingRight:3}} aria-label="create-user">
              <PersonAddIcon className={classes.personAddIncon} color="inherit" />
            </IconButton>
          </Grid>
        </Grid>

      </div>

      {/*Search Bar*/}
      {/*<div className={classes.search}>*/}
      {/*  <SearchIcon*/}
      {/*    className={classes.searchIcon}*/}
      {/*    color="inherit"*/}
      {/*  />*/}
      {/*  <Input*/}
      {/*    className={classes.searchInput}*/}
      {/*    disableUnderline*/}
      {/*    placeholder="Search people &amp; places"*/}
      {/*  />*/}
      {/*</div>*/}
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <List disablePadding>
            {connections.map((connection, i) => (
              <ListItem
                className={classes.listItem}
                disableGutters
                divider={i < connections.length - 1}
                key={connection.id}
              >
                <FormControl className={classes.formControl}>
                  {/*<InputLabel id="demo-simple-select-label">타입</InputLabel>*/}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    // onChange={}
                  >
                    <MenuItem value={10}>결재</MenuItem>
                    <MenuItem value={20}>합의</MenuItem>
                    <MenuItem value={30}>참조</MenuItem>
                  </Select>
                </FormControl>
                {/*<ListItemAvatar>*/}
                  <Avatar
                    alt="Profile image"
                    className={classes.avatar}
                    component={RouterLink}
                    src={connection.avatar}
                    to="/profile/1/timeline"
                  />
                {/*</ListItemAvatar>*/}
                <ListItemText
                  className={classes.listItemText}
                  primary={connection.name}
                  secondary={`${connection.common} connections in common`}
                />
                <IconButton aria-label="create-user">
                  <CancelPresentationIcon fontSize="large"/>
                </IconButton>
              </ListItem>
            ))}
          </List>
        </PerfectScrollbar>
      </CardContent>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={6000}
        message={(
          <Typography
            color="inherit"
            variant="h6"
          >
            Sent connection request
          </Typography>
        )}
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </Card>
  );
}

UserList.propTypes = {
  className: PropTypes.string
};

export default UserList;
