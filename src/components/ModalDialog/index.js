/**
 *
 * ModalDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export class ModalDialog extends React.Component {
  componentDidUpdate = () => {
    const { closeModal, show } = this.props;

    window.$(`#${this.modalId}`).modal(this.modalShow(show));
    window.$(`#${this.modalId}`).on('hide.bs.modal', closeModal);

    return true;
  };

  modalShow = show => {
    return show ? 'show' : 'hide';
  }

  render = () => {
    this.modalId = Object.getPrototypeOf(
      this._reactInternalFiber.return.stateNode || 'Modal',
    ).constructor.name;

    return (
      <div
        id={this.modalId}
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        customPosition={this.props.customPosition}
      >
        <div className={`modal-dialog modal-dialog-centered`}>
          <div className="modal-content">
            {React.Children.only(this.props.children)}
          </div>
        </div>
      </div>
    );
  };
}

ModalDialog.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.object,
};

export default ModalDialog;