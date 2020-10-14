import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import { fetchProductsStart } from '../../redux/product/productActions';
import {
  selectProducts,
  selectIsLoading,
  selectProductError,
} from '../../redux/product/productSelectors';
import Product from '../../components/product/Product.component';
import Loading from '../../structure/loading/Loading.component';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectProductError);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Latest Product</h1>
      <Loading
        isLoading={isLoading}
        loadingMessage="loading..."
        doneMessage="Product loaded successfully"
        error={error}
      />
      {products.length > 0 ? (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        !isLoading && !error && <p>Products is empty</p>
      )}
    </Fragment>
  );
};

export default HomeScreen;
