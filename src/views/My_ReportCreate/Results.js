import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import BottomBar from "./BottomBar";
import getShortBigo from "../../utils/getShortBigo";
import useWindowDimensions from "../../components/WindowDimenstions";
import Index from "./Modal";
import getCurrency from "../../utils/getCurrency";
import {invoices} from "../../mock";
import MySnackbars from "../../components/MY_snackbar";
import getPerfectScrollbarHeight from "../../utils/getPerfectScrollbarHeight";
// import WriteReportModal from "../CustomerManagementDetails/Summary/WriteReporttModal";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    fontWeight: 650,
    textAlign: 'center',
  },
  content: {
    padding: 0
  },
  supplyCell: {
    fontFamily: 'GmarketSansBold',
  },
  inner: {
    minWidth: 700,
  },
  whiteSpaceNoWrap: {
    whiteSpace: 'nowrap'
  },
  mobileInner: props => ({
    minWidth: 500,
    height: props.mobileInnerHeight,
    whiteSpace: 'nowrap'
  }),
  nameCell: {
    fontColor: 'red',
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  tableRow: {
    cursor: 'pointer'
  }
}));

function Results({className, invoices, ...rest}) {
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const {height, width} = useWindowDimensions();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const props = { mobileInnerHeight: getPerfectScrollbarHeight(rowsPerPage, invoices.length, 80)};
  const classes = useStyles(props);

  const handleSelectAll = (event) => {
    event.target.checked ? setSelectedInvoices(invoices) : setSelectedInvoices([]);
  };

  const handleSelectOne = (event, invoice) => {
    const selectedIndex = selectedInvoices.map(invoice => invoice.id).indexOf(invoice.id);
    let newSelectedInvocies = [];

    if (selectedIndex === -1) {
      newSelectedInvocies = newSelectedInvocies.concat(selectedInvoices, invoice);
    } else if (selectedIndex === 0) {
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedInvoices.slice(1)
      );
    } else if (selectedIndex === selectedInvoices.length - 1) {
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedInvoices.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedInvoices.slice(0, selectedIndex),
        selectedInvoices.slice(selectedIndex + 1)
      );
    }
    setSelectedInvoices(newSelectedInvocies);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const openReportModal = () => setOpenModal(true);

  const completeReportModal = () => {
    setSnackbarOpen(true);
    setIsSuccess(true);
    setOpenModal(false);
    setSelectedInvoices([]);
  };

  const closeReportModal = () => {
    setOpenModal(false);
  };

  const getClassName = () => width < 1024;

  const handleSnackbarOpen = (bool) => {
    setSnackbarOpen(bool);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {invoices.length}
        {' '}
        Records found. Page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {Math.ceil(invoices.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="전표 내역"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={getClassName() ? classes.mobileInner : classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" padding="checkbox">
                      <Checkbox
                        checked={selectedInvoices.length === invoices.length}
                        color="primary"
                        indeterminate={
                          selectedInvoices.length > 0
                          && selectedInvoices.length < invoices.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell className={classes.header}>공급자명</TableCell>
                    <TableCell className={classes.header}>일자</TableCell>
                    <TableCell className={classes.header}>총액</TableCell>
                    <TableCell className={classes.header}>사용자</TableCell>
                    <TableCell className={classes.header}>비고</TableCell>
                    <TableCell className={clsx(classes.header, classes.whiteSpaceNoWrap)}>배치번호</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.slice(0, rowsPerPage).map((invoice) => (
                    <TableRow
                      hover
                      key={invoice.id}
                      selected={selectedInvoices.map(invoice => invoice.id).indexOf(invoice.id) !== -1}
                    >
                      <TableCell align="center" padding="checkbox">
                        <Checkbox
                          checked={
                            selectedInvoices.map(invoice => invoice.id).indexOf(invoice.id) !== -1
                          }
                          color="primary"
                          onChange={(event) => handleSelectOne(event, invoice)}
                          value={selectedInvoices.map(invoice => invoice.id).indexOf(invoice.id) !== -1}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className={clsx(classes.nameCell, classes.whiteSpaceNoWrap)}>
                          {invoice.공급자명}
                        </div>
                      </TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{invoice.일자}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>
                        {getCurrency(invoice.총액)}
                      </TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src={invoice.avatar}
                          />
                          {invoice.사용자}
                        </div>
                      </TableCell>
                      <TableCell>{getShortBigo(width, invoice.비고)}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>
                        {invoice.배치번호 + Math.floor(Math.random() * 70)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={invoices.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <BottomBar onOpenModal={openReportModal} selected={selectedInvoices} />
      {openModal
        && (
        <Index
          invoices={selectedInvoices}
          onClose={closeReportModal}
          onComplete={completeReportModal}
          open={openModal}
        />
        ) }
      {snackbarOpen ? <MySnackbars open={snackbarOpen} setOpen={handleSnackbarOpen} isSuccess={isSuccess} /> : null}

    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  invoices: PropTypes.arrayOf(PropTypes.shape(invoices))
};

Results.defaultProps = {
  invoices: []
};

export default Results;
