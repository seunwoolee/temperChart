import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import MY_attachments from "./MY_attachments";

const useStyles = makeStyles(() => ({
  root: {}
}));

function MY_attachmentsBase({ attachments, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/*<CardHeader title="첨부파일" />*/}
      <CardContent>
        <MY_attachments attachments={attachments} />
      </CardContent>
    </Card>
  );
}

MY_attachmentsBase.propTypes = {
  attachments: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default MY_attachmentsBase;
