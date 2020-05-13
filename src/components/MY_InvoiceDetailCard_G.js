import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent, Divider, Grid,
  Typography,
} from '@material-ui/core';
import getShortBigo from "../utils/getShortBigo";
import {invoices} from "../mock";
import getCurrency from "../utils/getCurrency";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import FilesDropzone from "./FilesDropzone";
import uuid from 'uuid/v1';
import MY_attachmentsBase from "./MY_attachmentsBase";
import MY_erpDetailTable from "./MY_erpDetailTable";


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  content: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(0.1),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
  },
  contentBottom: {
    padding: theme.spacing(1),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #000000',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
  },
  erpDetailTable: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    }
  },
  supplyName: {
    // width: 180,
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  stats: {
    // width: 120,
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  bigo: {
    // width: 330,
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

function MY_InvoiceCard({ invoices, className, attachments, handleAttachments, type }) {
  const classes = useStyles();

  const getSumInvoices = () => getCurrency(invoices.map(invoice => invoice.RPZ5DEBITAT + invoice.RPZ5CREDITAT)
                                                   .reduce((prev, curr) => prev + curr) / 2);
  // const getSumInvoices = () => getCurrency(invoices.filter(invoice => invoice.RPSEQ === 1)
  //                                                   .map(invoice => invoice.RPZ5DEBITAT + invoice.RPZ5CREDITAT)
  //                                                   .reduce((prev, curr) => prev + curr));
  return (
    <>
      <Typography variant="h5">
        총
        {' '}
        {invoices.filter(invoice => invoice.RPSEQ === 1).length}
        건 /
        {' '}
        {getSumInvoices()}
        원
      </Typography>

      {invoices.filter(invoice => invoice.RPSEQ === 1).map((invoice, i) => (
        <Card
          key={i}
          className={clsx(classes.root, className)}
        >
        <CardContent className={classes.content}>
        </CardContent>
        <CardContent className={classes.contentBottom}>
          <div className={classes.bigo}>
            <Typography variant="body2">배치번호</Typography>
            <Typography variant="h6">{invoice.RPICU}</Typography>
          </div>
          <div className={classes.bigo}>
            <Typography variant="body2">문서번호</Typography>
            <Typography variant="h6">{invoice.RPDOC}</Typography>
          </div>
          <div className={classes.supplyName}>
            <Typography variant="body2">G/L일자</Typography>
            <Typography variant="h6">{invoice.RPDGJ}</Typography>
          </div>
          <div className={classes.stats}>
            <Typography variant="body2">전표유형</Typography>
            <Typography variant="h6">{invoice.RPDCT}</Typography>
          </div>
        </CardContent>
        <CardContent className={classes.erpDetailTable}>
          <MY_erpDetailTable invoices={invoices.filter(my_invoice =>  my_invoice.RPDOC === invoice.RPDOC)} />
        </CardContent>
        <Divider />

        {type === 'write'
          ? (<FilesDropzone
          invoiceId={invoice.id}
          attachments={attachments}
          handleAttachments={handleAttachments}/>)
          : <MY_attachmentsBase
            attachments={attachments.filter(attachment => attachment.invoice === invoice.id)} />}
        </Card>
      ))}
    </>
  )
}

MY_InvoiceCard.propTypes = {
  className: PropTypes.string,
  invoices: PropTypes.array.isRequired,
  attachments: PropTypes.array,
  handleAttachments: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default MY_InvoiceCard;
