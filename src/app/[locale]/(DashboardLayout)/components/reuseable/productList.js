import React from 'react';
import { Grid } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const ProductList = ({ products, handleSetProduct, handleOffer }) => {
    return (
        <Grid container spacing={2}>
            {products.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <div className="product-item" onClick={() => handleSetProduct(product)}>
                        <Link href={`/product/${product.slug}`}>
                            <div className="product-image">
                                <Image src={product.image_url} alt={product.name} layout="responsive" width={200} height={200} />
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                            </div>
                        </Link>
                        <button onClick={(e) => handleOffer(e, index)}>Check Offer</button>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
