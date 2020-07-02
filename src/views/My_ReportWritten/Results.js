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
import useWindowDimensions from "../../components/WindowDimenstions";
import Index from "./Modal";
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

function Results({className, fetchDocuments, documents, page, totalCount, setPage}) {
  const [selectedDocument, setSelectedDocument] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const {height, width} = useWindowDimensions();

  const rowsPerPage = 25;

  const props = { mobileInnerHeight: getPerfectScrollbarHeight(rowsPerPage, totalCount, 60)};
  const classes = useStyles(props);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleTableClick = (id) => {
    const newDocument = documents.find(document => document.id === id);
    setSelectedDocument(newDocument);
    setOpenModal(true);
  };

  const completeReportModal = () => {
    fetchDocuments();
    setOpenModal(false);
  };

  const closeReportModal = () => {
    setOpenModal(false);
  };

  const getClassName = () => width < 1024;

  debugger;

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <LoadingBar />
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {/*{documents.length}*/}
        {totalCount}
        {' '}
        Records found. Page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {Math.ceil(totalCount / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
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
                    <TableCell className={classes.header}>타입</TableCell>
                    <TableCell className={classes.header}>G/L일자</TableCell>
                    <TableCell className={classes.header}>제목</TableCell>
                    <TableCell className={classes.header}>금액</TableCell>
                    <TableCell className={classes.header}>기안일자</TableCell>
                    <TableCell className={classes.header}>기안부서</TableCell>
                    <TableCell className={classes.header}>기안자</TableCell>
                    <TableCell className={classes.header}>문서상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*{documents.slice(startData, endData).map((document, i) => (*/}
                  {documents.map((document, i) => (
                    <TableRow
                      className={classes.tableRows}
                      onClick={() => handleTableClick(document.id)}
                      hover
                      key={document.id}
                    >
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.id}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.document_type}</TableCell>
                      <TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.invoices[0].RPDGJ}</TableCell>
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
            count={totalCount}
            onChangePage={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
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
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  fetchDocuments: PropTypes.func,
  page: PropTypes.number,
  totalCount: PropTypes.number,
  setPage: PropTypes.func,
  documents: PropTypes.array
};

Results.defaultProps = {
  documents: []
};

export default Results;
