import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getCorrectListForSelect } from 'utils/autoManagement';

import Button from 'components/FormFields/Button';
import ModalDialog from 'components/ModalDialog';
import CarForm from 'containers/CarForm';

import { EDIT_CAR_FORM } from './constants';

const AdminPanel = ({
  userData,
  deleteCar,
  updateCar,
  updateCarLoading,
  options,
  car,
  getManufacturerWithModelsList,
  getOptionListLoading,
}) => {
  const [isActive, changeView] = useState(false);

  if (!userData || userData.role !== 'admin') {
    return null;
  }

  return (
    <div className="col-12 d-flex justify-content-end">
      <Button
        className="ml-2"
        size="sm"
        name="Edit"
        onClick={() => changeView(true)}
      />

      <Button onClick={deleteCar} className="ml-2" size="sm" name="Delete" />

      <ModalDialog isActive={isActive} onClose={() => changeView(false)}>
        <CarForm
          size="sm"
          form={EDIT_CAR_FORM}
          submitCar={updateCar}
          submitCarLoading={updateCarLoading}
          options={options}
          imagesInitial={car.fotos}
          brandInitial={getCorrectListForSelect([car.brand])[0]}
          modelInitial={getCorrectListForSelect([car.model])[0]}
          manufacturerInitial={getCorrectListForSelect([car.manufacturer])[0]}
          colorInitial={getCorrectListForSelect([car.color])[0]}
          bodyInitial={getCorrectListForSelect([car.body])[0]}
          fuelInitial={getCorrectListForSelect([car.fuel])[0]}
          yearInitial={car.year}
          capacityInitial={car.capacity}
          costInitial={car.cost}
          descriptionInitial={car.description}
          getManufacturerWithModelsList={getManufacturerWithModelsList}
          getOptionListLoading={getOptionListLoading}
          closeModal={changeView}
        />
      </ModalDialog>
    </div>
  );
};

AdminPanel.propTypes = {
  userData: PropTypes.object,
  deleteCar: PropTypes.func,
  updateCar: PropTypes.func,
  updateCarLoading: PropTypes.bool,
  options: PropTypes.object,
  car: PropTypes.object,
  getManufacturerWithModelsList: PropTypes.func,
  getOptionListLoading: PropTypes.bool,
};

export default React.memo(AdminPanel);
