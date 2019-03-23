import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import carsReducer from 'containers/Cars/reducer';
import loginReducer from 'containers/Login/reducer';
import profileReducer from 'containers/Profile/reducer';
import accountProviderReducer from 'containers/AccountProvider/reducer';
import singleCarReducer from 'containers/SingleCar/reducer';
import cartReducer from 'containers/Cart/reducer';
import dataCacheProviderReducer from 'containers/DataCacheProvider/reducer';

export default combineReducers({
  carsReducer,
  loginReducer,
  profileReducer,
  accountProviderReducer,
  singleCarReducer,
  cartReducer,
  dataCacheProviderReducer,
  form: formReducer,
});
