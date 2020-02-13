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


const useStyles = makeStyles(theme=> ({
  root: {
    padding: theme.spacing(0.5)
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
  },
  header: {
    backgroundColor: '#eeeeee'
  },
  signDateCell: {
    fontSize: '10px'
  },
  gridCell: {
    fontWeight: 600,
    width: '160px',
    borderBottom: '1px solid #a9a9a9'
  }
}));


export default function ApproverTable({approvers}) {
  const classes = useStyles();

  return (

    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead className={classes.header}>
          <TableRow>
            {approvers.map(approver => (
              <TableCell key={approver.id} align="center" className={clsx(classes.gridCell, classes.root)}>{approver.position}</TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            {approvers.map(approver => (
                <TableCell key={approver.id} align="center" className={clsx(classes.gridCell, classes.root)}>{approver.name}</TableCell>
              )
            )}
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            {approvers.map(approver => (
                <TableCell
                    key={approver.id}
                    align="center"
                    className={clsx(clsx(classes.gridCell, classes.signDateCell, classes.root))}>
                  {approver.sign_date.substring(0, 10)}
                </TableCell>
              )
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ApproverTable.propTypes = {
  approvers: PropTypes.arrayOf(PropTypes.shape(signs))
};

