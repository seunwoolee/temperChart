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
// import getShortBigo from "../../../utils/getShortBigo";
// import {invoices} from "../../../mock";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
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
  stats: {
    width: 150,
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

function MY_InvoiceCard({ invoices, className, ...rest }) {
  const classes = useStyles();

  const getSumInvoices = () => getCurrency(invoices.map(invoice => invoice.price)
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
        {invoices.map(invoice => (
          <Card
            {...rest}
            className={clsx(classes.root, className)}
          >
          <CardContent className={classes.content}>
            <div className={classes.stats}>
              <Typography variant="body2">공급자명</Typography>
              <Typography variant="h6">{invoice.supplyNumber}</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="body2">금액</Typography>
              <Typography variant="h6">{getCurrency(invoice.price)}</Typography>
            </div>
            <div className={classes.bigo}>
              <Typography variant="body2">비고</Typography>
              <Typography variant="h6">{getShortBigo(0, invoice.bigo)}</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="body2">일자</Typography>
              <Typography variant="h6">{invoice.gl_ymd}</Typography>
            </div>
          </CardContent>
          </Card>
        ))}
    </>
  )
}

MY_InvoiceCard.propTypes = {
  className: PropTypes.string,
  invoices: PropTypes.array.isRequired
};

export default MY_InvoiceCard;
