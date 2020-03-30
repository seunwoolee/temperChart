import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent, Grid,
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
// import getShortBigo from "../../../utils/getShortBigo";
// import {invoices} from "../../../mock";


const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // alignItems: 'center',
    // flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  supplyName: {
    width: 180,
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  stats: {
    width: 120,
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  bigo: {
    width: 330,
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

function MY_InvoiceCard({ invoices, className, attachments, handleAttachments, type, ...rest }) {
  const classes = useStyles();

  const getSumInvoices = () => getCurrency(invoices.map(invoice => invoice.RPAMT)
    .reduce((prev, curr) => prev + curr));


  return (
    <>
      <Typography variant="h5">
        총
        {' '}
        {invoices.length}
        건 /
        {' '}
        {getSumInvoices()}
        원
      </Typography>
        {invoices.map((invoice, i) => (
          <Card
            key={i}
            {...rest}
            className={clsx(classes.root, className)}
          >
          <CardContent className={classes.content}>
            <div className={classes.supplyName}>
              <Typography variant="body2">공급자명</Typography>
              <Typography variant="h6">{invoice.RPALPH}</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="body2">금액</Typography>
              <Typography variant="h6">{getCurrency(invoice.RPAMT)}</Typography>
            </div>
            <div className={classes.bigo}>
              <Typography variant="body2">비고</Typography>
              <Typography variant="h6">{getShortBigo(0, invoice.RPRMK)}</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="body2">일자</Typography>
              <Typography variant="h6">{invoice.RPDGJ}</Typography>
            </div>
          </CardContent>

          {type === 'write'
            ? (<FilesDropzone
            invoiceId={invoice.id}
            attachments={attachments}
            handleAttachments={handleAttachments}/>)
            : <MY_attachmentsBase attachments={attachments} />}
          {/*<FilesDropzone*/}
          {/*  invoiceId={invoice.id}*/}
          {/*  attachments={attachments}*/}
          {/*  handleAttachments={handleAttachments}/>*/}

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
