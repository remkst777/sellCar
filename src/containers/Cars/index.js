import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { change, reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import {
  getCorrectListForSelect,
  rangeToObj,
  selectToString,
} from 'utils/autoManagement';

import { showModal } from 'utils/modal';
import * as routes from 'routes-config';

import { select as accountProviderSelect } from 'containers/AccountProvider/selectors';

import {
  getOptionList,
  getManufacturerWithModelsList,
  addCar,
  loadCars,
  setDefaultReducer,
  sortCars,
} from './actions';

import { select } from './selectors';

import CarsHeader from './CarsHeader';
import CarsView from './CarsView';

import {
  BRAND_FIELD,
  MODEL_FIELD,
  MANUFACTURER_FIELD,
  COLOR_FIELD,
  BODY_FIELD,
  FUEL_FIELD,
  ADD_AUTO_MODAL_ID,
  FILTER_CARS_FORM,
  ADD_CAR_FORM,
  MIN_YEAR_FILTER_FIELD,
  MAX_YEAR_FILTER_FIELD,
  MIN_CAPACITY_FILTER_FIELD,
  MAX_CAPACITY_FILTER_FIELD,
  MIN_COST_FILTER_FIELD,
  MAX_COST_FILTER_FIELD,
} from './constants';

class Cars extends React.PureComponent {
  componentDidMount() {
    const {
      match,
      sort,
      loadCarsDispatch,
      changeFormDispatch,
      getManufacturerWithModelsListDispatch,
      pagination,
    } = this.props;

    const brand = match.params.auto;
    const currentPage = getCorrectListForSelect([brand])[0];

    const offset = 0;

    // car loading with filter and sort - DEFAULT
    loadCarsDispatch({ brand }, sort, pagination, offset);

    // set car (taken from URL) to FIND_CAR filter
    changeFormDispatch(FILTER_CARS_FORM, BRAND_FIELD, currentPage);

    // get manuf. and list of car models after brand selecting
    getManufacturerWithModelsListDispatch(brand, FILTER_CARS_FORM);
  }

  componentWillUnmount() {
    this.props.setDefaultReducerDispatch();
  }

  addCar = async (...args) => {
    try {
      const values = args[0];
      const resetForm = args[2].reset;

      const { brand, id } = await this.props.addCarDispatch(values, resetForm);
      this.props.history.push(routes.singleCar(brand, id));
    } catch (err) {
      console.log(err);
    }
  };

  /* eslint consistent-return: 0 */
  filterCars = ({ next }) => {
    const {
      history,
      loadCarsDispatch,
      sort,
      pagination,
      cars,
      filterCarsForm,
    } = this.props;

    const offset = next ? cars.length : 0;
    const { values } = filterCarsForm;

    if (!values) return null;

    if (values[BRAND_FIELD]) {
      const route = routes.cars(values[BRAND_FIELD].value);
      history.push(route);
    }

    loadCarsDispatch(
      {
        brand: selectToString(values, BRAND_FIELD),
        model: selectToString(values, MODEL_FIELD),
        manufacturer: selectToString(values, MANUFACTURER_FIELD),
        color: selectToString(values, COLOR_FIELD),
        body: selectToString(values, BODY_FIELD),
        fuel: selectToString(values, FUEL_FIELD),
        year: rangeToObj(values, MIN_YEAR_FILTER_FIELD, MAX_YEAR_FILTER_FIELD),
        cost: rangeToObj(values, MIN_COST_FILTER_FIELD, MAX_COST_FILTER_FIELD),
        capacity: rangeToObj(
          values,
          MIN_CAPACITY_FILTER_FIELD,
          MAX_CAPACITY_FILTER_FIELD,
        ),
      },
      sort,
      pagination,
      offset,
      next,
    );
  };

  loadNextCars = () => {
    this.filterCars({ next: true });
  };

  sortCars = async e => {
    const { name, value } = e.target.dataset;

    // set redux sort field
    await this.props.sortCarsDispatch(name, value);
    await this.filterCars({ next: false });
  };

  showAddAutoModal = () => {
    // clear forms
    this.props.resetFormDispatch(ADD_CAR_FORM);
    this.props.resetFormDispatch(FILTER_CARS_FORM);

    // open modal
    showModal(ADD_AUTO_MODAL_ID);
  };

  render() {
    const {
      cars,
      sort,
      ranges,
      options,
      addCarLoading,
      loadCarsLoading,
      getOptionListLoading,
      getManufacturerWithModelsListDispatch,
      isLast,
      userData,
    } = this.props;

    return (
      <div className="container-fluid">
        <Helmet>
          <title>Cars</title>
          <meta name="description" content="Cars | Description" />
        </Helmet>

        <CarsHeader
          showAddAutoModal={this.showAddAutoModal}
          userData={userData}
        />
        <CarsView
          sort={sort}
          ranges={ranges}
          cars={cars}
          options={options}
          sortCars={this.sortCars}
          addCar={this.addCar}
          filterCars={this.filterCars}
          addCarLoading={addCarLoading}
          loadCarsLoading={loadCarsLoading}
          getOptionListLoading={getOptionListLoading}
          getManufacturerWithModelsList={getManufacturerWithModelsListDispatch}
          loadNextCars={this.loadNextCars}
          isLast={isLast}
        />
      </div>
    );
  }
}

Cars.propTypes = {
  sortCarsDispatch: PropTypes.func,
  resetFormDispatch: PropTypes.func,
  changeFormDispatch: PropTypes.func,
  setDefaultReducerDispatch: PropTypes.func,
  loadCarsDispatch: PropTypes.func,
  getOptionListDispatch: PropTypes.func,
  addCarDispatch: PropTypes.func,
  getManufacturerWithModelsListDispatch: PropTypes.func,
  options: PropTypes.object,
  getOptionListLoading: PropTypes.bool,
  addCarLoading: PropTypes.bool,
  loadCarsLoading: PropTypes.bool,
  cars: PropTypes.array,
  sort: PropTypes.object,
  ranges: PropTypes.object,
  pagination: PropTypes.number,
  isLast: PropTypes.bool,
  filterCarsForm: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  options: select('options'),
  getOptionListLoading: select('getOptionListLoading'),
  addCarLoading: select('addCarLoading'),
  loadCarsLoading: select('loadCarsLoading'),
  cars: select('cars'),
  sort: select('sort'),
  ranges: select('ranges'),
  pagination: select('pagination'),
  isLast: select('isLast'),
  userData: accountProviderSelect('userData'),
  filterCarsForm: state => state.form[FILTER_CARS_FORM],
});

const mapDispatchToProps = dispatch => ({
  sortCarsDispatch: bindActionCreators(sortCars, dispatch),
  resetFormDispatch: bindActionCreators(reset, dispatch),
  changeFormDispatch: bindActionCreators(change, dispatch),
  setDefaultReducerDispatch: bindActionCreators(setDefaultReducer, dispatch),
  loadCarsDispatch: bindActionCreators(loadCars, dispatch),
  getOptionListDispatch: bindActionCreators(getOptionList, dispatch),
  addCarDispatch: bindActionCreators(addCar, dispatch),
  getManufacturerWithModelsListDispatch: bindActionCreators(
    getManufacturerWithModelsList,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cars);
