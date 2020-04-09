import React, {useState, useEffect, useCallback} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Container} from '@material-ui/core';
import Page from 'src/components/Page';
// import MY_SearchBar from 'src/components/MY_SearchBar';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import axios from "../../utils/my_axios";
import Header from './Header';
import Results from './Results';
import MY_SearchBar from "../../components/MY_SearchBar";
import {useHistory} from "react-router";
import {isloading} from "../../actions";

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


function ReportSign() {
  const classes = useStyles();
  const [inputDateValues, setInputDateValues] = useState({...initialValues});
  const [inputSearchContent, setInputSearchContent] = useState('');
  const [documents, setDocuments] = useState([]);
  const session = useSelector((state) => state.session);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFilter = () => {
  };

  const handleSearchContent = (event) => {
    setInputSearchContent(event.target.value);
  };

  const fetchDocuments = () => {
    const config = {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`},
      params: {
        startDate: moment(inputDateValues.startDate).format('YYYY-MM-DD'),
        endDate: moment(inputDateValues.endDate).format('YYYY-MM-DD'),
        search: inputSearchContent
      }
    };

    dispatch(isloading(true))
    axios.get(`ea/sign_document/${session.user.id}`, config)
      .then((response) => {
        setDocuments(response.data);
        dispatch(isloading(false))
      })
      .catch(error => dispatch(isloading(false)));
  };

  const handleSearch = () => {
    fetchDocuments();
  };

  useEffect(() => {
    if(!(localStorage.getItem('token'))) {
      history.push('/auth/login');
    }
    fetchDocuments();
  }, [session.user.id]);

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
        <MY_SearchBar
          searchContent={inputSearchContent}
          setSearchContent={handleSearchContent}
          dateValues={inputDateValues}
          setDateValues={setInputDateValues}
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
