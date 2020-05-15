import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import axios from "../utils/my_axios";
import {useSelector} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  dialogTitleRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  alarm: {
    paddingTop: theme.spacing(2),
  },
  password: {
    paddingBottom: theme.spacing(2),
  },
  dialogTitleText: {
    fontSize: '16px',
    color: theme.palette.primary.contrastText
  }
}));

export default function ChangePasswordDialog({open, onClose}) {
  const classes = useStyles();
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputNewPassword2, setInputNewPassword2] = useState('');
  const session = useSelector((state) => state.session);

  const handleChangePassword = (event) => {
    setInputNewPassword(event.target.value);
  };

  const handleChangePassword2 = (event) => {
    setInputNewPassword2(event.target.value);
  };

  const handleSubmit = () => {
    if(!(inputNewPassword) || !(inputNewPassword2)) {
      alert('패스워드를 입력해주세요');
      return false;
    }

    if (inputNewPassword !== inputNewPassword2) {
      alert('동일한 패스워드를 입력해주세요');
      return false;
    }

    const headers = {Authorization: `Token ${session.token}`};
    const data = {new_password: inputNewPassword};
    axios.post('employee/change_password/', data, {headers})
      .then(response => {
        alert('변경 완료');
        setInputNewPassword('');
        setInputNewPassword2('');
        onClose();
      })
      .catch(error => {
        onClose();
        console.log(error)
      }); // TODO 에러 로깅

  };

  const handleClose = () => {
    setInputNewPassword('');
    setInputNewPassword2('');
    onClose();
  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.dialogTitleRoot}}>
          <Typography classes={{root: classes.dialogTitleText}}>패스워드 변경</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="신규패스워드"
            name="newPassword"
            onChange={handleChangePassword}
            value={inputNewPassword}
          />
        </DialogContent>
        <DialogContent className={classes.password}>
          <TextField
            fullWidth
            label="신규패스워드 확인"
            name="newPassword2"
            onChange={handleChangePassword2}
            value={inputNewPassword2}
          />
        </DialogContent>
        <Divider />
        <ListItem className={classes.alarm}>
          <ListItemIcon>
            <Button>
              <NotificationsNoneIcon fontSize="large"/>
            </Button>
          </ListItemIcon>
          <ListItemText
            primary="알림 설정"
          />
        </ListItem>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant="contained">확인</Button>
          <Button onClick={handleClose} color="primary" variant="outlined">취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ChangePasswordDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
