'use client'

import { ClearOutlined, CloseCircleOutlined, DownOutlined, MinusOutlined, PlusOutlined, SearchOutlined, WarningFilled } from "@ant-design/icons";
import { useState, useEffect, useMemo } from "react";
import { Checkbox, Collapse, Dropdown, Radio, Select, Form, Menu, Button, Tooltip, message, Modal, Input, Row, Col } from 'antd';
import { Grid } from "@mui/material";
import SkeletonLoader from "../../components/reuseable/skelenton";
import { Check } from "react-feather";
import axios from "axios";
import Breadcrumbs from "../../components/reuseable/bread";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";




const Product = () => {
    const t=useTranslations('Index')
    const pathname = usePathname()
    const endpoint = pathname.split("/").pop();

    const [products, setProducts] = useState([]);

    const filterProducts = (products, value) => {
        return products.filter(product => product.brand.toLowerCase() === value.toLowerCase());
    }
    const [filterdata, setFilterData] = useState(null);
    const [filterProduct, setFilterProduct] = useState(null)
    const [sorted, setSorted] = useState([]);
    useMemo(() => {

        if (endpoint !== null & products !== null) {
            const data = filterProducts(products, endpoint)
            setFilterProduct(data)
            setFilterData(data)
        
        }
    }, [products])

    console.log(filterProduct);

    
    
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [show, setShow] = useState(true);
    const [showTagFilter, setShowTagFilter] = useState(true);
    const [showPriceFilter, setShowPriceFilter] = useState(true);
    const [showProductType, setShowProductType] = useState(true);

    const [selectedPriceOption, setSelectedPriceOption] = useState(null);
    const [filters, setFilters] = useState({
        body: [],
        brand: [],
        tag: []
    });
    const [sortmodel, setShortModel] = useState(true)
    const [filtermodel, setFilterModel] = useState(true)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [variation, setVariation] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPages, setTotalPage] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // ////////////
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
                setProducts(data.result);

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
    // const uniqueBrands = [...new Set(products.map(product => product.brand))];
    // const uniqueTags = Array.from(new Set(products?.flatMap(product => product.tag.map(tag => tag.name))));
    // const productType=[...new Set(products.map(product => product.product_type))];

    // const body = [...new Set(products.map(product => product?.body[0]))];
    // console.log(body);
    const { Panel } = Collapse;

    const priceCount = filterProduct?.reduce((acc, product) => {
        acc[product.price] = (acc[product.price] || 0) + 1;
        return acc
    }, {})

    const brandCounts = filterProduct?.reduce((acc, product) => {
        acc[product.brand] = (acc[product.brand] || 0) + 1;
        return acc;
    }, {});

    const tagConts = filterProduct?.reduce((acc, product) => {
        product.tag.forEach(tag => {
            acc[tag.name] = (acc[tag.name] || 0) + 1;
        });
        return acc
    }, {})
    const typeCount = filterProduct?.reduce((acc, product) => {
        acc[product.product_type] = (acc[product.product_type] || 0) + 1;
        return acc
    }, {})


    const toggleTagFilter = () => {
        setShowTagFilter(!showTagFilter);
    }
    const togglePriceFilter = () => {
        setShowPriceFilter(!showPriceFilter);
    }
    const handlePriceFilterChange = (max) => {
        setSelectedPriceOption(max);
    }

    console.log(filterdata);

    const handleSortBy = (criteria) => {
        // let sortedProducts = [...filterProduct];
        let sortedProducts;
        if (filterdata.length > 0) {
            sortedProducts = [...filterdata]
        } else {
            sortedProducts = [...sorted]
        }
        // // let sortedProducts = [...products];
        console.log(sortedProducts);
        if (criteria === 'priceHighToLow') {
            sortedProducts.sort((a, b) => b.max_price - a.max_price);
        } else if (criteria === 'priceLowToHigh') {
            sortedProducts.sort((a, b) => a.min_price - b.min_price);
        }
        // setSorted(sortedProducts)
        // {
        //     sortmodel & screenWidth < 1024 &&

        //         setShortModel(!sortmodel)
        // }
        if (filterdata.length > 0) {
            setFilterData(sortedProducts)
        } else {

            setSorted(sortedProducts);
        }
    }
    const menu = (
        <Menu onClick={({ key }) => handleSortBy(key)}>
            <Menu.Item key="priceHighToLow">Price: High to Low</Menu.Item>
            <Menu.Item key="priceLowToHigh">Price: Low to High</Menu.Item>
        </Menu>
    );


    const filtercall = async () => {
        setLoading(true)
        if (screenWidth < 1024) {
            setFilterModel(!filtermodel)
        }
        const data = {
            product_type: filters.body,
            brand: endpoint,
            min_price: selectedPriceOption && 0,
            max_price: selectedPriceOption,
            page: currentPage || 1,
            tag: filters.tag
        }

        const queryParams = new URLSearchParams(data);
        // const result = await fetch(`/api/product/search?${queryParams}`, {
        const result = await fetch(`/api/filter/search?${queryParams}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${isAuth}`, // Replace jwtToken with your actual JWT token
                "Content-Type": "application/json"
            }
        });
        const response = await result.json();
        if (response.success) {
            setFilterData(response.result)

            setTotalPage(response.totalPages)
            setLoading(false);
            message.success({ content: response.message, duration: 2 });
        } else {
            message.warning({ content: response.message })
        }
    }

    const handleReset = () => {
        setFilterData([])
        setcurrentPage(1)
        if (screenWidth < 1024) {
            setFilterModel(!filtermodel)
        }
        setFilters({
            body: [],
            brand: [],
            tag: []
        })
        setSelectedPriceOption(null)
        // filtercall()
        fetchData()
    } 

    const toggleVariation = (index) => {
        setVariation(index === variation ? null : index);
    };
    const loadMore = () => {
        let count = currentPage + 1
        setcurrentPage(count)
        // setcurrentPage(prevPage => prevPage + 1);
        // filtercall()
    };
    useMemo(() => {
        filtercall()
    }, [currentPage])
    const handleNextPage = () => {
        if (totalPages > 1) {
            setcurrentPage(currentPage + 1);
        }
    };

    // const handlePrevPage = () => {
    //     if (currentPage > 1) {
    //         setcurrentPage(currentPage - 1);
    //     }
    // };
    // const handlePageClick = (pageNumber) => {
    //     setcurrentPage(pageNumber);
    // };

    const FormItem = Form.Item;
    const [form] = Form.useForm();
    const [offer, setOffer] = useState(null)
    const { Option } = Select;
    // const cities = [
    //     { name: 'New York', state: 'New York', locations: ['Manhattan', 'Brooklyn', 'Queens'] },
    //     { name: 'Los Angeles', state: 'California', locations: ['Hollywood', 'Santa Monica', 'Downtown'] },
    //     // Add more cities and their locations as needed
    // ];
    const handleOffer = (e, index) => {
        e.preventDefault()
        console.log(index);
        setOffer(index)
    }
    // console.log(offer);
    const [city, setCity] = useState('');
    const [value, setValue] = useState({
        name: '',
        phone: '',

    })
    const [districts, setDistrict] = useState(null)
    // const districts = [
    //     { name: 'Pune', cities: ['Pune', 'PCMC', 'Hinjewadi'] },
    //     { name: 'Mumbai', cities: ['Mumbai', 'Navi Mumbai', 'Thane'] },
    //     // Add more districts and their cities as needed
    // ];
    const fetchCity = async () => {
        await axios.get('/api/district')
            .then((res) => {
                console.log("city", res);
                setDistrict(res.data.result)
                // setProduct(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchCity()
    }, [])
    const handleChange = (e, fieldname) => {
        setValue({
            ...value, // Spread the existing state
            [fieldname]: e.target.value // Update the 'name' property
        });
    }
    const [filteredCities, setFilteredCities] = useState([]);
    const handleCitySearch = (value) => {
        const uniqueCities = new Set();
        districts.forEach(district => {
            district.cities.forEach(city => {
                if (city.toLowerCase().includes(value.toLowerCase())) {
                    uniqueCities.add(`${city}, ${district.name}`);
                }
            });
        });
        setFilteredCities(Array.from(uniqueCities));
    };
    const handleCityChange = (value) => {
        setCity(value);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOffer(null);
        setValue({
            name: '',
            phone: ''
        })
    }
    const handleSignIn = async (e) => {
        const data = {
            name: value.name,
            phone: value.phone,
            city: city
        }
        console.log(data);

    }

    console.log(sorted,filterdata);
    // console.log(Object.keys(typeCount).length)
    return (
        <div className=" relative">
            <Breadcrumbs currentLoc={pathname} />
            <div className="px-10  mt-5 d-flex w-full relative">
                <div className="w-1/5 text-justify lg:flex flex-col hidden outline-1 ">
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>{t('Reset')}</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>{t('Apply filter')}</button>
                    </div>

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShowProductType(!showProductType) }}>
                        <h1>Product Type</h1>
                        {showProductType ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showProductType && !!typeCount &&

                        <>
                            <div className={`${Object?.keys(typeCount)?.length > 5 ? 'h-[200px] overflow-auto bg-white' : 'h-auto bg-white'}`}>
                                {Object?.entries(typeCount)?.map(([product, count]) => {
                                    return (
                                        <div key={product} className="p-1 flex gap-2">

                                            <Checkbox
                                                className="w-full"
                                                key={product}
                                                value={product}
                                                checked={filters.body.includes(product)}
                                                onChange={(e) => setFilters(prevFilters => ({
                                                    ...prevFilters,
                                                    body: e.target.checked
                                                        ? [...prevFilters.body, e.target.value]
                                                        : prevFilters.body.filter(item => item !== e.target.value)
                                                }))}
                                            >
                                                {`${product} (${count})`}
                                            </Checkbox>

                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={togglePriceFilter}>
                        <h1>Price Range</h1>
                        {showPriceFilter ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showPriceFilter && !!priceCount && (
                        <>
                            <div className={`${Object.keys(priceCount)?.length > 5 ? 'h-[200px] overflow-auto bg-white' : 'h-auto bg-white'}`} >
                                {Object.entries(priceCount).map(([price, count]) => (
                                    <Radio
                                        key={price}
                                        className="p-1 flex gap-2"
                                        checked={
                                            selectedPriceOption !== null &&
                                            selectedPriceOption === price
                                        }
                                        onChange={() => handlePriceFilterChange(price)}
                                    >

                                        {`Under ${price} Lakh (${count})`}
                                    </Radio>
                                ))}
                                <Radio
                                    key="none"
                                    className="p-1 flex gap-2"
                                    checked={selectedPriceOption === null}
                                    onChange={() => handlePriceFilterChange(null)}
                                >
                                    None
                                </Radio>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex grow flex-col lg:w-4/5 h-screen bg-white">
                    <div className=" p-2 lg:flex  justify-between hidden">
                        <div className="font-bold">Populer {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Trucks
                            <hr className="w-[50px] h-2  bg-blue-500  rounded " style={{ opacity: 1 }} ></hr>
                        </div>
                        <Dropdown overlay={menu} >
                            <Button icon={<DownOutlined />} >Sort By</Button>
                        </Dropdown>
                    </div>
                    <div className="w-full  p-2 ">
                        <div className="lg:hidden mb-2">Populer {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Trucks
                            <hr className="w-[50px] h-2  bg-blue-500  rounded " style={{ opacity: 1 }}></hr>
                        </div>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {

                                !!filterdata && sorted.length === 0 ?
                                    filterdata.map((product, index) => {
                                        return (
                                            <>
                                                <Grid item xs={12} sm={4} md={4} key={index}>
                                                    <div className="border-2  flex flex-col gap-2 bg-slate-50">
                                                        <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />

                                                        <div className="items-center justify-center flex flex-col gap-2 p-3">
                                                            <p>{product.slug}</p>
                                                            <p>₹{product.min_price} - ₹{product.max_price} Lakh</p>
                                                            <Button type="primary" className="w-full " onClick={(e) => { handleOffer(e, product) }}>Check Offers</Button>
                                                        </div>
                                                        <hr />
                                                        <div className="relative w-full">
                                                            <div className="flex w-full justify-between p-1 cursor-pointer" onClick={() => toggleVariation(index)}>
                                                                <p>No variation Found</p>
                                                                <PlusOutlined className={`transition-transform duration-300 ${variation === index ? 'rotate-45' : 'rotate-0'}`} />
                                                            </div>
                                                            {variation === index && (
                                                                <div className="absolute top-full left-0 w-full p-1 border-2 bg-slate-50 transition-opacity duration-500">
                                                                    No Data Found
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Grid>

                                            </>
                                        )
                                    })
                                    :
                                    sorted.length > 0 &&
                                    sorted.map((product,index) => {

                                        return (
                                            <>    <Grid item xs={12} sm={4} md={4} key={index}>
                                                <div className="border-2  flex flex-col gap-2 bg-slate-50">
                                                    <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />

                                                    <div className="items-center justify-center flex flex-col gap-2 p-3">
                                                        <p>{product.slug}</p>
                                                        <p>₹{product.min_price} - ₹{product.max_price} Lakh</p>
                                                        <Button type="primary" className="w-full " onClick={(e) => { handleOffer(e, product) }}>Check Offers</Button>
                                                    </div>
                                                    <hr />
                                                    <div className="relative w-full">
                                                        <div className="flex w-full justify-between p-1 cursor-pointer" onClick={() => toggleVariation(index)}>
                                                            <p>No variation Found</p>
                                                            <PlusOutlined className={`transition-transform duration-300 ${variation === index ? 'rotate-45' : 'rotate-0'}`} />
                                                        </div>
                                                        {variation === index && (
                                                            <div className="absolute top-full left-0 w-full p-1 border-2 bg-slate-50 transition-opacity duration-500">
                                                                No Data Found
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Grid>
                                            </>
                                        )
                                    })
                            }
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;