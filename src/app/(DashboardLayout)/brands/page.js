'use client'
import { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumbs from "../components/reuseable/bread";
import { usePathname } from "next/navigation";

const BrandList = () => {
    const [products, setProduct] = useState([])
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [show, setShow] = useState(true);
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
    console.log(products);
    const [filter, setFilter] = useState('')
    console.log(filter);
    const uniqueBrands = [...new Set(products.map(product => product.brand))]
    const filterProductsByBrand = (products, brand) => {
        return products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
    }
    // const [data, setData] = useState()
    const filterdata = filterProductsByBrand(products, filter?.brand || 'tata')
    // useEffect(() => {
    //     setData(filterdata)
    // }, [filterdata])
    // console.log(data);
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", position: "absolute", background: "red", right: '2px' }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", position: "absolute", background: "green", left: '2px', zIndex: 1 }}
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
            <div className="flex flex-col sm:px-5 p-2 gap-2">
                <h1>Top Brands</h1>
                <div className="rounded bg-sky-200 flex sm:w-[500px] p-2 sm:p-0">

                    {uniqueBrands.map((brand, index) => {
                        return (
                            <li key={index} className={`flex p-2 ${filter?.index == index && 'bg-gray-400 rounded m-1'}`} onClick={() => setFilter({ index, brand })}>
                                {brand}
                            </li>
                        )
                    })}
                </div>
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

            </div>
        </div>
    )
}
export default BrandList;