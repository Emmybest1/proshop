import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col } from 'react-bootstrap';

import useUniqueIds from '../../hooks/useUniqueIds';
import { userLoginStart } from '../../redux/user/userActions';
import {
  selectUserInfo,
  selectIsLoading,
  selectUserError,
} from '../../redux/user/userSelectors';
import Loading from '../../structure/loading/Loading.component';
import FormContainer from '../../components/form-container/FormContainer.component';

const initialFormState = {
  email: '',
  password: '',
};

const LoginScreen = ({ location, history }) => {
  const [loginInfo, setLoginInfo] = useState(initialFormState);
  const [showError, setShowError] = useState(false);
  const [emailFormId, passwordFormId] = useUniqueIds(2);

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isLoading = useSelector(selectIsLoading);
  const userError = useSelector(selectUserError);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo, history, redirect]);

  const onChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginStart(loginInfo.email, loginInfo.password));
    setShowError(true);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Loading
        loadingMessage="Loading"
        doneMessage="Done Loading"
        isLoading={isLoading}
        error={showError && userError}
      />

      <form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label id={emailFormId}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            id={emailFormId}
            value={loginInfo.email}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label id={passwordFormId}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            id={passwordFormId}
            value={loginInfo.password}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Customer ?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
