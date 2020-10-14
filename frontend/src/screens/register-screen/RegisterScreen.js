import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col } from 'react-bootstrap';

import useUniqueIds from '../../hooks/useUniqueIds';
import { userRegisterStart } from '../../redux/user/userActions';
import {
  selectUserInfo,
  selectIsLoading,
  selectUserError,
} from '../../redux/user/userSelectors';
import Loading from '../../structure/loading/Loading.component';
import FormContainer from '../../components/form-container/FormContainer.component';
import Message from '../../structure/message/Message.component';

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterScreen = ({ location, history }) => {
  const [registerInfo, setRegisterInfo] = useState(initialFormState);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState(null);
  const [
    nameFormId,
    emailFormId,
    passwordFormId,
    confirmPasswordId,
  ] = useUniqueIds(2);

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isLoading = useSelector(selectIsLoading);
  const userError = useSelector(selectUserError);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo, history, redirect]);

  const onChangeHandler = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (registerInfo.password === registerInfo.confirmPassword) {
      dispatch(userRegisterStart({ ...registerInfo }));
      setShowError(true);
      setMessage(null);
    } else {
      setMessage('Password do not match');
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Loading
        loadingMessage="Loading"
        doneMessage="Done Loading"
        isLoading={isLoading}
        error={showError && userError}
      />

      <form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label id={nameFormId}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            id={nameFormId}
            value={registerInfo.name}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label id={emailFormId}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            id={emailFormId}
            value={registerInfo.email}
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
            value={registerInfo.password}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label id={confirmPasswordId}>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id={confirmPasswordId}
            value={registerInfo.confirmPassword}
            onChange={onChangeHandler}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>

        <Row className="py-3">
          <Col>
            Have an account ?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </form>
    </FormContainer>
  );
};

export default RegisterScreen;
