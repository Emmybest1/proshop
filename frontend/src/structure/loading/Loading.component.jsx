import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import Message from '../message/Message.component';

const Loading = ({ isLoading, loadingMessage, doneMessage, error }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneLoadingMessage, setShowDoneLoadingMessage] = useState(false);
  const previousIsLoadingValue = useRef(null);

  useEffect(() => {
    let delayShowLoadingMessage;
    let removeShowDoneLoadingMessage;

    if (isLoading) {
      delayShowLoadingMessage = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      if (previousIsLoadingValue.current) {
        setShowDoneLoadingMessage(true);
        removeShowDoneLoadingMessage = setTimeout(() => {
          setShowLoadingMessage(false);
        }, 300);
      }
    }

    previousIsLoadingValue.current = isLoading;

    return () => {
      clearTimeout(delayShowLoadingMessage);
      clearTimeout(removeShowDoneLoadingMessage);
      setShowDoneLoadingMessage(false);
      setShowLoadingMessage(false);
    };
  }, [isLoading]);
  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
          }}
        >
          <span className="sr-only">{loadingMessage}</span>
        </Spinner>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}
      {showDoneLoadingMessage && (
        <h3 className="visually-hidden">{doneMessage}</h3>
      )}
    </div>
  );
};

Loading.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
  doneMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
