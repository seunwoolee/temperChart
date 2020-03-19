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
import {useSelector} from "react-redux";
import useWindowDimensions from "../../components/WindowDimenstions";
import Index from "./Modal";
import MySnackbars from "../../components/MY_snackbar";
import {documents} from '../../mock/my_documentsMock';
import getPerfectScrollbarHeight from "../../utils/getPerfectScrollbarHeight";
import axios from "../../utils/my_axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    fontWeight: 650,
    textAlign: 'center',
  },
  tableRows: {
    cursor: 'pointer'
  },
  content: {
    textAlign: 'center',
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
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  nameCell: {
    fontColor: 'red',
    display: 'flex',
    alignItems: 'center'
  },
}));

function Results({className, documents, ...rest}) {
  const [page, setPage] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const {height, width} = useWindowDimensions();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const session = useSelector((state) => state.session);

  const props = { mobileInnerHeight: getPerfectScrollbarHeight(rowsPerPage, documents.length, 60)};
  const classes = useStyles(props);

  const handleChangePage = (event, page) => setPage(page);

  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value);

  const handleTableClick = (id) => {
    const newDocument = documents.find(document => document.id === id);
    const headers = {Authorization: `Token ${session.token}`};
    axios.get(`erp/voucher_list/${newDocument.batch_number}`, {headers})
      .then((response) => {
        setInvoices(response.data);
        setSelectedDocument(newDocument);
        setOpenModal(true);
      });
  };

  const completeReportModal = () => {
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
        {documents.length}
        {' '}
        Records found. Page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {Math.ceil(documents.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="상신 내역"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={getClassName() ? classes.mobileInner : classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.header}>문서번호</TableCell>
                    <TableCell className={classes.header}>제목</TableCell>
                    <TableCell className={classes.header}>기안일자</TableCell>
                    <TableCell className={classes.header}>기안부서</TableCell>
                    <TableCell className={classes.header}>기안자</TableCell>
                    <TableCell className={classes.header}>문서상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.slice(0, rowsPerPage).map((document, i) => (
                    <TableRow
                      className={classes.tableRows}
                      onClick={() => handleTableClick(document.id)}
                      hover
                      key={document.id}
                    >
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.id}</TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>{document.title}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.created}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.department}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.author}</TableCell>
                      <TableCell align="center">{document.doc_status}</TableCell>
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
            count={documents.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      {openModal
      && (
      <Index
        document={selectedDocument}
        invoices={invoices}
        onClose={closeReportModal}
        onComplete={completeReportModal}
        open={openModal}
      />
      ) }
      {snackbarOpen
        ? <MySnackbars open={snackbarOpen} setOpen={handleSnackbarOpen} isSuccess={isSuccess} />
        : null}
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.shape(documents))
};

Results.defaultProps = {
  documents: []
};

export default Results;
