'use client'

import { CloseCircleOutlined, DownOutlined, MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Checkbox, Collapse, Dropdown, Radio, Select, Menu, Button, Tooltip } from 'antd';

const Product = () => {
    const [products, setProducts] = useState([]);
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

    const uniqueTags = Array.from(new Set(products?.flatMap(product => product.tag.map(tag => tag.name))));
    console.log(uniqueTags);
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

    const handleSortBy = (criteria) => {
        console.log(criteria);
        // let sortedProducts = [...data];

        // if (criteria === 'priceHighToLow') {
        //     sortedProducts.sort((a, b) => b.price - a.price);
        // } else if (criteria === 'priceLowToHigh') {
        //     sortedProducts.sort((a, b) => a.price - b.price);
        // }

        // setSortedData(sortedProducts);
    }
    const menu = (
        <Menu onClick={({ key }) => handleSortBy(key)}>
            <Menu.Item key="priceHighToLow">Price: High to Low</Menu.Item>
            <Menu.Item key="priceLowToHigh">Price: Low to High</Menu.Item>
            {/* Add more sorting criteria as needed */}
        </Menu>
    );
  
    console.log(products);

    return (
        <>
            <div className="d-flex w-full ">
                <div className="w-1/4 text-justify lg:flex flex-col hidden outline-1 ">
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded">Reset</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded">Apply filter</button>
                    </div>
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShow(!show) }}>
                        <h1>Brand Type</h1>
                        {show ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {show && <>
                        {products.map((product) => {
                            return (
                                <div key={product._id} className="p-1 flex gap-2 ">
                                    <Checkbox
                                        className="w-full"
                                        key={product._id}
                                        value={product.brand}
                                        onChange={(e) => setFilters(prevFilters => ({
                                            ...prevFilters,
                                            brand: e.target.checked
                                                ? [...prevFilters.brand, e.target.value]
                                                : prevFilters.brand.filter(item => item !== e.target.value)
                                        }))}
                                    >
                                        {product.brand}
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
                            {[{ label: '0 - 100', value: [0, 100] }, { label: '101 - 200', value: [101, 200] }, { label: '201 - 300', value: [201, 300] }].map((option, index) => (
                                <Radio
                                    key={index}
                                    className="p-1 flex gap-2"
                                    checked={selectedPriceOption !== null && selectedPriceOption[0] === option.value[0] && selectedPriceOption[1] === option.value[1]}
                                    onChange={() => handlePriceFilterChange(...option.value)}

                                >
                                    {option.label}
                                </Radio>
                            ))}
                        </>
                    }
                </div>
                <div className="grow bg-white h-screen  p-2 lg:flex flex-col w-full items-end hidden">

                    <Dropdown overlay={menu} >
                        <Button icon={<DownOutlined />} >Sort By</Button>
                    </Dropdown>


                </div>
                <div className="fixed bottom-0  w-screen flex lg:hidden  justify-between ">
                    <Button className="w-full grow" onClick={() => { setShortModel(!sortmodel) }}>Sort</Button>
                    <Button className="w-full grow" >Filter</Button>
                </div>
            </div>
            {sortmodel && (
                <div className="w-full flex flex-col justify-between h-screen absolute top-0  ">
                    <CloseCircleOutlined className="justify-end flex text-xl p-5 cursor-pointer" onClick={()=>{setShortModel(!sortmodel)}}/>
                    <div>
                        <Menu onClick={({ key }) => handleSortBy(key)}>
                            <Menu.Item key="priceHighToLow">Price: High to Low</Menu.Item>
                            <Menu.Item key="priceLowToHigh">Price: Low to High</Menu.Item>
                            {/* Add more sorting criteria as needed */}
                        </Menu>
                    </div>
                </div>
            )}
        </>
    )
}
export default Product;