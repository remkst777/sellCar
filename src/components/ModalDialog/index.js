/**
 *
 * ModalDialog
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ModalStyled from './ModalStyled';
import Blanket from './Blanket';

const modalRoot = document.getElementById('modal');

class ModalDialog extends React.PureComponent {
  componentWillMount() {
    this.el = document.createElement('div');
  }

  /* eslint no-unused-expressions: 0 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.props.isActive) {
      try {
        nextProps.isActive
          ? modalRoot.appendChild(this.el)
          : modalRoot.removeChild(this.el);
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const { onClose, children } = this.props;

    return ReactDOM.createPortal(
      <React.Fragment>
        <ModalStyled>{children}</ModalStyled>
        <Blanket onClick={onClose} />
      </React.Fragment>,
      this.el,
    );
  }
}

ModalDialog.propTypes = {
  isActive: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
};

export default React.memo(ModalDialog);
