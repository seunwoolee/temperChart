import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
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
      title="미결함"
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

export default ReportCreate;
