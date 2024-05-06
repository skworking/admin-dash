'use client'

import { CloseCircleOutlined, DownOutlined, MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Checkbox, Collapse, Dropdown, Radio, Select, Menu, Button, Tooltip, message } from 'antd';
import { Grid } from "@mui/material";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [filterdata,setFilterData]=useState([]);
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [show, setShow] = useState(false);
    const [showTagFilter, setShowTagFilter] = useState(false);
    const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [selectedPriceOption, setSelectedPriceOption] = useState(null);
    const [filters, setFilters] = useState({
        brand: [],
        tag: []
    });
    const [sortmodel, setShortModel] = useState(false)
    const [filtermodel, setFilterModel] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    console.log(filters);

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
                setProducts(data.result);
                setSorted(data.result)
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
    const uniqueBrands = [...new Set(products.map(product => product.brand))];
    const uniqueTags = Array.from(new Set(products?.flatMap(product => product.tag.map(tag => tag.name))));

    // console.log(uniqueTags);
    const { Panel } = Collapse;

    const toggleTagFilter = () => {
        setShowTagFilter(!showTagFilter);
    }
    const togglePriceFilter = () => {
        setShowPriceFilter(!showPriceFilter);
    }
    const handlePriceFilterChange = (min, max) => {
        setSelectedPriceOption([min, max]);
    }
    console.log(selectedPriceOption);
    const handleSortBy = (criteria) => {
        let sortedProducts;
        if(filterdata.length> 0){
            sortedProducts=[...filterdata]
        }else{
            sortedProducts=[...products]
        }
        // let sortedProducts = [...products];
        console.log("sss", sortedProducts);
        if (criteria === 'priceHighToLow') {
            sortedProducts.sort((a, b) => b.max_price - a.max_price);
        } else if (criteria === 'priceLowToHigh') {
            sortedProducts.sort((a, b) => a.min_price - b.min_price);
        }

        {
            sortmodel & screenWidth < 1024 &&

                setShortModel(!sortmodel)
        }
        if(filterdata.length > 0){
            setFilterData(sortedProducts)
        }else{

            setSorted(sortedProducts);
        }
    }
    const menu = (
        <Menu onClick={({ key }) => handleSortBy(key)}>
            <Menu.Item key="priceHighToLow">Price: High to Low</Menu.Item>
            <Menu.Item key="priceLowToHigh">Price: Low to High</Menu.Item>
        </Menu>
    );

    // console.log(products);
    const filtercall = async () => {
        if(screenWidth <1024){
            setFilterModel(!filtermodel)
        }
        const data = {
            brand: filters.brand,
            min_price: selectedPriceOption && selectedPriceOption[0],
            max_price: selectedPriceOption && selectedPriceOption[1],
            tag: filters.tag,
        }
        console.log(data);
        const queryParams = new URLSearchParams(data);
        const result = await fetch(`/api/product/search?${queryParams}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${isAuth}`, // Replace jwtToken with your actual JWT token
                "Content-Type": "application/json"
            }
        });
        const response = await result.json();
        if (response.success) {
            setFilterData(response.result)
            // setSorted(response.result)
            console.log(response);
            message.success({ content: response.message, duration: 2 });
        }else{
            message.warning({content:response.message})
        }
    }
    const handleReset = () => {
        setFilterData([])
        if (screenWidth < 1024) {
            setFilterModel(!filtermodel)
        }
        setFilters({
            brand: [],
            tag: []
        })
        setSelectedPriceOption(null)

        fetchData()
    }
    console.log(filterdata,sorted);

    return (
        <>
            <div className="d-flex w-full ">
                <div className="w-1/5 text-justify lg:flex flex-col hidden outline-1 ">
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>Reset</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>Apply filter</button>
                    </div>
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShow(!show) }}>
                        <h1>Brand Type</h1>
                        {show ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {show && <>
                        {uniqueBrands.map((product) => {
                            return (
                                <div key={product} className="p-1 flex gap-2 ">
                                    <Checkbox
                                        className="w-full"
                                        key={product}
                                        value={product}
                                        checked={filters.brand.includes(product)}
                                        onChange={(e) => setFilters(prevFilters => ({
                                            ...prevFilters,
                                            brand: e.target.checked
                                                ? [...prevFilters.brand, e.target.value]
                                                : prevFilters.brand.filter(item => item !== e.target.value)
                                        }))}
                                    >
                                        {product}
                                    </Checkbox>

                                </div>
                            )
                        })}
                    </>}


                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={toggleTagFilter}>
                        <h1>Tag</h1>
                        {showTagFilter ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showTagFilter && (
                        <>
                            {uniqueTags?.map((tag) => {
                                return (
                                    <Checkbox
                                        className="p-1 flex gap-2 "
                                        key={tag}
                                        value={tag}
                                        checked={filters.tag.includes(tag)}
                                        onChange={(e) => setFilters(prevFilters => ({
                                            ...prevFilters,
                                            tag: e.target.checked
                                                ? [...prevFilters.tag, e.target.value]
                                                : prevFilters.tag.filter(item => item !== e.target.value)
                                        }))}
                                    >
                                        {tag}
                                    </Checkbox>
                                )
                            })}
                        </>
                    )}

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={togglePriceFilter}>
                        <h1>Price Range</h1>
                        {showPriceFilter ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showPriceFilter &&
                        <>
                            {[{ label: '0 - 1000', value: [0, 1000] }, { label: '1001 - 2000', value: [1001, 2000] }, { label: '2001 - 3000', value: [2001, 3000] }].map((option, index) => (
                                <Radio
                                    key={index}
                                    className="p-1 flex gap-2"
                                    checked={selectedPriceOption !== null && selectedPriceOption[0] === option.value[0] && selectedPriceOption[1] === option.value[1]}
                                    onChange={() => handlePriceFilterChange(...option.value)}

                                >
                                    {option.label}
                                </Radio>
                            ))}
                            <Radio
                                key="none"
                                className="p-1 flex gap-2"
                                checked={selectedPriceOption === null}
                                onChange={() => setSelectedPriceOption(null)}
                            >
                                None
                            </Radio>
                        </>
                    }
                </div>
                <div className="flex grow flex-col lg:w-4/5 h-screen bg-white">
                    <div className=" p-2 lg:flex flex-col items-end hidden">

                        <Dropdown overlay={menu} >
                            <Button icon={<DownOutlined />} >Sort By</Button>
                        </Dropdown>
                    </div>
                    <div className="w-full ">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {filterdata.length > 0? 
                                filterdata.map((product,index)=>{
                                 return (
                                    <Grid item xs={12} sm={4} md={4} key={index}>
                                        <div className="border-2">
                                            <img className="object-scale-down w-full h-[70px]" src={product.gallery[0].original} alt="logo" />
                                            <hr />
                                            <div className="items-center justify-center flex flex-col ">
                                                <p>{product.brand}</p>
                                                <p>₹ {product.min_price}-₹ {product.max_price}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                )
                                })
                                :
                                sorted.map((product, index) => {
                                    return (
                                        <Grid item xs={12} sm={4} md={4} key={index}>
                                            <div className="border-2">
                                                <img className="object-scale-down w-full h-[70px]" src={product.gallery[0].original} alt="logo" />
                                                <hr />
                                                <div className="items-center justify-center flex flex-col ">
                                                    <p>{product.brand}</p>
                                                    <p>₹ {product.min_price}-₹ {product.max_price}</p>
                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })
                            }
                            {/* {sorted.map((product, index) => {
                                return (
                                    <Grid item xs={12} sm={4} md={4} key={index}>
                                        <div className="border-2">
                                            <img className="object-scale-down w-full h-[70px]" src={product.gallery[0].original} alt="logo" />
                                            <hr />
                                            <div className="items-center justify-center flex flex-col ">
                                                <p>{product.brand}</p>
                                                <p>₹ {product.min_price}-₹ {product.max_price}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            })} */}
                        </Grid>
                    </div>
                </div>
                <div className={`fixed bottom-0 p-2 w-screen flex lg:hidden bg-white justify-between ${filtermodel & screenWidth < 1024 && 'hidden'} ${sortmodel & screenWidth < 1024 && 'hidden'} `}>
                    <button className="w-full grow border-r-2 border-gray-300" onClick={() => { setShortModel(!sortmodel) }}>Sort</button>
                    <button className="w-full grow" onClick={() => { setFilterModel(!filtermodel) }} >Filter</button>
                </div>
            </div>
            {sortmodel & screenWidth < 1024 ? (
                <div className="w-full flex flex-col justify-between h-screen absolute top-0 bg-gray-300">
                    <CloseCircleOutlined className="justify-end flex text-xl hover:text-white p-1 sm:mt-2 mt-3 cursor-pointer" onClick={() => { setShortModel(!sortmodel) }} />
                    <div>
                        <Menu onClick={({ key }) => handleSortBy(key)}>
                            <Menu.Item key="priceHighToLow">Price: High to Low</Menu.Item>
                            <Menu.Item key="priceLowToHigh">Price: Low to High</Menu.Item>

                        </Menu>
                    </div>
                </div>
            ) : ''}
            {filtermodel & screenWidth < 1024 ? (
                <div className="w-full text-justify h-screen bg-white lg:flex flex-col absolute top-0  outline-1  ">
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>Cancel</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>Apply filter</button>
                    </div>
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShow(!show) }}>
                        <h1>Brand Type</h1>
                        {show ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {show && <>
                        {uniqueBrands.map((product) => {
                            return (
                                <Menu key={product} className="p-1 flex gap-2 ">
                                    <Checkbox
                                        className="w-full"
                                        key={product}
                                        value={product}
                                        checked={filters.brand.includes(product)}
                                        onChange={(e) => setFilters(prevFilters => ({
                                            ...prevFilters,
                                            brand: e.target.checked
                                                ? [...prevFilters.brand, e.target.value]
                                                : prevFilters.brand.filter(item => item !== e.target.value)
                                        }))}
                                    >
                                        {product}
                                    </Checkbox>

                                </Menu>
                            )
                        })}
                    </>}


                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={toggleTagFilter}>
                        <h1>Tag</h1>
                        {showTagFilter ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showTagFilter && (
                        <>
                            {uniqueTags?.map((tag) => {
                                return (
                                    <Menu key={tag._id} className="p-1 flex gap-2 ">
                                        <Checkbox
                                            className="p-1 flex gap-2 "
                                            key={tag}
                                            value={tag}
                                            checked={filters.tag.includes(tag)}
                                            onChange={(e) => setFilters(prevFilters => ({
                                                ...prevFilters,
                                                tag: e.target.checked
                                                    ? [...prevFilters.tag, e.target.value]
                                                    : prevFilters.tag.filter(item => item !== e.target.value)
                                            }))}
                                        >
                                            {tag}
                                        </Checkbox>
                                    </Menu>
                                )
                            })}
                        </>
                    )}

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={togglePriceFilter}>
                        <h1>Price Range</h1>
                        {showPriceFilter ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showPriceFilter &&
                        <>
                            {[{ label: '0 - 1000', value: [0, 1000] }, { label: '1001 - 2000', value: [1001, 2000] }, { label: '2001 - 3000', value: [2001, 3000] }].map((option, index) => (
                                <Menu key={index} className="p-1 flex gap-2 ">
                                    <Radio
                                        key={index}
                                        className="p-1 flex gap-2"
                                        checked={selectedPriceOption !== null && selectedPriceOption[0] === option.value[0] && selectedPriceOption[1] === option.value[1]}
                                        onChange={() => handlePriceFilterChange(...option.value)}

                                    >
                                        {option.label}
                                    </Radio>
                                </Menu>
                            ))}
                            <Menu  className="p-1 flex gap-2">

                            <Radio
                                key="none"
                                className="p-1 flex gap-2"
                                checked={selectedPriceOption === null}
                                onChange={() => setSelectedPriceOption(null)}
                                >
                                None
                            </Radio>
                            </Menu>
                        </>
                    }
                </div>
            ) : ''}
        </>
    )
}
export default Product;