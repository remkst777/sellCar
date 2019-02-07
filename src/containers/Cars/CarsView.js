import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog from 'components/ModalDialog';

import AddCarForm from './AddCarForm';
import FilterCarsForm from './FilterCarsForm';
import Sorting from './Sorting';
import CarsList from './CarsList';
import Wrapper from './Wrapper';

import { ADD_AUTO_MODAL_ID } from './constants';

const CarsView = ({
  addCar,
  filterCars,
  sortCars,
  getManufacturerWithModelsList,
  options,
  getOptionListLoading,
  addCarLoading,
  loadCarsLoading,
  cars,
  sort,
  ranges,
  isLast,
  loadNextCars,
}) => (
  <Wrapper>
    <div className="d-flex">
      <aside className="mr-3">
        <FilterCarsForm
          ranges={ranges}
          filterCars={filterCars}
          options={options}
          loadCarsLoading={loadCarsLoading}
          getOptionListLoading={getOptionListLoading}
          getManufacturerWithModelsList={getManufacturerWithModelsList}
          size="sm"
        />
      </aside>
      <main>
        <Sorting sort={sort} sortCars={sortCars} />
        <CarsList
          loadCarsLoading={loadCarsLoading}
          cars={cars}
          isLast={isLast}
          loadNextCars={loadNextCars}
        />
      </main>
    </div>

    <ModalDialog id={ADD_AUTO_MODAL_ID}>
      <AddCarForm
        size="sm"
        addCar={addCar}
        addCarLoading={addCarLoading}
        options={options}
        getManufacturerWithModelsList={getManufacturerWithModelsList}
        getOptionListLoading={getOptionListLoading}
      />
    </ModalDialog>
  </Wrapper>
);

CarsView.propTypes = {
  addCar: PropTypes.func,
  filterCars: PropTypes.func,
  sortCars: PropTypes.func,
  getManufacturerWithModelsList: PropTypes.func,
  options: PropTypes.object,
  getOptionListLoading: PropTypes.bool,
  addCarLoading: PropTypes.bool,
  loadCarsLoading: PropTypes.bool,
  cars: PropTypes.array,
  sort: PropTypes.object,
  ranges: PropTypes.object,
  isLast: PropTypes.bool,
  loadNextCars: PropTypes.func,
};

export default CarsView;
