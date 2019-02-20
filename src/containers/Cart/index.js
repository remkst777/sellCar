import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader';

import {
  selectCart,
  select as accountProviderSelect,
} from 'containers/AccountProvider/selectors';

import { getContentOfMyCart } from './actions';
import { select } from './selectors';

import ListOfItems from './ListOfItems';

const MyCart = React.memo(
  ({
    cart,
    cartLoading,
    cartItems,
    cartItemsLoading,
    getContentOfMyCartDispatch,
  }) => {
    useEffect(
      () => {
        if (cart) {
          setTimeout(() => getContentOfMyCartDispatch(), 1000);
        }
      },
      [cart],
    );

    return (
      <div className="container">
        <ListOfItems cartItems={cartItems} />

        {!cart && !cartLoading && (
          <div className="text-center py-2">You are not authorized</div>
        )}

        {cart && !cart[0] && !cartLoading && !cartItemsLoading && (
          <div className="text-center py-2">Your cart is empty</div>
        )}

        {(cartLoading || cartItemsLoading) && <Loader size="sm" />}
      </div>
    );
  },
);

MyCart.propTypes = {
  cart: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  cart: selectCart(),
  cartLoading: accountProviderSelect('loading'),
  cartItems: select('cartItems'),
  cartItemsLoading: select('cartItemsLoading'),
});

const mapDispatchToProps = dispatch => ({
  getContentOfMyCartDispatch: () => dispatch(getContentOfMyCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCart);
