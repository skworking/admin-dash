'use client'
import { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumbs from "../../components/reuseable/bread";
import { usePathname } from "next/navigation";
import ProductDisplay from "../../components/reuseable/productdisplay";
import { fetchData } from "@/app/utils/apiUtils";
import { useTranslations } from "next-intl";
const FilterList = ({ items, selectedFilter, onFilterChange }) => {
    const t=useTranslations("Index")
    return (
        <ul className="rounded-full bg-sky-100 flex w-max sm:w-fit   overflow-hidden">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`flex p-1 rounded-full m-1 ${selectedFilter.index === index ? 'bg-blue-500 rounded-full px-3' : 'items-center'}`}
                    onClick={() => onFilterChange({ index, value: item })}
                >
                    {t(`${item}`)}
                </li>
            ))}
        </ul>
    );
};

const BrandList = () => {
    const t=useTranslations("Index")
    const [products, setProduct] = useState([])
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));

    const [brandFilter, setBrandFilter] = useState({ index: null, value: '' });
    const [typeFilter, setTypeFilter] = useState({ index: null, value: '' });
    const [categoryFilter,setCategoryFilter]=useState({index: null, value: ''})
    // const fetchData = async () => {
    //     try {
    //         const result = await fetch("/api/products", {
    //             method: "GET", // or any other HTTP method you're using
    //             headers: {
    //                 "Authorization": `Bearer ${isAuth}`, // Replace jwtToken with your actual JWT token
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         // const result = await fetch("api/products");
    //         const data = await result.json();
    //         if (data.success) {

    //             // setTotalPage(data.totalPages)
    //             setProduct(data.result);
    //             // setSorted(data.result)
    //         } else {
    //             console.error("Error fetching Products:", data.error);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching Products:", error);
    //     }
    // };
    // useEffect(() => {

    //     fetchData();
    // }, []);
    useEffect(() => {
        const fetchProducts = async () => {
          const { data, totalPages } = await fetchData('/api/products', isAuth);
          setProduct(data);
        //   setTotalPage(totalPages);
        };
    
        fetchProducts();
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
        <div className="relative  bg-white ">
            <Breadcrumbs currentLoc={pathname} />
            <div className="sm:px-0 flex flex-col gap-3 my-2  overflow-auto w-full absolute bg-white">
                <div className="font-bold"> {t('Top Truck Brands')}
                <hr className="w-[50px] h-2  bg-blue-500   rounded " style={{ opacity: 1 }}></hr>
                </div>
                <FilterList items={uniqueBrands} selectedFilter={brandFilter}
                    onFilterChange={setBrandFilter} />

                {filterdata?.length >= 3 ? (
                    <Slider {...settings}>
                      
                        {filterdata?.map((product, index) => (
                            <div key={index} className="p-2">
                                <div className="flex flex-col gap-2 bg-slate-50">
                                    <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />
                                    <div className="items-center justify-center flex flex-col gap-2 p-3">
                                        <p>{t(`${product.slug}`)}</p>
                                        <p>₹{product.min_price} - ₹{product.max_price} {t('Lakh')}</p>
                                        <Button type="primary" className="w-full" /* onClick={(e) => { handleOffer(e, product) }} */>{t('Check Offers')}</Button>
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
                                            <p>{t(`${product.slug}`)}</p>
                                            <p>₹{product.min_price} - ₹{product.max_price} {t('Lakh')}</p>
                                            <Button type="primary" className="w-full" /* onClick={(e) => { handleOffer(e, product) }} */>{t('Check Offers')}</Button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ))
                )}
               <div className="font-bold">Find All Truck Brands
                <hr className="w-[50px] h-2  bg-blue-500   rounded " style={{ opacity: 1 }}></hr>
                </div>
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
                <div className="font-bold"> Latest Models by Category
                <hr className="w-[50px] h-2  bg-blue-500   rounded " style={{ opacity: 1 }}></hr>
                </div>
                <FilterList items={productType} selectedFilter={categoryFilter} onFilterChange={setCategoryFilter} />
                <ProductDisplay products={filterCategory} settings={settings} />
            </div>
        </div>
    )
}
export default BrandList;