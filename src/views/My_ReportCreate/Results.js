import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
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
  Button,
  Link,
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
// import WriteReportModal from "../CustomerManagementDetails/Summary/WriteReporttModal";

const useStyles = makeStyles((theme) => ({
  root: {},
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
  mobileInner: {
    minWidth: 700,
    whiteSpace: 'nowrap'
  },
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
  }
}));

function Results({className, invoices, ...rest}) {
  const classes = useStyles();
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [selectedInvoicesDatas, setSelectedInvoicesDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const {height, width} = useWindowDimensions();

  const handleSelectAll = (event) => {
    const selectedInvoices = event.target.checked
      ? invoices.map((invoice) => invoice.id)
      : [];

    setSelectedInvoices(selectedInvoices);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedInvoices.indexOf(id);
    let newSelectedInvocies = [];

    if (selectedIndex === -1) {
      newSelectedInvocies = newSelectedInvocies.concat(selectedInvoices, id);
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

  // eslint-disable-next-line max-len
  const getSelectedCustomers = () => invoices.filter(customer => selectedInvoices.includes(customer.id));

  const openReportModal = () => setOpenModal(true);

  const closeReportModal = () => setOpenModal(false);

  const getClassName = () => width < 1024;


  useEffect(() => {
    setSelectedInvoicesDatas(getSelectedCustomers());
  }, [openModal]);

  let modal = null;
  if (openModal) {
    modal = (
      <Index
        invoices={selectedInvoicesDatas}
        onClose={closeReportModal}
        open={openModal}
      />
    );
  }

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
                    <TableCell padding="checkbox">
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
                    <TableCell>공급자명</TableCell>
                    <TableCell>일자</TableCell>
                    <TableCell>총액</TableCell>
                    <TableCell>사용자</TableCell>
                    <TableCell>비고</TableCell>
                    <TableCell>배치번호</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.slice(0, rowsPerPage).map((customer) => (
                    <TableRow
                      hover
                      key={customer.id}
                      selected={selectedInvoices.indexOf(customer.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedInvoices.indexOf(customer.id) !== -1
                          }
                          color="primary"
                          onChange={(event) => handleSelectOne(event, customer.id)}
                          value={selectedInvoices.indexOf(customer.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={clsx(classes.nameCell, classes.whiteSpaceNoWrap)}>
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to="/management/customers/1"
                              variant="h6"
                            >
                              {customer.공급자명}
                            </Link>
                            <div>{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>{customer.일자}</TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>
                        {getCurrency(customer.총액)}
                      </TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src={customer.avatar}
                          />
                          {customer.사용자}
                        </div>
                      </TableCell>
                      <TableCell>{getShortBigo(width, customer.비고)}</TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>
                        {customer.배치번호 + Math.floor(Math.random() * 70)}
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
      {modal}
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
