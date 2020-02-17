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
import BottomBar from "./BottomBar/BottomBar";
import getShortBigo from "../../utils/getShortBigo";
import useWindowDimensions from "../../components/WindowDimenstions";
import Index from "./Modal";
import getCurrency from "../../utils/getCurrency";
// import {documents} from "../../mock";
import MySnackbars from "../../components/MY_snackbar";
import getPerfectScrollbarHeight from "../../utils/getPerfectScrollbarHeight";
import {documents} from "../../mock/my_documentsMock";

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

function Results({className, documents, ...rest}) {
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openModal, setOpenModal] = useState(false);
  const {height, width} = useWindowDimensions();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const props = { mobileInnerHeight: getPerfectScrollbarHeight(rowsPerPage, documents.length, 60)};
  const classes = useStyles(props);

  const handleSelectAll = (event) => {
    event.target.checked ? setSelectedDocuments(documents) : setSelectedDocuments([]);
  };

  const handleSelectOne = (event, invoice) => {
    const selectedIndex = selectedDocuments.map(invoice => invoice.id).indexOf(invoice.id);
    let newSelectedInvocies = [];

    if (selectedIndex === -1) {
      newSelectedInvocies = newSelectedInvocies.concat(selectedDocuments, invoice);
    } else if (selectedIndex === 0) {
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedDocuments.slice(1)
      );
    } else if (selectedIndex === selectedDocuments.length - 1) {
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedDocuments.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedInvocies = newSelectedInvocies.concat(
        selectedDocuments.slice(0, selectedIndex),
        selectedDocuments.slice(selectedIndex + 1)
      );
    }
    setSelectedDocuments(newSelectedInvocies);
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
    const newDocuments = selectedDocuments.slice(1);
    if(newDocuments.length === 0){
      setOpenModal(false);
    }
    setSelectedDocuments(newDocuments);

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
          title="미결함"
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
                        checked={selectedDocuments.length === documents.length}
                        color="primary"
                        indeterminate={
                          selectedDocuments.length > 0
                          && selectedDocuments.length < documents.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
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
                      hover
                      key={document.id}
                      selected={selectedDocuments.map(document => document.id).indexOf(document.id) !== -1}
                    >
                      <TableCell align="center" padding="checkbox">
                        <Checkbox
                          checked={
                            selectedDocuments.map(document => document.id).indexOf(document.id) !== -1
                          }
                          color="primary"
                          onChange={(event) => handleSelectOne(event, document)}
                          value={selectedDocuments.map(document => document.id).indexOf(document.id) !== -1}
                        />
                      </TableCell>

                      <TableCell align='center' className={classes.whiteSpaceNoWrap }>{i}</TableCell>
                      <TableCell className={classes.whiteSpaceNoWrap}>{document.title}</TableCell>
                      <TableCell align='center' className={classes.whiteSpaceNoWrap}>
                        {document.created}
                      </TableCell>
                      <TableCell align='center' className={classes.whiteSpaceNoWrap}>
                        {document.group}
                      </TableCell>
                      <TableCell align='center' className={classes.whiteSpaceNoWrap}>
                        {document.author}
                      </TableCell>
                      <TableCell align='center'>{document.doc_status}</TableCell>


                      {/*<TableCell align="center">*/}
                      {/*  <div className={clsx(classes.nameCell, classes.whiteSpaceNoWrap)}>*/}
                      {/*    {document.id}*/}
                      {/*  </div>*/}
                      {/*</TableCell>*/}
                      {/*<TableCell align="center" className={classes.whiteSpaceNoWrap}>{document.title}</TableCell>*/}
                      {/*<TableCell align="center" className={classes.whiteSpaceNoWrap}>*/}
                      {/*  {getCurrency(document.총액)}*/}
                      {/*</TableCell>*/}
                      {/*<TableCell align="center" className={classes.whiteSpaceNoWrap}>*/}
                      {/*  <div className={classes.nameCell}>*/}
                      {/*    <Avatar*/}
                      {/*      className={classes.avatar}*/}
                      {/*      src={document.avatar}*/}
                      {/*    />*/}
                      {/*    {document.사용자}*/}
                      {/*  </div>*/}
                      {/*</TableCell>*/}
                      {/*<TableCell>{getShortBigo(width, document.비고)}</TableCell>*/}
                      {/*<TableCell align="center" className={classes.whiteSpaceNoWrap}>*/}
                      {/*  {document.배치번호 + Math.floor(Math.random() * 70)}*/}
                      {/*</TableCell>*/}
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
      <BottomBar onOpenModal={openReportModal} selected={selectedDocuments} />
      {openModal && selectedDocuments.length
         && (
        <Index
          document={selectedDocuments[0]}
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
  documents: PropTypes.arrayOf(PropTypes.shape(documents))
};

Results.defaultProps = {
  documents: []
};

export default Results;
