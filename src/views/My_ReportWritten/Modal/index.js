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
  Button, Table, TableBody, TableRow, TableCell, Typography
} from '@material-ui/core';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import MySnackbars from "../../../components/MY_snackbar";
import InvoiceCard from "./InvoiceCard";
import ChooseDialog from '../Dialog';
import Attachments from "./attachments";
import axios from "../../../utils/axios";
import {documents} from "../../../mock/my_documentsMock";
import MY_approverLine from "../../../components/MY_approverLine";
import getCurrency from "../../../utils/getCurrency";

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
  tableCellContent: {
    width: '50px',
    whiteSpace: 'nowrap',
    backgroundColor: '#eeeeee'

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
  },
  approverGrid: {
    paddingBottom: theme.spacing(8)
  }
}));

function Index({
  open, onClose, onComplete, document, className, ...rest
}) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getSumInvoices = () => getCurrency(document.invoices.map(invoice => invoice.총액)
    .reduce((prev, curr) => prev + curr));


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
            <CardHeader classes={{root: classes.cardHeaderRoot, title: classes.cardHeaderTitle}} title="상신문서" />
            <Divider />
            <CardContent>
              <Grid
                className={classes.approverGrid}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid
                  item
                  md={document.approvers.length + 2}
                  xs={12}
                >
                  <MY_approverLine approvers={document.approvers} />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className={classes.tableCellContent}>작성자</TableCell>
                          <TableCell>{document.author}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCellContent}>작성일자</TableCell>
                          <TableCell>{document.created}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCellContent}>제목</TableCell>
                          <TableCell>{document.title}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCellContent}>내용</TableCell>
                          <TableCell>{document.content}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Divider />
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Typography variant="h5">
                    총
                    {' '}
                    {document.invoices.length}
                    건 /
                    {' '}
                    {getSumInvoices()}
                    원
                  </Typography>
                  {document.invoices.map((invoice) => (
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
                  <Attachments attachments={document.attachments}/>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <Button
                color="primary"
                variant="contained"
                onClick={onClose}
              >
                닫기
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    </>
  );
}

Index.propTypes = {
  className: PropTypes.string,
  document: PropTypes.shape(documents),
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  open: PropTypes.bool
};

Index.defaultProps = {
  open: false,
};

export default Index;
