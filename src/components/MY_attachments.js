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

  console.log(attachments);

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
                divider={i < attachments.length - 1}
                key={uuid()}
              >
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <a target="_blank" href={file.path} download="ilovecheese">
                <ListItemText
                  primary={file.title}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={bytesToSize(file.size)}
                />
                </a>
              </ListItem>
            ))}
          </List>
        </PerfectScrollbar>
      </>
    </div>
  );
}

MY_attachments.propTypes = {
  attachments: PropTypes.func,
  className: PropTypes.string
};

export default MY_attachments;
