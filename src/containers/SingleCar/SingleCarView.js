import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue } from 'style-constants';

import { getCorrectListForSelect } from 'utils/autoManagement';

import Slider from 'components/Slider';
import ModalDialog from 'components/ModalDialog';
import CarForm from 'containers/CarForm';

import AdminPanel from './AdminPanel';
import { MODAL_EDIT_FORM_ID, EDIT_CAR_FORM } from './constants';

const Li = styled.li`
  text-transform: capitalize;
  padding: 4px 0;
`;

const Key = styled.span`
  color: ${blue};
  ::after {
    content: ' ';
  }
`;

const SingleCarView = ({
  car,
  userData,
  updateCarLoading,
  updateCar,
  options,
  getManufacturerWithModelsList,
  getOptionListLoading,
  deleteCar,
}) => (
  <div className="row">
    <AdminPanel userData={userData} deleteCar={deleteCar} />

    <div className="col-12 col-xl-6 d-flex justify-content-center">
      <Slider fotos={car.fotos} size="400px" />
    </div>

    <div className="col-12 col-xl-6">
      <h6 className="my-2">Technical characteristics:</h6>
      <ul>
        <Li>
          <Key>Brand:</Key>
          <span>{car.brand}</span>
        </Li>
        <Li>
          <Key>Model:</Key>
          <span>{car.model}</span>
        </Li>
        <Li>
          <Key>Body:</Key>
          <span>{car.body}</span>
        </Li>
        <Li>
          <Key>Capacity:</Key>
          <span>
            {`${car.capacity}`[0]}.{`${car.capacity}`[1]}
          </span>
        </Li>
        <Li>
          <Key>Color:</Key>
          <span>{car.color}</span>
        </Li>
        <Li>
          <Key>Cost:</Key>
          <span>{car.cost}$</span>
        </Li>
        <Li>
          <Key>Fuel:</Key>
          <span>{car.fuel}</span>
        </Li>
        <Li>
          <Key>Manufacturer:</Key>
          <span>{car.manufacturer}</span>
        </Li>
        <Li>
          <Key>Created:</Key>
          <span>{car.date}</span>
        </Li>
        <Li>
          <Key>Year:</Key>
          <span>{car.year}</span>
        </Li>
        <Li>
          <Key>Description:</Key>
          <span>{car.description}</span>
        </Li>
      </ul>
    </div>

    <ModalDialog id={MODAL_EDIT_FORM_ID}>
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
      />
    </ModalDialog>
  </div>
);

SingleCarView.propTypes = {
  car: PropTypes.object,
  userData: PropTypes.object,
  updateCarLoading: PropTypes.bool,
  updateCar: PropTypes.func,
  options: PropTypes.object,
  getManufacturerWithModelsList: PropTypes.func,
  getOptionListLoading: PropTypes.bool,
  deleteCar: PropTypes.func,
};

export default React.memo(SingleCarView);
