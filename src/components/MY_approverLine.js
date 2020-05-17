import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import PropTypes from "prop-types";
import {documents} from "../mock/my_documentsMock";
import Index from "../views/My_ReportWritten/Modal";
import {signs} from "../mock/my_signsMock";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.2)
  },
  header: {
    backgroundColor: '#eeeeee'
  },
  rejectedDateCell: {
    color: 'red'
  },
  gridCell: {
    fontWeight: 600,
    fontSize: '11px',
    width: '120px',
    borderBottom: '1px solid #a9a9a9',
    borderRight: '1px solid #a9a9a9'
  },
  gridDateCell: {
    fontWeight: 600,
    fontSize: '7px',
    width: '120px',
    borderBottom: '1px solid #a9a9a9',
    borderRight: '1px solid #a9a9a9'
  },
  muiTableCell: {
    '& .MuiTableCell-sizeSmall:last-child': {
      paddingRight: theme.spacing(0.2)
    }
  },
}));


export default function ApproverTable({signs}) {
  const classes = useStyles();

  const displayApproveType = (type: string) => {
    if (type === "0") {
      return "결재";
    } if (type === "1") {
      return "합의";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table" className={classes.muiTableCell}>
        <TableHead className={classes.header}>
          <TableRow>
            {signs.map(sign => (
              <TableCell key={sign.user.id} align="center" className={clsx(classes.gridCell, classes.root)}>{sign.user.position}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {signs.map(sign => (
              <TableCell key={sign.user.id} align="center" className={clsx(classes.gridCell, classes.root)}>
                {sign.user.name}
                (
                {displayApproveType(sign.type)}
                )
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            {signs.map(sign => (
              <TableCell
                key={sign.user.id}
                align="center"
                className={sign.result === '3'
                  ? clsx(classes.gridDateCell, classes.rejectedDateCell, classes.root)
                  : clsx(classes.gridDateCell, classes.root)}
              >
                {sign.result === '3'
                  ? '(반려)'
                  : null}
                {' '}
                {sign.sign_date ? `${sign.sign_date.substring(0, 10)} ${sign.sign_date.substring(11, 16)}` : <br />}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ApproverTable.propTypes = {
  signs: PropTypes.arrayOf(PropTypes.shape(signs))
};
