import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import MY_attachments from "./MY_attachments";
import * as uuid from "uuid";

const useStyles = makeStyles(() => ({
  root: {}
}));

function MY_attachmentsBase({ attachments}) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
      {attachments.length > 0
        ? (
       <CardContent>
         <MY_attachments attachments={attachments} />
       </CardContent>
      ): null}
    </Card>
  );
}

MY_attachmentsBase.propTypes = {
  attachments: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default MY_attachmentsBase;
