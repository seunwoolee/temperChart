import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import ChooseDialog from "../views/My_ReportCreate/Dialog";
import PropTypes from "prop-types";
import {documents} from "../mock";
import Index from "../views/My_ReportCreate/Modal";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alertRoot: {
    fontSize: '1rem'
  }
}));

const Alert = (props) => {
  const classes = useStyles();
  return <MuiAlert classes={{root: classes.alertRoot}} elevation={6} variant="filled" {...props} />;
};

function CustomizedSnackbars({open, setOpen, isSuccess}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const handleClick = (bool: boolean) => {
    setOpen(bool);
  };

  let message = (
    <Alert onClose={() => handleClick(false)} severity="success">
      완료
    </Alert>
  );

  if(!isSuccess){
    message=(
     <Alert onClose={() => handleClick(false)} severity="error">
       실패(전산팀 문의 바랍니다)
     </Alert>
     )
   }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => handleClick(false)}>
        {message}
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;

CustomizedSnackbars.propTypes = {
  isSuccess: PropTypes.bool,
  setOpen: PropTypes.func,
  open: PropTypes.bool
};
