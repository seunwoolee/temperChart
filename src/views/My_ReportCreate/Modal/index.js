import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  TextField,
  Switch,
  Button, Table, TableBody, TableRow, TableCell, colors
} from '@material-ui/core';
import SelectedCards from "./SelectedCards";
import SimpleDialog from '../Dialog'
import UploadAttachments from "./UploadAttachments";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 800,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeaderTitle: {
    color: theme.palette.primary.contrastText
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function Index({
                 open, onClose, customers, className, ...rest
               }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPeople, setSelectedPeople] = React.useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');

  const handleChangeTitle = (event) => {
    setInputTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setInputContent(event.target.value);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = value => {
    setOpenDialog(false);
    setSelectedPeople(value);
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <Modal
        disableBackdropClick
        onClose={onClose}
        open={open}
      >
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <form>
            <CardHeader classes={{root: classes.cardHeaderRoot, title: classes.cardHeaderTitle}} title="기안 작성"/>
            <Divider/>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>작성자</TableCell>
                        <TableCell>이승우</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>작성일자</TableCell>
                        <TableCell>2020-01-02</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="제목"
                    name="title"
                    onChange={handleChangeTitle}
                    value={inputTitle}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    multiline
                    rows="3"
                    rowsMax="50"
                    fullWidth
                    label="내용"
                    name="title"
                    onChange={handleChangeContent}
                    value={inputContent}
                    variant="outlined"
                  />
                </Grid>
                <Divider/>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  {customers.map((customer) => (
                    <SelectedCards
                      key={customer.id}
                      selectedCustomers={customer}
                    />
                  ))}
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <UploadAttachments />
                </Grid>
              </Grid>
            </CardContent>
            <Divider/>
            <CardActions className={classes.actions}>
              <Button onClick={onClose}>
                닫기
              </Button>
              <Button
                color="primary"
                onClick={handleClickOpen}
                variant="contained"
              >
                결재요청
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
      <SimpleDialog open={openDialog} onClose={handleClose} />
    </>
  );
}

Index.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

Index.defaultProps = {
  open: false,
  onClose: () => {
  }
};

export default Index;
