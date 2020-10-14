import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Row, Col } from 'react-bootstrap';

import useUniqueIds from '../../hooks/useUniqueIds';
import { getUserStart, updateUserStart } from '../../redux/user/userActions';
import {
  selectUserInfo,
  selectIsLoading,
  selectUserError,
  selectLoggedInUserInfo,
  selectSuccess,
} from '../../redux/user/userSelectors';
import Loading from '../../structure/loading/Loading.component';
import Message from '../../structure/message/Message.component';

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const ProfileScreen = ({ location, history }) => {
  const [profileInfo, setProfileInfo] = useState(initialFormState);
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
  const loggedInUserInfo = useSelector(selectLoggedInUserInfo);
  const success = useSelector(selectSuccess);

  useEffect(() => {
    if (!userInfo) history.replace('/login');
    else {
      if (!loggedInUserInfo) {
        dispatch(getUserStart(userInfo));
      } else {
        setProfileInfo({
          ...loggedInUserInfo,
          password: '',
          confirmPassword: '',
        });
      }
    }
  }, [userInfo, loggedInUserInfo, history, dispatch]);

  const onChangeHandler = (e) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, password, email, confirmPassword } = profileInfo;
    if (password === confirmPassword) {
      dispatch(
        updateUserStart({
          id: loggedInUserInfo._id,
          token: userInfo.token,
          name,
          email,
          password,
        })
      );
      setShowError(true);
    } else {
      setMessage('Password do not match');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
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
              value={profileInfo.name}
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
              value={profileInfo.email}
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
              value={profileInfo.password}
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
              value={profileInfo.confirmPassword}
              onChange={onChangeHandler}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
