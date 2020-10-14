import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/form-container/FormContainer.component';

const initialState = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
};

const ShippingScreen = ({ history }) => {
  const [formData, setFormData] = useState(initialState);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Address"
          value={formData.address}
          onChange={onChangeHandler}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter City"
          value={formData.city}
          onChange={onChangeHandler}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Postal Code"
          value={formData.postalCode}
          onChange={onChangeHandler}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Country"
          value={formData.country}
          onChange={onChangeHandler}
          required
        ></Form.Control>
      </Form.Group>

      <Button type="submit" variant="primary">
        Continue
      </Button>
    </FormContainer>
  );
};

export default ShippingScreen;
