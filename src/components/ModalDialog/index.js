/**
 *
 * ModalDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export class ModalDialog extends React.Component {
  render() {
    return (
      <div
        id={this.props.id}
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-5">
            {React.Children.only(this.props.children)}
          </div>
        </div>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object,
};

export default ModalDialog;
