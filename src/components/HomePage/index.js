import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { bmw, ferrari, vw, audi, mercedes, anotherCar } from 'routes-config';

import { confirmEmail } from 'utils/accountManagement';
import { Box, Item } from './Box';

const HomePage = ({ match }) => {
  useEffect(() => {
    if (match.params.token) {
      confirmEmail(match.url);
    }
  }, []);

  return (
    <div>
      <Helmet title="Home Page" />

      <Box>
        <Item slide={0}>
          <Link to={bmw}>
            <div>
              <h5>BMW</h5>
              <p>
                BMW is a German multinational company which currently produces
                luxury automobiles and motorcycles, and also produced aircraft
                engines until 1945.
              </p>
            </div>
          </Link>
        </Item>
        <Item slide={1}>
          <Link to={ferrari}>
            <div>
              <h5>FERRARI</h5>
              <p>
                Ferrari is an Italian luxury sports car manufacturer based in
                Maranello. Founded by Enzo Ferrari in 1939 out of Alfa Romeo
                race division as Auto Avio Costruzioni, the company built its
                first car in 1940.
              </p>
            </div>
          </Link>
        </Item>
        <Item slide={2}>
          <Link to={vw}>
            <div>
              <h5>Volkswagen</h5>
              <p>
                Volkswagen is a German automaker founded on 28 May 1937 by the
                German Labour Front under Adolf Hitler and headquartered in
                Wolfsburg. It is the flagship marque of the Volkswagen Group,
                the largest automaker by worldwide sales in 2016 and 2017.
              </p>
            </div>
          </Link>
        </Item>
        <Item slide={3}>
          <Link to={audi}>
            <div>
              <h5>Audi</h5>
              <p>
                Audi is a German automobile manufacturer that designs,
                engineers, produces, markets and distributes luxury vehicles.
                Audi is a member of the Volkswagen Group and has its roots at
                Ingolstadt, Bavaria, Germany. Audi-branded vehicles are produced
                in nine production facilities worldwide.
              </p>
            </div>
          </Link>
        </Item>
        <Item slide={4}>
          <Link to={mercedes}>
            <div>
              <h5>Mercedes</h5>
              <p>
                Mercedes-Benz is a German global automobile marque and a
                division of Daimler AG. The brand is known for luxury vehicles,
                buses, coaches, and lorries. The headquarters is in Stuttgart,
                Baden-Württemberg.
              </p>
            </div>
          </Link>
        </Item>
        <Item slide={5}>
          <Link to={anotherCar}>
            <div>
              <h5>Other</h5>
              <p>Click to know more about our products.</p>
            </div>
          </Link>
        </Item>
      </Box>
    </div>
  );
};

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(HomePage);
