import {
  GET_CONTENT_OF_MY_CART,
  GET_CONTENT_OF_MY_CART_SUCCESS,
  GET_CONTENT_OF_MY_CART_ERROR,
} from './constants';

const initialState = {
  cartItems: [],
  cartItemsLoading: false,
};

function cartReducer(state = initialState, action) {
  const { type, cars } = action;

  switch (type) {
    case GET_CONTENT_OF_MY_CART:
      return { ...state, cartItemsLoading: true };
    case GET_CONTENT_OF_MY_CART_SUCCESS:
      return { ...state, cartItemsLoading: false, cartItems: cars };
    case GET_CONTENT_OF_MY_CART_ERROR:
      return { ...state, cartItemsLoading: false };

    default:
      return state;
  }
}

export default cartReducer;
