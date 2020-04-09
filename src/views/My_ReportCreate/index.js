import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Container} from '@material-ui/core';
// import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../utils/my_axios";
import Header from './Header';
import Results from './Results';
import moment from "moment";
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

function ReportCreate() {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);
  const [inputDateValues, setInputDateValues] = useState({...initialValues});
  const [inputSearchContent, setInputSearchContent] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearchContent = (event) => {
    setInputSearchContent(event.target.value);
  };

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
    dispatch(isloading(true))
    axios.get('erp/voucher_list/', config)
      .then((response) => {
        dispatch(isloading(false))
        setInvoices(response.data);
      })
      .catch(error => dispatch(isloading(false)));
  };

  useEffect(() => {
    if (!(localStorage.getItem('token'))) {
      history.push('/auth/login');
    }
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
        <Header/>
        <MY_SearchBar
          searchContent={inputSearchContent}
          setSearchContent={handleSearchContent}
          dateValues={inputDateValues}
          setDateValues={setInputDateValues}
          onSearch={handleSearch}
        />
        {invoices && (
          <Results
            className={classes.results}
            invoices={invoices.filter(invoice => invoice.RPSFX === '001' && invoice.RPSEQ === 1)}
            fetchInvoices={fetchInvoices}
            totalInvoices={invoices}
          />
        )}
      </Container>
    </Page>
  );
}

export default ReportCreate;
