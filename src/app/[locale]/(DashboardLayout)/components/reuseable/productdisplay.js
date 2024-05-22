import React from 'react';
import Slider from 'react-slick';
import { Grid } from '@mui/material';
import ProductCard from './productcard';

const ProductDisplay = ({ products, settings }) => {
  if (products.length >= 3) {
    return (
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    );
  } else {
    return (
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default ProductDisplay;
