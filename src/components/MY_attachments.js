import React, {
  useState, useCallback, useEffect, ReactHTML as styled
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  colors, CardContent
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import bytesToSize from 'src/utils/bytesToSize';
import Dialog from '@material-ui/core/Dialog';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {pdfjs, Document, Page} from 'react-pdf';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import {avatar_URL} from "../my_config";
import Typography from "@material-ui/core/Typography";
import { DialogActions } from '@material-ui/core';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(3),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 280
  },
  img: {
    width: '100%',
  },
  dialogPaper: {
    margin: theme.spacing(1)
  },
  dialogRoot: {
    // width: '100%',
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    '& .MuiDialog-container': {
      justifyContent: 'flex-end'
    },
  },
  dialogTitle: {
    padding: theme.spacing(1),
    cursor: 'move',
    backgroundColor: theme.palette.primary.main,
    '& h2': {
      color: theme.palette.primary.contrastText
    }
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));
// function MY_WindowPortal({ children }) {
//   const [containerEl, setContainerEl] = useState(document.createElement('div'));
//   let externalWindow = null;
//
//   useEffect(() => {
//     externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
//     externalWindow.document.body.appendChild(containerEl);
//
//     return () => {
//       externalWindow.close();
//     };
//   }, []);
//   return ReactDOM.createPortal(children, containerEl);
// }

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function MY_attachments({attachments, className, ...rest}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedImgPath, setSelectedImgPath] = React.useState('');
  const [contentType, setContentType] = React.useState('img');
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const handleClickOpen = (imgPath, isImg) => {
    setOpen(true);
    setSelectedImgPath(`${avatar_URL}${imgPath}`); // TODO URL 변경
    isImg ? setContentType('img') : setContentType('pdf');
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImgPath('');
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const theme =useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <>
        <PerfectScrollbar options={{suppressScrollX: true}}>
          <List className={classes.list}>
            {attachments.map((file, i) => (
              <Tooltip disableHoverListener={!(file.isImg || file.isPdf)} title="미리보기">
                <ListItem
                  button={file.isImg || file.isPdf}
                  onClick={file.isImg || file.isPdf
                    ? () => handleClickOpen(file.path, file.isImg) : null}
                  divider={i < attachments.length - 1}
                  key={uuid()}
                >
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.title}
                    primaryTypographyProps={{variant: 'h5'}}
                    secondary={bytesToSize(file.size)}
                  />
                  <ListItemSecondaryAction>
                    <a target="_blank" href={`${avatar_URL}${file.path}`}>
                      <Tooltip title="다운로드">
                        <IconButton>
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>
                    </a>
                  </ListItemSecondaryAction>
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </PerfectScrollbar>
      </>
      <Dialog
        disablePortal
        hideBackdrop
        classes={{root: classes.dialogRoot, paper: classes.dialogPaper}}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogTitle
          className={classes.dialogTitle}
          id="draggable-dialog-title">
          <Button style={{padding: 3}} onClick={handleClose} color="primary" variant="contained">닫기</Button>
        </DialogTitle>
        {contentType === 'img'
          ? (<div><img src={selectedImgPath} className={classes.img} alt="이미지" /></div>)
          : (
            <>
              <PerfectScrollbar>
                <Document
                  file={selectedImgPath}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page width={fullScreen ? 900: null} pageNumber={pageNumber} />
                </Document>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid>
                    <Button onClick={() => setPageNumber(prevPageNumber => prevPageNumber - 1)}>
                      <NavigateBeforeIcon />
                    </Button>
                  </Grid>
                  <Grid>
                    <Button onClick={() => setPageNumber(prevPageNumber => prevPageNumber + 1)}>
                      <NavigateNextIcon />
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid>
                    <p>
                      페이지
                      {' '}
                      {pageNumber}
                      {' '}
                      /
                      {numPages}
                    </p>
                  </Grid>
                </Grid>
              </PerfectScrollbar>
            </>
          )}
      </Dialog>
    </div>
  );
}

MY_attachments.propTypes = {
  attachments: PropTypes.array,
  className: PropTypes.string
};

export default MY_attachments;
