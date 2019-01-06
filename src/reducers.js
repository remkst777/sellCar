import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productsReducer from 'containers/Products/reducer';

export default combineReducers({
  productsReducer,
  form: formReducer,
});
