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
import {invoices, voucher} from "../../mock";
import MySnackbars from "../../components/MY_snackbar";
import getPerfectScrollbarHeight from "../../utils/getPerfectScrollbarHeight";
import LoadingBar from "../../components/MY_LoadingBar";

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

function Results({className, invoices, totalInvoices, fetchInvoices, ...rest}) {
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const {height, width} = useWindowDimensions();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  let prevBatchNumber = 0;
  const startData = page * rowsPerPage;
  const endData = (page * rowsPerPage) + rowsPerPage;
  const dispalyedInvoices = invoices.slice(startData, endData);
  const props = {mobileInnerHeight: getPerfectScrollbarHeight(rowsPerPage, invoices.length, 50)};
  const classes = useStyles(props);

  const handleSelectAll = (event) => {
    event.target.checked ? setSelectedInvoices(dispalyedInvoices) : setSelectedInvoices([]);
  };

  const getSameBatchInvoices = (invoice) => selectedInvoices.filter(my_invoice => my_invoice.RPICU === invoice.RPICU);

  const handleSelectOne = (event, invoice) => {
    const selectedIndex = selectedInvoices.map(invoice => invoice.RPICU).indexOf(invoice.RPICU);
    const sameBatchInvoices = getSameBatchInvoices(invoice);
    let newSelectedInvocies = [];

    if (selectedIndex === -1) { // check this one
      const sameBatchInvoices = invoices.filter(my_invoice => my_invoice.RPICU === invoice.RPICU);
      newSelectedInvocies = newSelectedInvocies.concat(selectedInvoices, sameBatchInvoices);
    } else if (selectedIndex === 0) { // uncheck this one
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedInvoices.slice(sameBatchInvoices.length)
      );
    } else if (selectedIndex === selectedInvoices.length - 1) { // uncheck last one
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedInvoices.slice(0, -sameBatchInvoices.length)
      );
    } else if (selectedIndex > 0) { // uncheck n-nth one
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedInvoices.slice(0, selectedIndex), // 앞에꺼 추가
        selectedInvoices.slice(selectedIndex + sameBatchInvoices.length) // 뒤에꺼 추가
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

  const completeReportModal = (result: boolean = true) => {
    const sameBatchInvoices = getSameBatchInvoices(selectedInvoices[0]);
    const newInvoices = selectedInvoices.slice(sameBatchInvoices.length);
    if (newInvoices.length === 0) {
      setOpenModal(false);
      fetchInvoices();
    }
    setSelectedInvoices(newInvoices);
    setIsSuccess(result);
    setSnackbarOpen(true);
  };

  const closeReportModal = () => {
    setOpenModal(false);
  };

  const getClassName = () => width < 1024;

  const handleSnackbarOpen = (bool) => {
    setSnackbarOpen(bool);
  };

  const createColspanData = (batchNumber) => {
    prevBatchNumber = batchNumber;
    return invoices.filter(invoice => prevBatchNumber === invoice.RPICU);
  };

  const tableRowcheckBox = (invoice) => {
    const sameBatchInvoices = createColspanData(invoice.RPICU);
    return (
      <TableCell
        // rowSpan={sameBatchInvoices.length}
        align="center"
        padding="checkbox"
      >
        <Checkbox
          checked={
            selectedInvoices.map(invoice => invoice.id).indexOf(invoice.id) !== -1
          }
          color="primary"
          onChange={(event) => handleSelectOne(event, invoice)}
          // onChange={(event) => handleSelectOne(event, sameBatchInvoices)}
          value={selectedInvoices.map(invoice => invoice.id).indexOf(invoice.id) !== -1}
        />
      </TableCell>
    );
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <LoadingBar />
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
                        checked={selectedInvoices.length === dispalyedInvoices.length}
                        color="primary"
                        indeterminate={
                          selectedInvoices.length > 0
                          && selectedInvoices.length < dispalyedInvoices.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell className={classes.header}>배치번호</TableCell>
                    <TableCell className={classes.header}>공급자명</TableCell>
                    <TableCell className={classes.header}>G/L일자</TableCell>
                    <TableCell className={classes.header}>금액</TableCell>
                    <TableCell className={classes.header}>비고</TableCell>
                    <TableCell className={classes.header}>작성자</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dispalyedInvoices.map((invoice) => (
                    <TableRow
                      hover
                      key={invoice.id}
                      selected={selectedInvoices.map(invoice => invoice.id).indexOf(invoice.id) !== -1}
                    >
                      {invoice.RPICU !== prevBatchNumber ? tableRowcheckBox(invoice) : (
                        <TableCell />
                      )}
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{invoice.RPICU}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{invoice.RPALPH}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{invoice.RPDGJ}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>
                        {getCurrency(invoice.RPAMT)}
                      </TableCell>
                      <TableCell>{getShortBigo(width, invoice.RPRMK)}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{invoice.RPNAME}</TableCell>
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
      {openModal && selectedInvoices.length
      && (
        <Index
          // invoices={selectedInvoices.filter(invoice => invoice.RPICU === selectedInvoices[0].RPICU)} // 0, 같은 배치번호까지
          invoices={totalInvoices.filter(invoice => invoice.RPICU === selectedInvoices[0].RPICU)} // 0, 같은 배치번호까지
          onClose={closeReportModal}
          onComplete={completeReportModal}
          open={openModal}
        />
      )}
      {snackbarOpen ? <MySnackbars open={snackbarOpen} setOpen={handleSnackbarOpen} isSuccess={isSuccess} /> : null}

    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  invoices: PropTypes.arrayOf(PropTypes.shape(voucher)).isRequired,
  fetchInvoices: PropTypes.func.isRequired,
  totalInvoices: PropTypes.arrayOf(PropTypes.shape(voucher)).isRequired
};

Results.defaultProps = {
  invoices: []
};

export default Results;
