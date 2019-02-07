import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loader from 'components/Loader';
import Image from 'components/Image';
import Button from 'components/FormFields/Button';

const CarItemStyled = styled.div`
  box-shadow: 0 0 2px #ffffffdd;
`;

const CarItem = x => (
  <CarItemStyled className="p-4 my-2">
    <div className="text-uppercase">
      {`${x.brand} ${x.model} / `}
      {`${x.year} / ${x.cost}$ / `}
      {`${`${x.capacity}`[0]}.`}
      {`${`${x.capacity}`[1]} `}
      {`${x.fuel}`}
    </div>
    <div className="d-flex flex-wrap pt-2">
      {x.fotos.map(y => (
        <Image src={y} size="80px" />
      ))}
    </div>
  </CarItemStyled>
);

const CarsList = ({ loadCarsLoading, cars, loadNextCars, isLast }) => (
  <div className="d-flex flex-column">
    {cars[0] && (
      <div className="d-flex flex-column">
        {cars.map(car => (
          <CarItem {...car} />
        ))}
      </div>
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

export default CarsList;
