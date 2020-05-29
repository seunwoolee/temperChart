import React from 'react';
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
import IconButton from "@material-ui/core/IconButton";
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {documents} from "../../../mock/my_documentsMock";
import MY_approverLine from "../../../components/MY_approverLine";
import MY_opinion from "../../../components/MY_opinion";
import MY_InvoiceDetailCard from "../../../components/MY_InvoiceDetailCard";
import {INVOICETYPE} from "../../My_ReportCreate";
import MY_InvoiceDetailCard_P from "../../../components/MY_InvoiceDetailCard_P";
import MY_InvoiceDetailCard_R from "../../../components/MY_InvoiceDetailCard_R";
import MY_InvoiceDetailCard_G from "../../../components/MY_InvoiceDetailCard_G";
import getInvoiceDetailCard from "../../../utils/getInvoiceDetailCard";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 820,
    height: 820,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
      width: '100%',
      backgroundColor: 'transparent'
    },
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  innerDiv: {
    [theme.breakpoints.up('lg')]: {
      width: '900px',
      backgroundColor: 'white'
    }
  },
  tableCellTitle: {
    textAlign: 'center',
    width: '50px',
    backgroundColor: '#eeeeee'
  },
  tableCellContent: {
    width: '100px',
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
    paddingBottom: theme.spacing(2)
  }
}));

function Index({
  open, onClose, onComplete, document, invoices, className, ...rest
}) {
  const classes = useStyles();

  let invoiceDetailCard = getInvoiceDetailCard(document.document_type, invoices, document.attachments);

  const printDocument = () => {
    window.open(
      `http://155.1.39.223:3000/reportPrint?documentId=${document.id}`,
      "_blank",
      "width=700,height=700"
    );
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
          <div className={classes.innerDiv}>
            <CardHeader
              classes={{root: classes.cardHeaderRoot, title: classes.cardHeaderTitle}}
              title="상신문서"
              action={(
                <>
                  <IconButton style={{color: 'white'}} onClick={printDocument} aria-label="settings">
                    <PrintOutlinedIcon />
                  </IconButton>
                  <Button
                    onClick={onClose}
                    color="primary"
                    variant="contained"
                  >
                    닫기
                  </Button>
                </>
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
                          <TableCell className={classes.tableCellTitle}>작성자</TableCell>
                          <TableCell className={classes.tableCellContent}>{document.author}</TableCell>
                          <TableCell className={classes.tableCellTitle}>작성일자</TableCell>
                          <TableCell className={classes.tableCellContent}>{document.created}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tableCellTitle}>제목</TableCell>
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
                  {invoiceDetailCard}
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <MY_opinion signs={document.signs.filter(sign => sign.comment !== null)}/>
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
