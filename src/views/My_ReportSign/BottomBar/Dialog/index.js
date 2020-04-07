import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import axios from "../../../../utils/my_axios";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontFamily: 'GmarketSansBold',
    fontSize: '1rem'
  },
}));


export default function MyDialog({open, onCloseDialog, selectedDocuments, fetchDocuments}) {
  const classes = useStyles();
  const session = useSelector((state) => state.session);

  const handleSubmitClick = () => {
    const headers = {Authorization: `Token ${session.token}`};
    const data = {document_ids: selectedDocuments.map(document => document.id)};

    debugger;
    axios.post('ea/do_sign_all/', data, {headers})
      .then(response => {
        onCloseDialog();
        fetchDocuments();
      })
      .catch(error => {
        onCloseDialog();
        fetchDocuments();
        console.log(error)
      }); // TODO 에러 로깅

    // onCloseDialog();
    // fetchDocuments();
    // console.log(selectedDocuments);
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
