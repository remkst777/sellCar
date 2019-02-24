import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

import styled from 'styled-components';
import { white } from 'style-constants';

import Loader from 'components/Loader';
import Image from 'components/Image';
import Button from 'components/FormFields/Button';

import AddToCartButton from 'containers/AddToCartButton';

const CarItemStyled = styled.li`
  box-shadow: 0 0 2px ${white}dd;
  position: relative;
  background: ${white}16;
`;

const A = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  color: ${white} !important;
`;

/* eslint react/no-array-index-key: 0 */
/* eslint no-underscore-dangle: 0 */
const CarItem = x => (
  <CarItemStyled key={x._id} className="my-2">
    <A to={routes.singleCar(x.brand, x._id)} className="p-4">
      <div className="d-flex justify-content-between text-capitalize">
        <span>
          {`${x.brand} ${x.model} / `}
          {`${x.year} / ${x.cost}$ / `}
          {`${`${x.capacity}`[0]}.`}
          {`${`${x.capacity}`[1]} `}
          {`${x.fuel}`}
        </span>

        <AddToCartButton id={x._id} />
      </div>
      <div className="d-flex flex-wrap pt-2">
        {x.fotos.map((y, idx) => (
          <Image key={`${y}_${idx}`} src={y} size="80px" />
        ))}
      </div>
    </A>
  </CarItemStyled>
);

const CarsList = ({ loadCarsLoading, cars, loadNextCars, isLast }) => (
  <div className="d-flex flex-column">
    {cars[0] && (
      <ul className="d-flex flex-column">
        {cars.map(car => (
          <CarItem key={car._id} {...car} />
        ))}
      </ul>
    )}

    {loadCarsLoading && <Loader size="sm" />}

    {!isLast && !loadCarsLoading && cars[0] && (
      <Button
        disabled={loadCarsLoading}
        size="sm"
        name="See more"
        onClick={loadNextCars}
      />
    )}

    {!loadCarsLoading && !cars[0] && <div>There are no suitable cars</div>}
  </div>
);

CarsList.propTypes = {
  loadCarsLoading: PropTypes.bool,
  cars: PropTypes.array,
  loadNextCars: PropTypes.func,
  isLast: PropTypes.bool,
};

export default React.memo(CarsList);
