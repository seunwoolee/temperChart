import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import axios from "../utils/my_axios";
import {pushSave} from "../actions";
import {swRegistration} from "../registerServiceWorker";
import urlB64ToUint8Array from "../utils/urlB64ToUint8Array";
import moment from "moment";

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
  const [notificationIcon, setNotificationIcon] = useState(<NotificationsNoneIcon fontSize="large" />);
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputNewPassword2, setInputNewPassword2] = useState('');
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const applicationServerPublicKey = 'BBvGTYHuHHla8VcJjlLFyFpBM6iU-uaSqw5Afqgi_EkB9ctCvMRMKThD4_VJj8j9XZh8QdZf9O9HSjPcjc6jIZE';
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

  const headers = {Authorization: `Token ${localStorage.getItem('token')}`};

  const updateSubscriptionOnServer = (subscription) => {
    const data = {pushInfo: subscription};
    const axiosConfig = {headers};

    return axios.post('ea/create_push/', data, axiosConfig)
      .then(response => {
        console.log('구독 완료');
        if (response.status === 201) {
          dispatch(pushSave({endpoint: subscription.endpoint}));
        }
      })
      .catch(error => console.log(error)); // TODO 에러남기기
  };

  const setPushSubscribe = () => {
    if (!('serviceWorker' in navigator)) { return; }
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    }).then(subscription => updateSubscriptionOnServer(subscription));
  };

  const checkSubscribe = () => {
    if (!('serviceWorker' in navigator)) { return; }
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    }).then(subscription => {
      const params = {endpoint: subscription.endpoint};
      const axiosConfig = {headers, params};

      axios.get('ea/check_push/', axiosConfig)
        .then(res => setNotificationIcon(<NotificationsActiveIcon fontSize="large" />))
        .catch(err => setNotificationIcon(<NotificationsNoneIcon fontSize="large" />));
    });
  };


  useEffect(() => {
    checkSubscribe();
  }, [])

  const handleChangePassword = (event) => {
    setInputNewPassword(event.target.value);
  };

  const handleChangePassword2 = (event) => {
    setInputNewPassword2(event.target.value);
  };

  const handleSubmit = () => {
    if (!(inputNewPassword) || !(inputNewPassword2)) {
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
        console.log(error);
      }); // TODO 에러 로깅
  };

  const handleClose = () => {
    setInputNewPassword('');
    setInputNewPassword2('');
    onClose();
  };

  const notificationClickHandler = () => {
    setNotificationIcon(<NotificationsActiveIcon fontSize="large" />);
  };

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
            <Button onClick={notificationClickHandler}>
              {notificationIcon}
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
