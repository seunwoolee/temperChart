/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {Button, TextField} from '@material-ui/core';
import {login} from 'src/actions';
import {AxiosInstance, AxiosResponse} from "axios";
import {storeLoginData} from "../../actions";

const schema = {
  username: {
    presence: {allowEmpty: false, message: '를 확인하세요'}
  },
  password: {
    presence: {allowEmpty: false, message: '를 확인하세요'}
  }
};

const useStyles = makeStyles((theme) => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

function LoginForm({className, ...rest}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleChange = (event) => {
    event.persist();

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line max-len
    const result: AxiosResponse = await dispatch(login(formState.values.username, formState.values.password));

    if (result.status === 200) {
      localStorage.setItem('token', result.data.key);
      history.push('/');
    } else if (result.status === 400) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        isValid: false,
        errors: {
          password: ['패스워드를 확인하세요'],
          username: ['ID를 확인하세요']
        }
      }));
    } else {
      // TODO 에러 남기기
      // eslint-disable-next-line no-alert
      alert('에러발생');
    }
  };

  const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          error={hasError('username')}
          fullWidth
          helperText={hasError('username') ? formState.errors.username[0] : null}
          label="ID"
          name="username"
          onChange={handleChange}
          value={formState.values.username || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        로그인
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
