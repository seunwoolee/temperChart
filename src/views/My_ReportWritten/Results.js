import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import {useSelector} from "react-redux";
import useWindowDimensions from "../../components/WindowDimenstions";
import Index from "./Modal";
import {documents} from '../../mock/my_documentsMock';
import getPerfectScrollbarHeight from "../../utils/getPerfectScrollbarHeight";
import LoadingBar from "../../components/MY_LoadingBar";
import getCurrency from "../../utils/getCurrency";

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
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const {height, width} = useWindowDimensions();

  const startData = page * rowsPerPage;
  const endData = (page * rowsPerPage) + rowsPerPage;

  const props = { mobileInnerHeight: getPerfectScrollbarHeight(rowsPerPage, documents.length, 60)};
  const classes = useStyles(props);

  useEffect(() => {
    setPage(0);
  }, [documents]);

  const handleChangePage = (event, page) => setPage(page);

  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value);

  const handleTableClick = (id) => {
    const newDocument = documents.find(document => document.id === id);
    setSelectedDocument(newDocument);
    setOpenModal(true);
  };

  const completeReportModal = () => {
  };

  const closeReportModal = () => {
    setOpenModal(false);
  };

  const getClassName = () => width < 1024;

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
          // action={<GenericMoreButton />}
          title="결재 내역"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={getClassName() ? classes.mobileInner : classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.header}>결재번호</TableCell>
                    <TableCell className={classes.header}>제목</TableCell>
                    <TableCell className={classes.header}>금액</TableCell>
                    <TableCell className={classes.header}>기안일자</TableCell>
                    <TableCell className={classes.header}>기안부서</TableCell>
                    <TableCell className={classes.header}>기안자</TableCell>
                    <TableCell className={classes.header}>문서상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*{documents.slice(0, rowsPerPage).map((document, i) => (*/}
                  {documents.slice(startData, endData).map((document, i) => (
                    <TableRow
                      className={classes.tableRows}
                      onClick={() => handleTableClick(document.id)}
                      hover
                      key={document.id}
                    >
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.id}</TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>{document.title}</TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>{getCurrency(document.price)}</TableCell>
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
        invoices={selectedDocument.invoices}
        onClose={closeReportModal}
        onComplete={completeReportModal}
        open={openModal}
      />
      ) }
      {/*{snackbarOpen*/}
      {/*  ? <MySnackbars open={snackbarOpen} setOpen={handleSnackbarOpen} isSuccess={isSuccess} />*/}
      {/*  : null}*/}
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  documents: PropTypes.array
};

Results.defaultProps = {
  documents: []
};

export default Results;
