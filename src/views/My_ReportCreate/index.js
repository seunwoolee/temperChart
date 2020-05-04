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
import {useHistory, useLocation} from "react-router";
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

export const INVOICETYPE = Object.freeze({
    채무발생: "채무발생",
    채무정리: "채무정리",
    채권발생: "채권발생",
    채권정리: "채권정리",
    일반전표: "일반전표"
});
//
// export const INVOICETYPE = Object.freeze({
//     채무발생:   Symbol("채무발생"),
//     채무정리:  Symbol("채무정리"),
//     채권발생: Symbol("채권발생"),
//     채권정리: Symbol("채권정리"),
//     일반전표: Symbol("일반전표")
// });

function ReportCreate() {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);
  const [invoiceType, setInvoiceType] = useState(INVOICETYPE.채무발생);
  const [inputDateValues, setInputDateValues] = useState({...initialValues});
  const [inputSearchContent, setInputSearchContent] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearchContent = (event) => {
    setInputSearchContent(event.target.value);
  };

  const handleSearch = () => {
    fetchInvoices();
  };

  const fetchInvoices = () => {
    let url = `erp/voucher_list/`;

    if (location.pathname === '/reportWritePayment') {
      url = `erp/payment_list/`;
      setInvoiceType(INVOICETYPE.채무정리);
    } else if (location.pathname === '/reportWriteInvoice') {
      url = `erp/invoice_list/`;
      setInvoiceType(INVOICETYPE.채권발생);
    } else if (location.pathname === '/reportWriteReceipt') {
      url = `erp/receipt_list/`;
      setInvoiceType(INVOICETYPE.채권정리);
    } else if (location.pathname === '/reportWriteNacct') {
      url = `erp/nacct_list/`;
      setInvoiceType(INVOICETYPE.일반전표);
    }

    const config = {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`},
      params: {
        startDate: moment(inputDateValues.startDate).format('YYYY-MM-DD'),
        endDate: moment(inputDateValues.endDate).format('YYYY-MM-DD'),
        search: inputSearchContent
      }
    };

    dispatch(isloading(true))
    axios.get(url, config)
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

  let headerInvoices = []
  if(invoiceType === INVOICETYPE.채무발생 || invoiceType === INVOICETYPE.채권발생) {
    headerInvoices = invoices.filter(invoice => invoice.RPSFX === '001' && invoice.RPSEQ === 1)
  } else if(invoiceType === INVOICETYPE.채권정리 ||
            invoiceType === INVOICETYPE.채무정리 ||
            invoiceType === INVOICETYPE.일반전표) {
    headerInvoices = invoices.filter(invoice => invoice.RPSEQ === 1)
  }

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
            invoices={headerInvoices}
            fetchInvoices={fetchInvoices}
            totalInvoices={invoices}
            invoiceType={invoiceType}
          />
        )}
      </Container>
    </Page>
  );
}

export default ReportCreate;
