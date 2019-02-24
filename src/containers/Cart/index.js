import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader';

import {
  selectCart,
  select as accountProviderSelect,
} from 'containers/AccountProvider/selectors';

import { select } from './selectors';

import ListOfItems from './ListOfItems';

const MyCart = React.memo(
  ({ cart, cartLoading, cartItems, cartItemsLoading }) => (
    <div className="container">
      <ListOfItems cart={cart} cartItems={cartItems} />

      {!cart && !cartLoading && (
        <div className="text-center py-2">You are not authorized</div>
      )}

      {cart && !cart[0] && !cartLoading && !cartItemsLoading && (
        <div className="text-center py-2">Your cart is empty</div>
      )}

      {(cartLoading || cartItemsLoading) && <Loader size="sm" />}
    </div>
  ),
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

export default connect(
  mapStateToProps,
  null,
)(MyCart);
