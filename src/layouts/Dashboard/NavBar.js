/* eslint-disable react/no-multi-comp */
import React, {useEffect, useState} from 'react';
import {useLocation, matchPath} from 'react-router';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {
  Drawer,
  Divider,
  Avatar,
  List,
  ListSubheader,
  Typography,
  Hidden,
  IconButton,
  Badge,
  Link,
  colors
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import NavItem from 'src/components/NavItem';
import navConfig from './navConfig';
import {swRegistration} from '../../registerServiceWorker';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  navigation: {
    overflow: 'auto',
    padding: theme.spacing(0, 2, 2, 2),
    flexGrow: 1
  },
  profile: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  badge: {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  },
  badgeDot: {
    height: 9,
    minWidth: 9
  },
  onlineBadge: {
    backgroundColor: colors.green[600]
  },
  awayBadge: {
    backgroundColor: colors.orange[600]
  },
  busyBadge: {
    backgroundColor: colors.red[600]
  },
  offlineBadge: {
    backgroundColor: colors.grey[300]
  },
  avatar: {
    cursor: 'pointer',
    width: 40,
    height: 40
  },
  details: {
    marginLeft: theme.spacing(2)
  },
  moreButton: {
    marginLeft: 'auto',
    color: colors.blueGrey[200]
  }
}));

function renderNavItems({
  // eslint-disable-next-line react/prop-types
  items, subheader, key, ...rest
}) {
  return (
    <List key={key}>
      {subheader && <ListSubheader disableSticky>{subheader}</ListSubheader>}
      {/* eslint-disable-next-line react/prop-types */}
      {items.reduce(
        // eslint-disable-next-line no-use-before-define
        (acc, item) => reduceChildRoutes({acc, item, ...rest}),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc, pathname, item, depth = 0
}) {
  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={item.href}
        label={item.label}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={item.href}
        label={item.label}
        title={item.title}
      />
    );
  }

  return acc;
}

function NavBar({
  openMobile,
  onMobileClose,
  className,
  ...rest
}) {
  const classes = useStyles();
  const location = useLocation();
  const session = useSelector((state) => state.session);
  const [status, setStatus] = useState('online');
  const [installButton, setInstallButton] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);


  const handleStatusToggle = () => {
    const statusSeq = {
      online: 'away',
      away: 'busy',
      busy: 'offline',
      offline: 'online'
    };

    setStatus((prevStatus) => statusSeq[prevStatus]);
  };

  const installApp = async () => {
    console.log(installPrompt);
    if (!installPrompt) return false;
    installPrompt.prompt();

    const outcome = await installPrompt.userChoice;
    if (outcome.outcome === 'accepted') {
      console.log("App Installed");
    } else {
      console.log("App not installed");
    }
    // Remove the event reference
    setInstallPrompt(null);
    // Hide the button
    setInstallButton(false);
  };

  const checkSubscribe = () => swRegistration.pushManager.getSubscription()
    .then((subscription) => {
      if (subscription) {
        setIsSubscribed(true);
        // this.setState({isSubscribed: true});
      }

      if (isSubscribed) {
        console.log('User IS subscribed.', subscription);
      } else {
        console.log('User is NOT subscribed.');
      }
    });

  const displayConfirmNotification = () => {
    if ('serviceWorker' in navigator) {
      const options = {
        body: '이승우짱',
        icon: '/favicon_192.png',
        actions: [
          {action: 'confirm', title: '확인', icon: '/favicon_192.png'},
          {action: 'cancel', title: '취소', icon: '/favicon_192.png'}
        ]
      };
      navigator.serviceWorker.ready
        .then(swreg => {
          swreg.showNotification('서비스워커에서 Notification 실행', options);
        });
    }
  };

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
    // TODO: Send subscription to application server
    // console.log('User is subscribed:', subscription.toJSON());
    console.log(JSON.stringify(subscription));

  };

  const setPushSubscribe = () => {
    console.log('구독진행');
    const applicationServerPublicKey = 'BBvGTYHuHHla8VcJjlLFyFpBM6iU-uaSqw5Afqgi_EkB9ctCvMRMKThD4_VJj8j9XZh8QdZf9O9HSjPcjc6jIZE';
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    if (!('serviceWorker' in navigator)) {
      return;
    }
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    }).then(subscription => updateSubscriptionOnServer(subscription));
  };

  const askForNotificationPermission = () => {
    Notification.requestPermission(result => {
      console.log('User chocie', result);
      if (result !== 'granted') {
        console.log('No notification permission granted');
      } else {
        checkSubscribe()
          .then(() => (!isSubscribed ? setPushSubscribe() : null));
        displayConfirmNotification();
      }
    });
  };


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }

    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    // debugger;
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      console.log("Install Prompt fired");
      setInstallPrompt(e);
      // installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true) {
        return false;
      }
      // Set the state variable to make button visible
      setInstallButton(true);
    });
  }, []);

  const content = (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <nav className={classes.navigation}>
        {navConfig.map((list) => renderNavItems({
          items: list.items,
          subheader: list.subheader,
          pathname: location.pathname,
          key: list.subheader
        }))}
      </nav>
      <Divider className={classes.divider} />
      <div className={classes.profile}>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          classes={{
            dot: classes.badgeDot,
            badge: clsx({
              [classes.badge]: true,
              [classes.onlineBadge]: status === 'online',
              [classes.awayBadge]: status === 'away',
              [classes.busyBadge]: status === 'busy',
              [classes.offlineBadge]: status === 'offline'
            })
          }}
          variant="dot"
        >
          <Avatar
            alt="Person"
            onClick={handleStatusToggle}
            className={classes.avatar}
            src={session.user.avatar}
          />
        </Badge>
        <div className={classes.details}>
          <Link
            component={RouterLink}
            to="/profile/1/timeline"
            variant="h5"
            color="textPrimary"
            underline="none"
          >
            {`${session.user.name} ${session.user.position}`}
          </Link>
          <Typography variant="body2">{session.user.department}</Typography>
        </div>
        {/* <IconButton */}
        {/*  className={classes.moreButton} */}
        {/*  size="small" */}
        {/* > */}
        {/*  <MoreIcon /> */}
        {/* </IconButton> */}
      </div>
      <Divider className={classes.divider} />
      <div>
        <button onClick={installApp}>Install App</button>
        <button onClick={askForNotificationPermission}>Notification 구독</button>
      </div>
    </div>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{
            paper: classes.mobileDrawer
          }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{
            paper: classes.desktopDrawer
          }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
