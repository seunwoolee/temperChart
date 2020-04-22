import React, {useState, useCallback, useEffect, ReactHTML as styled} from 'react';
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
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Label from 'src/components/Label';
import {pdfjs, Document, Page} from 'react-pdf';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import DialogTitle from "@material-ui/core/DialogTitle";
import useWindowDimensions from "./WindowDimenstions";

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
    width: '100%',
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    '& .MuiDialog-container': {
      justifyContent: 'flex-end'
    },
  },
  dialogTitle: {
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
    setSelectedImgPath(`http://155.1.39.223:8000${imgPath}`); // TODO URL 변경
    isImg ? setContentType('img') : setContentType('pdf');
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImgPath('');
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <>
        <PerfectScrollbar options={{suppressScrollX: true}}>
          <List className={classes.list}>
            {attachments.map((file, i) => (
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
                  <a target="_blank" href={`http://155.1.39.223:8000${file.path}`}>
                    {/* TODO URL 변경 */}
                    <IconButton>
                      <GetAppIcon />
                    </IconButton>
                  </a>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </PerfectScrollbar>
      </>
      <Dialog
        disablePortal
        hideBackdrop
        classes={{root: classes.dialogRoot ,paper: classes.dialogPaper}}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogTitle  className={classes.dialogTitle} id="draggable-dialog-title">
          첨부파일
        </DialogTitle>
        {contentType === 'img'
          ? (<img src={selectedImgPath} className={classes.img} alt="이미지" />)
          : (
            <>
            <PerfectScrollbar>
              <Document
                file={selectedImgPath}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {/*<Page width={1000} pageNumber={pageNumber} />*/}
                <Page pageNumber={pageNumber} />
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
