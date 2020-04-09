import React, {useState} from 'react';
import PropTypes, {array} from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  TextField,
  Button, Table, TableBody, TableRow, TableCell, Typography
} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import InvoiceCard from "./InvoiceCard";
import ChooseDialog from '../Dialog';
import UploadAttachments from "./UploadAttachments";
import {voucher} from "../../../mock";
import getCurrency from "../../../utils/getCurrency";
import axios from "../../../utils/my_axios";
import {authSuccess, isloading} from "../../../actions";
import MY_InvoiceCard from "../../../components/MY_InvoiceCard";
import MY_InvoiceDetailCard from "../../../components/MY_InvoiceDetailCard";
import LoadingBar from "../../../components/MY_LoadingBar";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 900,
    maxHeight: '95%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  cardContent: {
    paddingTop: theme.spacing(1)
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeaderTitle: {
    color: theme.palette.primary.contrastText
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function Index({
                 open, onClose, onComplete, invoices, className, ...rest
               }) {
  const classes = useStyles();
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputAttachments, setInputAttachments] = useState([]);

  const handleChangeTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const handleAttachments = (attachments: Array) => {
    setInputAttachments(attachments);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (users: Array) => {

    const headers = {Authorization: `Token ${session.token}`, 'Content-Type': 'multipart/form-data'};
    const axiosConfig = {headers};
    const url = 'ea/create_document/';
    const invoiceArray: Array = []
    const filesArray: Array = []
    const filesCountArray: Array = []

    for (let invoice in invoices) {
      const invoice_id: string = invoices[invoice].id;
      invoiceArray.push(invoice_id);
      let invoiceFiles: Array = null;

      const invoiceAttachments = inputAttachments.filter(inputAttachment => invoice_id in inputAttachment);

      if (invoiceAttachments.length > 0) {
        invoiceFiles = invoiceAttachments[0][invoice_id];
      }

      if (invoiceFiles) {
        filesArray.push(...invoiceFiles)
        filesCountArray.push(invoiceFiles.length)
      } else {
        filesCountArray.push(0)
      }
    }

    const formData = new FormData();
    formData.append('batch_number', invoices[0].RPICU);
    formData.append('author', session.user.id);
    formData.append('title', inputTitle);
    formData.append('approvers', JSON.stringify(users));

    filesArray.map(file => formData.append('files', file));
    invoiceArray.map(invoiceId => formData.append('invoices', invoiceId));
    filesCountArray.map(fileCount => formData.append('counts', fileCount));
    dispatch(isloading(true))

    axios.post(url, formData, axiosConfig)
      .then(response => {
        dispatch(isloading(false))
        setOpenDialog(false);
        setInputTitle('');
        setInputAttachments([]);
        response.status === 201 ? onComplete(true) : onComplete(false);
      })
      .catch(error => {
        dispatch(isloading(false))
        setOpenDialog(false);
        setInputTitle('');
        setInputAttachments([]);
        onComplete(false);
      });
  };

  const getSumInvoices = () => getCurrency(invoices.map(invoice => invoice.price).reduce((prev, curr) => prev + curr));

  return (
    <>
      <Modal
        disableBackdropClick
        onClose={onClose}
        open={open}
      >
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <form>
            <CardHeader classes={{root: classes.cardHeaderRoot, title: classes.cardHeaderTitle}} title="기안 작성"/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>작성자</TableCell>
                        <TableCell>{session.user.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>작성일자</TableCell>
                        <TableCell>{new Date().toISOString().slice(0, 10)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="제목"
                    name="title"
                    onChange={handleChangeTitle}
                    value={inputTitle}
                    variant="outlined"
                  />
                </Grid>
                <Divider/>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <MY_InvoiceDetailCard
                    type={'write'}
                    invoices={invoices}
                    attachments={inputAttachments}
                    handleAttachments={handleAttachments}/>
                </Grid>
              </Grid>
            </CardContent>
            <Divider/>
            <CardActions className={classes.actions}>
              <Button onClick={onClose}>
                닫기
              </Button>
              <Button
                disabled={!(inputTitle)}
                color="primary"
                onClick={handleClickOpen}
                variant="contained"
              >
                결재요청
              </Button>
            </CardActions>
          </form>

          <LoadingBar />
        </Card>
      </Modal>
      <ChooseDialog open={openDialog} onClose={handleClose} onSubmit={handleSubmit}/>
    </>
  );
}

Index.propTypes = {
  className: PropTypes.string,
  invoices: PropTypes.arrayOf(PropTypes.shape(voucher)),
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  open: PropTypes.bool
};

Index.defaultProps = {
  open: false,
};

export default Index;
