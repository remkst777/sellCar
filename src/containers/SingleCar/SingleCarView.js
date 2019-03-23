import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue } from 'style-constants';

import { getCorrectListForSelect } from 'utils/autoManagement';

import Slider from 'components/Slider';
import AddToCartButton from 'containers/AddToCartButton';

import AdminPanel from './AdminPanel';

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

/* eslint no-underscore-dangle: 0 */
const SingleCarView = ({
  car,
  userData,
  updateCar,
  options,
  getManufacturerWithModelsList,
  getOptionListLoading,
  deleteCar,
}) => (
  <div className="row">
    <AdminPanel
      userData={userData}
      deleteCar={deleteCar}
      updateCar={updateCar}
      updateCarLoading={updateCar}
      options={options}
      car={car}
      getCorrectListForSelect={getCorrectListForSelect}
      getManufacturerWithModelsList={getManufacturerWithModelsList}
      getOptionListLoading={getOptionListLoading}
    />

    <div className="col-12 col-xl-6 d-flex justify-content-center">
      <Slider fotos={car.fotos} size="400px" />
    </div>

    <div className="col-12 col-xl-6">
      {userData && <AddToCartButton className="mb-3" id={car._id} />}

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
        <Li>
          <Key>Popularity:</Key>
          <span>{car.popularity}</span>
        </Li>
      </ul>
    </div>
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
