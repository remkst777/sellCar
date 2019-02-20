import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { blue, pink } from 'style-constants';
import { createStructuredSelector } from 'reselect';

import { addToCartAction } from 'containers/AccountProvider/actions';
import { selectCart } from 'containers/AccountProvider/selectors';

const Cart = styled.button`
  color: ${props => (!props.isIn ? blue : pink)};
  border: 1px solid ${props => (!props.isIn ? blue : pink)};
  padding: 4px 15px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  display: inline-block;
  background: transparent;
  outline: none !important;

  :hover {
    box-shadow: 0 0 0 2px ${props => (!props.isIn ? `${blue}66` : `${pink}66`)};
  }
`;

/* eslint no-use-before-define: 0 */
const AddToCartButton = React.memo(
  ({ addToCartDispatch, cart, id, className }) => {
    if (!cart) {
      return null;
    }

    const isIn = cart.includes(id);
    AddToCartButton.addToCartDispatch = addToCartDispatch;

    return (
      <Cart className={className} onClick={addToCart} data-id={id} isIn={isIn}>
        {isIn ? 'Already in your cart' : 'Add to your cart'}
      </Cart>
    );
  },
);

function addToCart(e) {
  e.preventDefault();

  const { id } = e.currentTarget.dataset;
  AddToCartButton.addToCartDispatch(id);
}

AddToCartButton.propTypes = {
  cart: PropTypes.array,
  className: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  cart: selectCart(),
});

const mapDispatchToProps = dispatch => ({
  addToCartDispatch: id => dispatch(addToCartAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddToCartButton);
