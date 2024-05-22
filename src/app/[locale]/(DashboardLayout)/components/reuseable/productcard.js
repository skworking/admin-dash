import React from 'react';
import { Button } from 'antd';

const ProductCard = ({ product }) => (
  <div className="flex p-2 flex-col gap-2 bg-slate-50">
    <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />
    <div className="items-center justify-center flex flex-col gap-2 p-3">
      <p>{product.slug}</p>
      <p>₹{product.min_price} - ₹{product.max_price} Lakh</p>
      <Button type="primary" className="w-full">Check Offers</Button>
    </div>
  </div>
);

export default ProductCard;
