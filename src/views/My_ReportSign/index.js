import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Container} from '@material-ui/core';
import axios from "../../utils/my_axios";
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

function ReportSign() {
  const classes = useStyles();
  const [documents, setDocuments] = useState([]);
  const session = useSelector((state) => state.session);

  const handleFilter = () => {
  };

  const handleSearch = () => {
  };

  const fetchDocuments = () => {
    const headers = {Authorization: `Token ${localStorage.getItem('token')}`};
    axios.get(`ea/sign_document/${session.user.id}`, {headers}).then((response) => {
      setDocuments(response.data);
    });
  };

  useEffect(() => {
    fetchDocuments();
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
        <Header/>
        <SearchBar
          onFilter={handleFilter}
          onSearch={handleSearch}
        />
        {documents && (
          <Results
            className={classes.results}
            documents={documents}
            fetchDocuments={fetchDocuments}
          />
        )}
      </Container>
    </Page>
  );
}

export default ReportSign;
