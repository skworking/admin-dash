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





const Product = () => {
    const pathname = usePathname()
    const endpoint = pathname.split("/").pop();

    const [products, setProducts] = useState([]);

    const filterProducts = (products, value) => {
        return products.filter(product => product.brand.toLowerCase() === value.toLowerCase());
    }
    const [filterProduct, setFilterProduct] = useState(null)
    useMemo(() => {

        if (endpoint !== null & products !== null) {
            const data = filterProducts(products, endpoint)
            setFilterProduct(data)
        }
    }, [products])

    console.log(filterProduct);

    const [sorted, setSorted] = useState([]);
    const [filterdata, setFilterData] = useState([]);
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

    const { Panel } = Collapse;

    const priceCount = filterProduct?.reduce((acc, product) => {
        acc[product.price] = (acc[product.price] || 0) + 1;
        return acc
    }, {})
    
    const brandCounts = filterProduct?.reduce((acc, product) => {
        acc[product.brand] = (acc[product.brand] || 0) + 1;
        return acc;
    }, {});
    console.log(brandCounts);
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


    const handleSortBy = (criteria) => {
        let sortedProducts;
        if (filterdata.length > 0) {
            sortedProducts = [...filterdata]
        } else {
            sortedProducts = [...products]
        }
        // let sortedProducts = [...products];

        if (criteria === 'priceHighToLow') {
            sortedProducts.sort((a, b) => b.max_price - a.max_price);
        } else if (criteria === 'priceLowToHigh') {
            sortedProducts.sort((a, b) => a.min_price - b.min_price);
        }

        {
            sortmodel & screenWidth < 1024 &&

                setShortModel(!sortmodel)
        }
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
            brand: filters.brand,
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
        filtercall()
        // fetchData()
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


    // console.log(Object.keys(typeCount).length)
    return (
        <div className=" relative">
            <Breadcrumbs currentLoc={pathname} />
            <div className="px-10  mt-5 d-flex w-full relative">
                <div className="w-1/5 text-justify lg:flex flex-col hidden outline-1 ">
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>Reset</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>Apply filter</button>
                    </div>

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShowProductType(!showProductType) }}>
                        <h1>Product Type</h1>
                        {showProductType ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showProductType && !!typeCount  &&

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
                        <div>{filterdata.length > 0 ? filterdata.length : sorted.length} Latest Truck Found
                            <hr className="w-[50px] h-2  bg-blue-500  rounded " style={{ opacity: 1 }} ></hr>
                        </div>
                        <Dropdown overlay={menu} >
                            <Button icon={<DownOutlined />} >Sort By</Button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;