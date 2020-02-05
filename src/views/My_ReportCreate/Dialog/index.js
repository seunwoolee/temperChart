import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {users} from "../../../mock";
import UserList from "./UserList";

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function ChooseDialog({ users, open, onClose  }) {
  const classes = useStyles();
  // const { users, open, onClose  } = props;

  const handleClose = () => {
    console.log('#')
    // onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      {/*<DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>*/}
        <UserList />

      {/*<List>*/}
      {/*  {emails.map(email => (*/}
      {/*    <ListItem button onClick={() => handleListItemClick(email)} key={email}>*/}
      {/*      <ListItemAvatar>*/}
      {/*        <Avatar className={classes.avatar}>*/}
      {/*          <PersonIcon />*/}
      {/*        </Avatar>*/}
      {/*      </ListItemAvatar>*/}
      {/*      <ListItemText primary={email} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}

      {/*  <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>*/}
      {/*    <ListItemAvatar>*/}
      {/*      <Avatar>*/}
      {/*        <AddIcon />*/}
      {/*      </Avatar>*/}
      {/*    </ListItemAvatar>*/}
      {/*    <ListItemText primary="Add account" />*/}
      {/*  </ListItem>*/}
      {/*</List>*/}
    </Dialog>
  );
}

ChooseDialog.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(users)),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChooseDialog;
