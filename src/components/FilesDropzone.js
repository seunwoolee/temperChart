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
    padding: theme.spacing(1),
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
    width: 70
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 140
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

function FilesDropzone({ invoiceId, attachments, handleAttachments, className, ...rest }) {
  const classes = useStyles();
  const [invoiceAttachments, setInvoiceAttachments] = useState([]);
  const handleDrop = (acceptedFiles) => {
    const newAttachments ={};
    newAttachments[invoiceId] = acceptedFiles;

    handleAttachments((prevFiles) => {
      const prevInvoiceAttachments: Array = prevFiles.filter(file => invoiceId in file)
      const prevOthersAttachments: Array = prevFiles.filter(file => !(invoiceId in file))
      if(prevInvoiceAttachments.length > 0) {
        newAttachments[invoiceId] = [...prevInvoiceAttachments[0][invoiceId], ...newAttachments[invoiceId]]
      }
      return [...prevOthersAttachments, newAttachments]
    });
  };

  useEffect(() => {
    const newAttachments: Array = attachments.filter(attachment => invoiceId in attachment)
    if(newAttachments.length > 0) {
      return setInvoiceAttachments(newAttachments[0][invoiceId])
    }
    setInvoiceAttachments(newAttachments)
  }, [attachments])

  const handleRemoveAll = (invoiceId) => {
    const othersAttachments: Array = attachments.filter(attachment => !(invoiceId in attachment))
    handleAttachments([...othersAttachments])
  };

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
            variant="h4"
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
      {invoiceAttachments.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {invoiceAttachments.map((file, i) => (
                <ListItem
                  divider={i < invoiceAttachments.length - 1}
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
              onClick={()=>handleRemoveAll(invoiceId)}
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
  invoiceId: PropTypes.number,
  attachments: PropTypes.array,
  handleAttachments: PropTypes.func,
  className: PropTypes.string
};

export default FilesDropzone;
