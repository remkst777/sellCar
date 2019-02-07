import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import carsReducer from 'containers/Cars/reducer';
import loginReducer from 'containers/Login/reducer';
import profileReducer from 'containers/Profile/reducer';
import accountProviderReducer from 'containers/AccountProvider/reducer';

export default combineReducers({
  carsReducer,
  loginReducer,
  profileReducer,
  accountProviderReducer,
  form: formReducer,
});
