import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/FormFields/Button';
import ModalDialog from 'components/ModalDialog';
import CarForm from 'containers/CarForm';

import { ADD_CAR_FORM } from './constants';

const ProductsHeader = ({
  showAddAutoModal,
  userData,
  addCar,
  addCarLoading,
  options,
  getManufacturerWithModelsList,
  getOptionListLoading,
}) => {
  const [isActive, changeView] = useState(false);

  if (!userData || userData.role !== 'admin') {
    return null;
  }

  return (
    <div className="d-flex justify-content-end py-2">
      <Button
        name="Add auto"
        size="sm"
        onClick={() => {
          showAddAutoModal();
          changeView(true);
        }}
      />

      <ModalDialog isActive={isActive} onClose={() => changeView(false)}>
        <CarForm
          size="sm"
          form={ADD_CAR_FORM}
          submitCar={addCar}
          submitCarLoading={addCarLoading}
          options={options}
          getManufacturerWithModelsList={getManufacturerWithModelsList}
          getOptionListLoading={getOptionListLoading}
        />
      </ModalDialog>
    </div>
  );
};

ProductsHeader.propTypes = {
  showAddAutoModal: PropTypes.func,
  userData: PropTypes.object,
  addCar: PropTypes.func,
  addCarLoading: PropTypes.bool,
  options: PropTypes.object,
  getManufacturerWithModelsList: PropTypes.func,
  getOptionListLoading: PropTypes.bool,
};

export default React.memo(ProductsHeader);
