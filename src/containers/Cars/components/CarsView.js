import React from 'react';
import PropTypes from 'prop-types';

import FilterCarsForm from './FilterCarsForm';
import Sorting from './Sorting';
import CarsList from './CarsList';
import Wrapper from './Wrapper';

const CarsView = ({
  filterCars,
  sortCars,
  getManufacturerWithModelsList,
  options,
  getOptionListLoading,
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

export default React.memo(CarsView);
