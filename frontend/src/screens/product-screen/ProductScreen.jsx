import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import {
  selectProduct,
  selectIsLoading,
  selectProductError,
} from '../../redux/product/productSelectors';
import { fetchProductStart } from '../../redux/product/productActions';
import Rating from '../../components/rating/Rating.component';
import Loading from '../../structure/loading/Loading.component';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectProductError);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchProductStart(match.params.productId));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, match.params.productId]);

  const onAddToCartHandler = () => {
    history.push(`/cart/${match.params.productId}?qty=${qty}`);
  };
  return (
    <Fragment>
      <Loading
        isLoading={isLoading}
        loadingMessage="loading..."
        doneMessage="Product loaded successfully"
        error={error}
      />
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {product !== {} ? (
        <Row>
          <Col md={6}>
            <Image
              src={`${process.env.PUBLIC_URL}${product.image}`}
              alt={product.name}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...new Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={(x + 1).toString()} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={onAddToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        !isLoading && !error && <p>Product is empty</p>
      )}
    </Fragment>
  );
};

ProductScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }),
  }),
};

export default ProductScreen;
