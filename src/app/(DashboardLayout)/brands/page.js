'use client'
import { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumbs from "../components/reuseable/bread";
import { usePathname } from "next/navigation";
import ProductDisplay from "../components/reuseable/productdisplay";

const FilterList = ({ items, selectedFilter, onFilterChange }) => {
    return (
        <ul className="rounded-full bg-sky-200 flex w-max sm:w-fit   sm:p-0 overflow-hidden">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`flex p-1 rounded-full m-2 ${selectedFilter.index === index ? 'bg-gray-400 rounded-full px-3' : 'items-center'}`}
                    onClick={() => onFilterChange({ index, value: item })}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
};

const BrandList = () => {
    const [products, setProduct] = useState([])
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));

    const [brandFilter, setBrandFilter] = useState({ index: null, value: '' });
    const [typeFilter, setTypeFilter] = useState({ index: null, value: '' });
    const [categoryFilter,setCategoryFilter]=useState({index: null, value: ''})
    const fetchData = async () => {
        try {
            const result = await fetch("/api/products", {
                method: "GET", // or any other HTTP method you're using
                headers: {
                    "Authorization": `Bearer ${isAuth}`, // Replace jwtToken with your actual JWT token
                    "Content-Type": "application/json"
                }
            });
            // const result = await fetch("api/products");
            const data = await result.json();
            if (data.success) {

                // setTotalPage(data.totalPages)
                setProduct(data.result);
                // setSorted(data.result)
            } else {
                console.error("Error fetching Products:", data.error);
            }
        } catch (error) {
            console.error("Error fetching Products:", error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);


    const uniqueBrands = [...new Set(products.map(product => product.brand))]
    const productType = [...new Set(products.map(product => product.product_type))];
    const filterProducts = (products, key, value) => {
        return products.filter(product => product[key].toLowerCase() === value.toLowerCase());
    }

    const filterdata = filterProducts(products, 'brand', brandFilter?.value || 'tata')
    const filterType = filterProducts(products, 'product_type', typeFilter?.value || 'trucks')
    const filterCategory=filterProducts(products,'product_type',categoryFilter.value||'trucks')
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", position: "absolute", background: "#a58e8e", right: '-5px',borderRadius:"50%" }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", position: "absolute", background: "#a58e8e", left: '-5px', zIndex: 1 ,borderRadius:"50%"}}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    const pathname = usePathname()
    console.log(pathname);


    return (
        <div className="relative mt-6 ">
            <Breadcrumbs currentLoc={pathname} />
            <div className="flex flex-col sm:px-5 p-2 gap-2 overflow-auto">
                <h1>Top Brands</h1>
                <FilterList items={uniqueBrands} selectedFilter={brandFilter}
                    onFilterChange={setBrandFilter} />

                {filterdata?.length >= 3 ? (
                    <Slider {...settings}>
                        {filterdata?.map((product, index) => (
                            <div key={index}>
                                <div className="border-2  flex flex-col gap-2 bg-slate-50">
                                    <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />
                                    <div className="items-center justify-center flex flex-col gap-2 p-3">
                                        <p>{product.slug}</p>
                                        <p>₹{product.min_price} - ₹{product.max_price} Lakh</p>
                                        <Button type="primary" className="w-full" /* onClick={(e) => { handleOffer(e, product) }} */>Check Offers</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    filterdata?.map((product, index) => (
                        <div key={index}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={4} md={4}>
                                    <div className="border-2  flex flex-col gap-2 bg-slate-50">
                                        <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />
                                        <div className="items-center justify-center flex flex-col gap-2 p-3">
                                            <p>{product.slug}</p>
                                            <p>₹{product.min_price} - ₹{product.max_price} Lakh</p>
                                            <Button type="primary" className="w-full" /* onClick={(e) => { handleOffer(e, product) }} */>Check Offers</Button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ))
                )}
                <h1>Find All truck by Brands</h1>
                <FilterList items={productType} selectedFilter={typeFilter} onFilterChange={setTypeFilter} />
                <Grid container spacing={{ xs: 2 }} >
                    {filterType?.map((product, index) => (
                        <Grid item xs={12} sm={2}  key={index}>
                            <div className="bg-white p-2 hover:outline-dotted  text-center outline-red-400 ">

                            <img src="#" alt="logo-brand"/>
                            {product.brand}
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <h1>Latest Models by Category</h1>
                <FilterList items={productType} selectedFilter={categoryFilter} onFilterChange={setCategoryFilter} />
                <ProductDisplay products={filterCategory} settings={settings} />
            </div>
        </div>
    )
}
export default BrandList;