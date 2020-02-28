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

function FilesDropzone({ attachments, handleAttachments, className, ...rest }) {
  const classes = useStyles();
  const handleDrop = useCallback((acceptedFiles) => {
    handleAttachments((prevFiles) => [...prevFiles].concat(acceptedFiles));
  }, []);

  const handleRemoveAll = () => handleAttachments([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={classes.image}
            src="/images/undraw_add_file2_gvbb.svg"
          />
        </div>
        <div>
          <Typography
            gutterBottom
            variant="h3"
          >
            파일 선택
          </Typography>
          <Typography
            className={classes.info}
            color="textSecondary"
            variant="body1"
          >
            파일을 끌어다 올리거나 클릭하세요
          </Typography>
        </div>
      </div>
      {attachments.length > 0 && (
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
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleRemoveAll}
              size="small"
            >
              모두 삭제
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

FilesDropzone.propTypes = {
  attachments: PropTypes.array,
  handleAttachments: PropTypes.func,
  className: PropTypes.string
};

export default FilesDropzone;
