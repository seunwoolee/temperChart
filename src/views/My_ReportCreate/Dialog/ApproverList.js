import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import {blue} from '@material-ui/core/colors';
import {
  Card, CardActions, CardContent, colors, Divider
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Link as RouterLink} from "react-router-dom";
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CardHeader from "@material-ui/core/CardHeader";
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import Input from "@material-ui/core/Input";
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import {useSelector} from "react-redux";
import axios from "../../../utils/my_axios";
import {avatar_URL} from "../../../my_config";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    overflow: 'auto',
    [theme.breakpoints.up('lg')]: {
      width: 500,
    },
    maxHeight: 700,
  },
  content: {
    paddingTop: 0
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeaderTitle: {
    color: theme.palette.primary.contrastText
  },
  main: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justify: 'space-between'
  },
  search: {
    padding: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
    justify: 'space-between'
  },
  personAddIncon: {
    fontSize: 40,
    color: theme.palette.text.secondary
  },
  searchInput: {
    marginLeft: theme.spacing(0),
    color: theme.palette.text.secondary,
    fontSize: '12px'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
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
  },
  actions: {
    justifyContent: 'flex-end'
  },
  deleteUserButton: {
    right: 1
  },
  selectTypeButton: {
    left: 1
  }
}));


export function ApproverList({users, handleUserTypeChange, checked, handleChecked, deleteUser}) {
  const classes = useStyles();

  return (
      users.map((user, i) => (
        <Fragment key={user.id}>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={user.type}
              onChange={(event) => handleUserTypeChange(event, user.id)}
            >
              <MenuItem value={0}>결재</MenuItem>
              <MenuItem value={1}>합의</MenuItem>
            </Select>
          </FormControl>
          <ListItem
            selected={user.order === checked}
            button
            onClick={() => handleChecked(user.order)}
            className={classes.listItem}
            disableGutters
            divider={user.order < users.length - 1}
            key={user.id}
          >
            <Avatar
              alt="Profile image"
              className={classes.avatar}
              component={RouterLink}
              src={`${avatar_URL}${user.avatar}`}
              to="/profile/1/timeline"
            />
            <ListItemText
              className={classes.listItemText}
              primary={`${user.name} ${user.position}`}
              secondary={user.common}
            />
            <ListItemSecondaryAction classes={{root: classes.deleteUserButton}}>
              <IconButton onClick={() => deleteUser(user.order)} aria-label="delete-user">
                <CancelPresentationIcon fontSize="large"/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Fragment>
      ))
  );
}

ApproverList.propTypes = {
  users: PropTypes.array,
  handleUserTypeChange: PropTypes.func,
  checked: PropTypes.number,
  handleChecked: PropTypes.func,
  deleteUser: PropTypes.func
}

