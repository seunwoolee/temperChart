/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import axios from 'src/utils/axios';
import NotificationsPopover from 'src/components/NotificationsPopover';
import PricingModal from 'src/components/PricingModal';
import {authSuccess, logout} from 'src/actions';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import axios from "../../utils/my_axios";
import ChatBar from './ChatBar';
import {swRegistration} from "../../registerServiceWorker";
import {pushSave} from "../../actions";


const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  logos: {
    fontSize: '1rem',
    color: theme.palette.common.white,
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  chatButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(0.5)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(0.5)
  },
  logoutIcon: {
    marginRight: theme.spacing(0.5)
  }
}));

const popularSearches = [
  'Devias React Dashboard',
  'Devias',
  'Admin Pannel',
  'Project',
  'Pages'
];

function TopBar({
  onOpenNavBarMobile,
  className,
  ...rest
}) {
  const classes = useStyles();
  const history = useHistory();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const notificationsRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openChatBar, setOpenChatBar] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth/login');
  };

  // const handlePricingModalOpen = () => {
  //   setPricingModalOpen(true);
  // };

  const handlePricingModalClose = () => {
    setPricingModalOpen(false);
  };

  // const handleChatBarOpen = () => {
  //   setOpenChatBar(true);
  // };

  const handleChatBarClose = () => {
    setOpenChatBar(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  // const handleSearchChange = (event) => {
  //   setSearchValue(event.target.value);
  //
  //   if (event.target.value) {
  //     if (!openSearchPopover) {
  //       setOpenSearchPopover(true);
  //     }
  //   } else {
  //     setOpenSearchPopover(false);
  //   }
  // };

  // const handleSearchPopverClose = () => {
  //   setOpenSearchPopover(false);
  // };

  const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const updateSubscriptionOnServer = (subscription) => {
    const headers = {Authorization: `Token ${localStorage.getItem('token')}`};
    const axiosConfig = {headers};
    const data = {pushInfo: subscription};

    return axios.post('ea/create_push/', data, axiosConfig)
      .then(response => {
        console.log('구독 완료');
        if (response.status === 201) {
          dispatch(pushSave({endpoint: subscription.endpoint}));
        }
      })
      .catch(error => console.log(error)) // TODO 에러남기기
  };

  const setPushSubscribe = () => {
    const applicationServerPublicKey = 'BBvGTYHuHHla8VcJjlLFyFpBM6iU-uaSqw5Afqgi_EkB9ctCvMRMKThD4_VJj8j9XZh8QdZf9O9HSjPcjc6jIZE';
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    if (!('serviceWorker' in navigator)) { return; }
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    }).then(subscription => updateSubscriptionOnServer(subscription));
  };

  // useEffect(() => {
  //   setTimeout(() => setPushSubscribe(), 3000);
  //
  //   // let mounted = true;
  //   //
  //   // const fetchNotifications = () => {
  //   //   axios.get('/api/account/notifications').then((response) => {
  //   //     if (mounted) {
  //   //       setNotifications(response.data.notifications);
  //   //     }
  //   //   });
  //   // };
  //   //
  //   // fetchNotifications();
  //   //
  //   // return () => {
  //   //   mounted = false;
  //   // };
  //
  // }, []);


  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <RouterLink to="/">
          <Button
            className={classes.logos}
          >
            <NoteOutlinedIcon className={classes.logoutIcon} />
            PaperLess
          </Button>
        </RouterLink>
        <div className={classes.flexGrow} />
        {/* <Hidden mdDown> */}
        {/*  <IconButton */}
        {/*    className={classes.chatButton} */}
        {/*  color="inherit" */}
        {/*  onClick={handleChatBarOpen} */}
        {/* > */}
        {/*  <Badge */}
        {/*    badgeContent={6} */}
        {/*    color="secondary" */}
        {/*  > */}
        {/*    <PeopleIcon /> */}
        {/*  </Badge> */}
        {/* </IconButton> */}
        {/* </Hidden> */}
        {/*<IconButton*/}
        {/*  className={classes.notificationsButton}*/}
        {/*  color="inherit"*/}
        {/*  // onClick={handleNotificationsOpen}*/}
        {/*  onClick={setPushSubscribe}*/}
        {/*  ref={notificationsRef}*/}
        {/*>*/}
        {/*  <Badge*/}
        {/*    badgeContent={notifications.length}*/}
        {/*    classes={{ badge: classes.notificationsBadge }}*/}
        {/*    variant="dot"*/}
        {/*  >*/}
        {/*    <NotificationsIcon />*/}
        {/*  </Badge>*/}
        {/*</IconButton>*/}
        <Button
          className={classes.logoutButton}
          color="inherit"
          onClick={handleLogout}
        >
          <InputIcon className={classes.logoutIcon} />
          <Hidden mdDown>로그아웃</Hidden>
        </Button>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
      <PricingModal
        onClose={handlePricingModalClose}
        open={pricingModalOpen}
      />
      <ChatBar
        onClose={handleChatBarClose}
        open={openChatBar}
      />
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
