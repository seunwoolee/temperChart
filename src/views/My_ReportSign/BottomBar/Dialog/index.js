import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import BottomBar from "../BottomBar";
import {documents} from "../../../../mock";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontFamily: 'GmarketSansBold',
    fontSize: '1rem'
  },
}));


export default function MyDialog({open, onCloseDialog}) {
  const classes = useStyles();

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle disableTypography classes={{root: classes.dialogTitle}} id="alert-dialog-title">
            {"일괄 결재를 실시 하시겠습니까?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
            취소
          </Button>
          <Button variant="contained" onClick={onCloseDialog} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MyDialog.propTypes = {
  open: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  // documents: PropTypes.arrayOf(PropTypes.shape(documents))
};
