import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import axios from "../../../../utils/my_axios";
import {useDispatch, useSelector} from "react-redux";
import {getTodoCount} from "../../../../actions";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontFamily: 'GmarketSansBold',
    fontSize: '1rem'
  },
}));


export default function MyDialog({open, onCloseDialog, selectedDocuments, fetchDocuments}) {
  const classes = useStyles();
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const handleSubmitClick = () => {
    const headers = {Authorization: `Token ${session.token}`};
    const data = {document_ids: selectedDocuments.map(document => document.id)};

    axios.post('ea/do_sign_all/', data, {headers})
      .then(response => {
        dispatch(getTodoCount(session.token));
        onCloseDialog();
        fetchDocuments();
      })
      .catch(error => {
        onCloseDialog();
        fetchDocuments();
        console.log(error)
      }); // TODO 에러 로깅

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
          <Button variant="contained" onClick={handleSubmitClick} color="primary" autoFocus>
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
  selectedDocuments: PropTypes.array.isRequired,
  fetchDocuments: PropTypes.func
};
