import { DEFAULT_TYPE, DEFAULT_TYPE_SUCCESS } from './constants';

export function defaultTypeAction() {
  return dispatch => {
    dispatch({
      type: DEFAULT_TYPE,
    });

    setTimeout(() => {
      dispatch({
        type: DEFAULT_TYPE_SUCCESS,
      });
    }, 1000);
  };
}
