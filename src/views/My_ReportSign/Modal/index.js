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
  Button, Table, TableBody, TableRow, TableCell, Typography
} from '@material-ui/core';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import axios from "../../../utils/axios";
import {documents} from "../../../mock/my_documentsMock";
import MY_approverLine from "../../../components/MY_approverLine";
import getCurrency from "../../../utils/getCurrency";
import MY_attachmentsBase from "../../../components/MY_attachmentsBase";
import FormDialog from "../Dialog";
import MY_InvoiceCard from "../../../components/MY_InvoiceCard";

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
  open, onClose, onComplete, document, invoices, className, ...rest
}) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleApprove = (opinion: string) => {
    onComplete(opinion, '승인');
    handleClose();
  };

  const handleReject = (opinion: string) => {
    onComplete(opinion, '반려');
    handleClose();
  };

  debugger;

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
          <div>
            <CardHeader
              classes={{root: classes.cardHeaderRoot, title: classes.cardHeaderTitle}}
              title="미결함"
              action={(
                <Button
                    // onClick={onComplete}
                  onClick={handleClickOpen}
                  color="primary"
                  variant="contained"
                >
                  결재
                </Button>
                )}
            />
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
                  md={document.signs.length + 2}
                  xs={12}
                >
                  <MY_approverLine signs={document.signs} />
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
                  <MY_InvoiceCard
                    invoices={invoices}
                    attachments={document.attachments}
                    type={'read'}
                  />
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
          </div>
          <FormDialog
            open={openDialog}
            onClose={handleClose}
            onApprove={handleApprove}
            onReject={handleReject} />
        </Card>
      </Modal>
    </>
  );
}

Index.propTypes = {
  className: PropTypes.string,
  document: PropTypes.shape(documents),
  invoices: PropTypes.array,
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  open: PropTypes.bool
};

Index.defaultProps = {
  open: false,
};

export default Index;
