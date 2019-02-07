/**
 *
 * ModalDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
const ModalDialog = ({ id, children }) => (
  <div
    id={id}
    className="modal fade"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content p-5">{React.Children.only(children)}</div>
    </div>
  </div>
);

ModalDialog.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object,
};

export default React.memo(ModalDialog);
