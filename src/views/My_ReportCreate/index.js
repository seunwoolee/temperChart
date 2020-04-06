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
import moment from "moment";
import MY_SearchBar from "../../components/MY_SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));


const initialValues = {
  name: '',
  startDate: moment().add(-3, 'month'),
  endDate: moment()
};

function ReportCreate() {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);
  const [inputDateValues, setInputDateValues] = useState({...initialValues});
  const [inputSearchContent, setInputSearchContent] = useState('');

  const session = useSelector((state) => state.session);

  const handleSearchContent = (event) => {
    setInputSearchContent(event.target.value);
  };

  const handleFilter = () => {};

  const handleSearch = () => {
    fetchInvoices();
  };

  const fetchInvoices = () => {
    const config = {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`},
      params: {
        startDate: moment(inputDateValues.startDate).format('YYYY-MM-DD'),
        endDate: moment(inputDateValues.endDate).format('YYYY-MM-DD'),
        search: inputSearchContent
      }
    };

    axios.get('erp/voucher_list/', config).then((response) => {
      setInvoices(response.data);
    });
  };

  useEffect(() => {
    fetchInvoices();
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
        <MY_SearchBar
          searchContent={inputSearchContent}
          setSearchContent={handleSearchContent}
          dateValues={inputDateValues}
          setDateValues={setInputDateValues}
          onFilter={handleFilter}
          onSearch={handleSearch}
        />
        {/*<SearchBar*/}
        {/*  onFilter={handleFilter}*/}
        {/*  onSearch={handleSearch}*/}
        {/*/>*/}
        {invoices && (
          <Results
            className={classes.results}
            invoices={invoices.filter(invoice => invoice.RPSFX === '001' && invoice.RPSEQ === 1)}
            totalInvoices={invoices}
          />
        )}
      </Container>
    </Page>
  );
}

export default ReportCreate;
