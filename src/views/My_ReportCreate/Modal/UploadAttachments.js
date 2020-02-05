import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import FilesDropzone from 'src/components/FilesDropzone';

const useStyles = makeStyles(() => ({
  root: {}
}));

function UploadAttachments({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="첨부파일" />
      <CardContent>
        <FilesDropzone />
      </CardContent>
    </Card>
  );
}

UploadAttachments.propTypes = {
  className: PropTypes.string
};

export default UploadAttachments;
