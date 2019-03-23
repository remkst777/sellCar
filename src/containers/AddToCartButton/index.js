import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addToCartAction } from 'containers/AccountProvider/actions';
import { selectCart } from 'containers/AccountProvider/selectors';

import Cart from './Cart';

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
  addToCartDispatch: PropTypes.func,
  id: PropTypes.string,
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
