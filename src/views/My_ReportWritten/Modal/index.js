import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
  Button, Table, TableBody, TableRow, TableCell
} from '@material-ui/core';
import MySnackbars from "../../../components/MY_snackbar";
import InvoiceCard from "./InvoiceCard";
import ChooseDialog from '../Dialog'
import UploadAttachments from "./UploadAttachments";
import axios from "../../../utils/axios";
import {invoices} from "../../../mock";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 800,
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
  const [openDialog, setOpenDialog] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [inputAttachments,setInputAttachments]  = useState([]);
  const [inputUsers,setInputUsers]  = useState([]);


  const handleChangeTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setInputContent(event.target.value);
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
    setInputUsers(users);
    setOpenDialog(false);
    onComplete();

    // axios call
  };


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
                        <TableCell>이승우</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>작성일자</TableCell>
                        <TableCell>2020-01-02</TableCell>
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
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    multiline
                    rows="3"
                    rowsMax="50"
                    fullWidth
                    label="내용"
                    name="title"
                    onChange={handleChangeContent}
                    value={inputContent}
                    variant="outlined"
                  />
                </Grid>
                <Divider/>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  {invoices.map((invoice) => (
                    <InvoiceCard
                      key={invoice.id}
                      invoice={invoice}
                    />
                  ))}
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <UploadAttachments handleAttachments={handleAttachments}/>
                </Grid>
              </Grid>
            </CardContent>
            <Divider/>
            <CardActions className={classes.actions}>
              <Button onClick={onClose}>
                닫기
              </Button>
              <Button
                disabled={!(inputTitle && inputContent)}
                color="primary"
                onClick={handleClickOpen}
                variant="contained"
              >
                결재요청
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
      <ChooseDialog open={openDialog} onClose={handleClose}  onSubmit={handleSubmit}/>
    </>
  );
}

Index.propTypes = {
  className: PropTypes.string,
  invoices: PropTypes.arrayOf(PropTypes.shape(invoices)),
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  open: PropTypes.bool
};

Index.defaultProps = {
  open: false,
};

export default Index;
