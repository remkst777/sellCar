import React from 'react';
import styled from 'styled-components';

const mapp = [
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
  'item',
];

const AnimationDuration = 1.5;

const Box = styled.div`
  color: #fff;
  background: #fafbf41a;
  min-height: 200px;
  margin: 10px 0;
  padding: 15px;
  animation: TT 1s;
  animation-delay: ${props =>
    (AnimationDuration / props.number) * props.index}s;
  animation-fill-mode: both;

  @keyframes TT {
    from {
      opacity: 0;
      box-shadow: 0 0 0px #fff;
    }

    to {
      opacity: 1;
      box-shadow: 0 0 8px #fff;
    }
  }
`;

const ProductsBox = () => (
  <section className="container">
    <div className="row">
      {mapp.map((item, index) => (
        <div className="col-lg-4">
          <Box index={index} number={mapp.length}>
            {item}
          </Box>
        </div>
      ))}
    </div>
  </section>
);

export default ProductsBox;
