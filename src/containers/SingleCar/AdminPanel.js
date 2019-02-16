import React from 'react';
import PropTypes from 'prop-types';
import { showModal } from 'utils/modal';

import Button from 'components/FormFields/Button';
import { MODAL_EDIT_FORM_ID } from './constants';

const openModalDialogToEdit = () => {
  showModal(MODAL_EDIT_FORM_ID);
};

const AdminPanel = ({ userData, deleteCar }) => {
  if (!userData || userData.role !== 'admin') {
    return null;
  }

  return (
    <div className="col-12 d-flex justify-content-end">
      <Button
        onClick={openModalDialogToEdit}
        className="ml-2"
        size="sm"
        name="Edit"
      />
      <Button onClick={deleteCar} className="ml-2" size="sm" name="Delete" />
    </div>
  );
};

AdminPanel.propTypes = {
  userData: PropTypes.object,
  deleteCar: PropTypes.func,
};

export default React.memo(AdminPanel);
