import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import HomeScreen from './screens/home-screen/HomeScreen';
import ProductScreen from './screens/product-screen/ProductScreen';
import RegisterScreen from './screens/register-screen/RegisterScreen';
import LoginScreen from './screens/login-screen/LoginScreen';
import ProfileScreen from './screens/profile-screen/ProfileScreen';
import CartScreen from './screens/cart-screen/CartScreen';
import ShippingScreen from './screens/shipping-screen/ShippingScreen';
import Header from './structure/header/Header.component';
import Footer from './structure/footer/Footer.component';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:productId" component={ProductScreen} />
            <Route path="/cart/:productId?" component={CartScreen} />
            <Route path="/" component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
