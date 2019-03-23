import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';

import styled from 'styled-components';
import { white } from 'style-constants';

import AddToCartButton from 'containers/AddToCartButton';

const Item = styled.li`
  box-shadow: 0 0 0 1px ${white}50;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 15px;
`;

/* eslint no-underscore-dangle: 0 */
const ListOfItems = ({ cart, cartItems }) => (
  <div>
    <ul>
      {cartItems
        .filter(y => cart.includes(y._id))
        .map(x => (
          <Item key={x._id}>
            <p className="text-capitalize">
              <Link to={routes.singleCar(x.brand, x._id)}>
                {`${x.brand} ${x.model} / `}
                {`${x.year} / ${x.cost}$ / `}
                {`${`${x.capacity}`[0]}.`}
                {`${`${x.capacity}`[1]} `}
                {`${x.fuel}`}
              </Link>
            </p>
            <AddToCartButton id={x._id} />
          </Item>
        ))}
    </ul>
  </div>
);

ListOfItems.propTypes = {
  cartItems: PropTypes.array,
  cart: PropTypes.array,
};

export default React.memo(ListOfItems);
