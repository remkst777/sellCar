import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'components/FormFields/Label';

/* eslint indent: 0 */
const SorterStyled = styled(Label)`
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  color: ${props => (props.isActive ? '#f76f60' : '#FFF')}

  :after {
    content: '▾';
    font-size: 15px;
    color: #FFF;
    margin: 0 5px;
    transition: 0.5s;
    transform: rotate(${props =>
      props.isActive && +props['data-value'] !== 1 ? '180deg' : '0deg'});
  }
`;

const Sorter = ({ sortCars, sort, sortName }) => (
  <SorterStyled
    as="li"
    className="mx-5"
    onClick={sortCars}
    isActive={sort.name === sortName}
    data-name={sortName}
    data-value={sort.name === sortName ? sort.value : '1'}
  >
    {sortName}
  </SorterStyled>
);

const Sorting = ({ sortCars, sort }) => (
  <div>
    <ul className="d-flex mb-2">
      <Sorter sortCars={sortCars} sort={sort} sortName="date" />
      <Sorter sortCars={sortCars} sort={sort} sortName="cost" />
      <Sorter sortCars={sortCars} sort={sort} sortName="year" />
      <Sorter sortCars={sortCars} sort={sort} sortName="popularity" />
    </ul>
  </div>
);

Sorting.propTypes = {
  sortCars: PropTypes.func,
  sort: PropTypes.object,
};

Sorter.propTypes = {
  sortCars: PropTypes.func,
  sort: PropTypes.object,
  sortName: PropTypes.string,
};

export default React.memo(Sorting);
