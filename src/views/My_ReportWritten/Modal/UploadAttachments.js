import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import FilesDropzone from 'src/components/FilesDropzone';

const useStyles = makeStyles(() => ({
  root: {}
}));

function UploadAttachments({ handleAttachments, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="첨부파일" />
      <CardContent>
        <FilesDropzone handleAttachments={handleAttachments}/>
      </CardContent>
    </Card>
  );
}

UploadAttachments.propTypes = {
  handleAttachments: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default UploadAttachments;
