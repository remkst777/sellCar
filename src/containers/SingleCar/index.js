import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as routes from 'routes-config';

import { confirmToast } from 'utils/toasts';

import Loader from 'components/Loader';
import { select as accountProviderSelect } from 'containers/AccountProvider/selectors';
import { select as selectFromCarsContainer } from 'containers/Cars/selectors';
import { getManufacturerWithModelsList } from 'containers/Cars/actions';

import { select } from './selectors';
import { getCarById, updateCar, deleteCar } from './actions';

import SingleCarView from './SingleCarView';

/* eslint no-underscore-dangle: 0 */
class SingleCar extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCarByIdDispatch(id);
  }

  updateCar = (...args) => {
    const { values, reset } = args[2];
    const carId = this.props.car._id;

    this.props.updateCarDispatch(values, reset, carId);
  };

  deleteCar = () => {
    const { car, history } = this.props;
    const isDeleted = this.props.deleteCarDispatch(car._id);

    if (isDeleted) {
      history.push(routes.cars(car.brand));
    }
  };

  dialogWindowToDeleteCar = () => {
    const msg = 'Do you really want to delete this auto?';
    const callback = this.deleteCar;

    confirmToast(msg, callback);
  };

  render() {
    const {
      car,
      carLoading,
      userData,
      updateCarLoading,
      options,
      getManufacturerWithModelsListDispatch,
      getOptionListLoading,
    } = this.props;

    const title = (car && `${car.brand} ${car.model}`) || 'Car information';

    return (
      <div className="container">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content="Cars | Description" />
        </Helmet>

        {!carLoading && car && (
          <SingleCarView
            car={car}
            userData={userData}
            updateCar={this.updateCar}
            deleteCar={this.dialogWindowToDeleteCar}
            updateCarLoading={updateCarLoading}
            options={options}
            getOptionListLoading={getOptionListLoading}
            getManufacturerWithModelsList={
              getManufacturerWithModelsListDispatch
            }
          />
        )}

        {!carLoading && !car && <div>Not found</div>}
        {carLoading && <Loader size="sm" />}
      </div>
    );
  }
}

SingleCar.propTypes = {
  match: PropTypes.object,
  carLoading: PropTypes.bool,
  car: PropTypes.object,
  history: PropTypes.object,
  userData: PropTypes.object,
  options: PropTypes.object,
  updateCarLoading: PropTypes.bool,
  getOptionListLoading: PropTypes.bool,
  deleteCarDispatch: PropTypes.func,
  updateCarDispatch: PropTypes.func,
  getCarByIdDispatch: PropTypes.func,
  getManufacturerWithModelsListDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  carLoading: select('carLoading'),
  car: select('car'),
  updateCarLoading: select('updateCarLoading'),
  userData: accountProviderSelect('userData'),
  options: selectFromCarsContainer('options'),
  getOptionListLoading: selectFromCarsContainer('getOptionListLoading'),
});

const mapDispatchToProps = dispatch => ({
  deleteCarDispatch: bindActionCreators(deleteCar, dispatch),
  updateCarDispatch: bindActionCreators(updateCar, dispatch),
  getCarByIdDispatch: bindActionCreators(getCarById, dispatch),
  getManufacturerWithModelsListDispatch: bindActionCreators(
    getManufacturerWithModelsList,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleCar);
