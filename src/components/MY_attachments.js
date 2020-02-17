import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  colors
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import bytesToSize from 'src/utils/bytesToSize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from "@material-ui/core/IconButton";
import Label from 'src/components/Label';
import moment from "moment";

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
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function MY_attachments({ attachments, className, ...rest }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedImgPath, setSelectedImgPath] = React.useState('');

  const handleClickOpen = (imgPath) => {
    setOpen(true);
    setSelectedImgPath(imgPath);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImgPath('');
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <List className={classes.list}>
            {attachments.map((file, i) => (
              <ListItem
                button={file.isImg}
                onClick={file.isImg ? () =>handleClickOpen(file.path) : null}
                divider={i < attachments.length - 1}
                key={uuid()}
              >
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={file.title}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={bytesToSize(file.size)}
                />
                <ListItemSecondaryAction>
                  <a target="_blank" href={file.path} download="ilovecheese">
                  <Label >
                      DownLoad
                  </Label>
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
        classes={{paper: classes.dialogPaper}}
        maxWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <img src={selectedImgPath} className={classes.img}  alt='이미지'/>
      </Dialog>
    </div>
  );
}

MY_attachments.propTypes = {
  attachments: PropTypes.array,
  className: PropTypes.string
};

export default MY_attachments;
