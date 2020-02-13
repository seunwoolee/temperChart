import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import MY_approverLine from "../../components/MY_approverLine";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

function ReportWritten() {
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);

  const handleFilter = () => {};

  const handleSearch = () => {};

  useEffect(() => {
    let mounted = true;

    const fetchDocuments = () => {
      axios.get('/api/documents').then((response) => {
        if (mounted) {
          setDocuments(response.data.documents);
        }
      });
    };

    fetchDocuments();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="상신함"
    >
      <Container maxWidth={false}>
        <Header />
        <SearchBar
          onFilter={handleFilter}
          onSearch={handleSearch}
        />
        {documents && (
          <Results
            className={classes.results}
            documents={documents}
          />
        )}
      </Container>
      {/*<MY_approverLine />*/}
    </Page>
  );
}

export default ReportWritten;
