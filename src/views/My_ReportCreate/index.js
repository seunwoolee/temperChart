import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
// import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import {useSelector} from "react-redux";
import axios from "../../utils/my_axios";
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

function ReportCreate() {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);
  const session = useSelector((state) => state.session);

  const handleFilter = () => {};

  const handleSearch = () => {};

  useEffect(() => {
    let mounted = true;

    const fetchInvoices = () => {
      const headers = {Authorization: `Token ${localStorage.getItem('token')}`};
      axios.get('erp/voucher_list/', {headers}).then((response) => {
        if (mounted) {
          setInvoices(response.data);
        }
      });
    };

    fetchInvoices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="결재작성"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header />
        <SearchBar
          onFilter={handleFilter}
          onSearch={handleSearch}
        />
        {invoices && (
          <Results
            className={classes.results}
            invoices={invoices.filter(invoice => invoice.RPSEQ === 1)}
            totalInvoices={invoices}
          />
        )}
      </Container>
    </Page>
  );
}

export default ReportCreate;
