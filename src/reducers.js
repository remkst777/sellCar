import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productsReducer from 'containers/Products/reducer';
import loginReducer from 'containers/Login/reducer';
import profileReducer from 'containers/Profile/reducer';
import accountProviderReducer from 'containers/AccountProvider/reducer';

export default combineReducers({
  productsReducer,
  loginReducer,
  profileReducer,
  accountProviderReducer,
  form: formReducer,
});
