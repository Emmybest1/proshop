import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { Card } from 'react-bootstrap';

import Rating from '../rating/Rating.component';

const Product = ({ product }) => {
  const history = useHistory();
  const onCardClickHandler = (to) => {
    history.push(to);
  };

  const onLinkHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Card
      className="my-3 p-3 rounded"
      onClick={() => onCardClickHandler(`/product/${product._id}`)}
    >
      <Card.Img
        src={`${process.env.PUBLIC_URL}${product.image}`}
        variant="top"
      />
      <Card.Body>
        <Link to={`/product/${product._id}`} onClick={onLinkHandler}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    price: PropTypes.number.isRequired,
  }),
};

export default Product;
