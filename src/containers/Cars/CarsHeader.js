import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/FormFields/Button';

const ProductsHeader = ({ showAddAutoModal, userData }) => {
  if (!userData) {
    return null;
  }

  return (
    <div className="d-flex justify-content-end py-2">
      <Button name="Add auto" size="sm" onClick={showAddAutoModal} />
    </div>
  );
};

ProductsHeader.propTypes = {
  showAddAutoModal: PropTypes.func,
  userData: PropTypes.object,
};

export default React.memo(ProductsHeader);
