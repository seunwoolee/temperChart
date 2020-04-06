import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import {useSelector} from "react-redux";
import { useLocation} from "react-router";
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


function ReportWritten() {
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);
  const [inputDateValues, setInputDateValues] = useState({...initialValues});
  const [inputSearchContent, setInputSearchContent] = useState('');
  const session = useSelector((state) => state.session);
  const location = useLocation();

  const handleSearchContent = (event) => {
    setInputSearchContent(event.target.value);
  };

  const handleFilter = () => {};

  const handleSearch = () => {
    fetchDocuments();
  };

  const fetchDocuments = () => {
    let url = `ea/written_document/${session.user.id}`;

    if (location.pathname === '/reportRejected') {
      url = `ea/rejected_document/${session.user.id}`;
    } else if (location.pathname === '/reportApproved') {
      url = `ea/approved_document/${session.user.id}`;
    }

    const config = {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`},
      params: {
        startDate: moment(inputDateValues.startDate).format('YYYY-MM-DD'),
        endDate: moment(inputDateValues.endDate).format('YYYY-MM-DD'),
        search: inputSearchContent
      }
    };

    // const headers = {Authorization: `Token ${localStorage.getItem('token')}`};

    axios.get(url, config).then((response) => {
      setDocuments(response.data);

    });
    // axios.get(url, {headers}).then((response) => {
    //   setDocuments(response.data);
    // });
  };

  useEffect(() => {
    fetchDocuments();
  }, [location.pathname, session.user.id]);

  return (
    <Page
      className={classes.root}
      title="상신함"
    >
      <Container maxWidth={false}>
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
        {documents && (
          <Results
            className={classes.results}
            documents={documents}
          />
        )}
      </Container>
    </Page>
  );
}

export default ReportWritten;
