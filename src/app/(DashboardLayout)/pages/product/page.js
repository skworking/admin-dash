'use client'

import { CloseCircleOutlined, DownOutlined, MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useMemo } from "react";
import { Checkbox, Collapse, Dropdown, Radio, Select, Menu, Button, Tooltip, message } from 'antd';
import { Grid } from "@mui/material";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [show, setShow] = useState(false);
    const [showTagFilter, setShowTagFilter] = useState(false);
    const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [showProductType, setShowProductType] = useState(false);

    const [selectedPriceOption, setSelectedPriceOption] = useState(null);
    const [filters, setFilters] = useState({
        body: [],
        brand: [],
        tag: []
    });
    const [sortmodel, setShortModel] = useState(false)
    const [filtermodel, setFilterModel] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [variation, setVariation] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPages, setTotalPage] = useState(null)


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

                setTotalPage(data.totalPages)
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
    // const uniqueBrands = [...new Set(products.map(product => product.brand))];
    // const uniqueTags = Array.from(new Set(products?.flatMap(product => product.tag.map(tag => tag.name))));
    // const productType=[...new Set(products.map(product => product.product_type))];

    const { Panel } = Collapse;

    const priceCount = products.reduce((acc, product) => {
        acc[product.price] = (acc[product.price] || 0) + 1;
        return acc
    }, {})

    const brandCounts = products.reduce((acc, product) => {
        acc[product.brand] = (acc[product.brand] || 0) + 1;
        return acc;
    }, {});
    const tagConts = products?.reduce((acc, product) => {
        product.tag.forEach(tag => {
            acc[tag.name] = (acc[tag.name] || 0) + 1;
        });
        return acc
    }, {})
    const typeCount = products.reduce((acc, product) => {
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
            // setcurrentPage(response.currentPage)
            setTotalPage(response.totalPages)
            // setSorted(response.result)

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
        if (totalPages > currentPage) {
            setcurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
    };
    const handlePageClick = (pageNumber) => {
        setcurrentPage(pageNumber);
    };

    return (
        <>
            <div className="d-flex w-full ">
                <div className="w-1/5 text-justify lg:flex flex-col hidden outline-1 ">
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>Reset</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>Apply filter</button>
                    </div>

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShowProductType(!showProductType) }}>
                        <h1>Product Type</h1>
                        {showProductType ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showProductType && <>
                        {Object.entries(typeCount).map(([product, count]) => {
                            return (
                                <div key={product} className="p-1 flex gap-2 ">
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
                    </>
                    }
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShow(!show) }}>
                        <h1>Brand Type</h1>
                        {show ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {show && <>
                        {Object.entries(brandCounts).map(([product, count]) => {

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
                                        {`${product} (${count})`}
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
                            {Object.entries(tagConts)?.map(([tag, count]) => {
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
                                        {`${tag} (${count})`}
                                    </Checkbox>
                                )
                            })}
                        </>
                    )}

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={togglePriceFilter}>
                        <h1>Price Range</h1>
                        {showPriceFilter ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showPriceFilter && (
                        <>
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
                    <div className="w-full  p-2 ">
                        <div className="lg:hidden mb-2">{filterdata.length > 0 ? filterdata.length : sorted.length} Latest Truck Found
                            <hr className="w-[50px] h-2  bg-blue-500  rounded " style={{ opacity: 1 }}></hr>
                        </div>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {filterdata.length > 0 ?
                                filterdata.map((product, index) => {
                                    return (
                                        <Grid item xs={12} sm={4} md={4} key={index}>
                                            <div className="border-2  flex flex-col gap-2 bg-sky-100">
                                                <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />

                                                <div className="items-center justify-center flex flex-col ">
                                                    <p>{product.slug}</p>
                                                    <p>₹{product.min_price} - ₹{product.max_price} Lakh</p>
                                                </div>
                                                <Button type="primary" className="w-full ">Check Offers</Button>
                                                <div className="relative flex w-full justify-between p-1  cursor-pointer" onClick={() => { toggleVariation(index) }}>
                                                    <p>
                                                        No variation Found
                                                    </p>
                                                    {variation === index ? <PlusOutlined className="rotate-45 transition delay-300 duration-300" /> : <PlusOutlined className="rotate-0 transition delay-300 duration-300" />}

                                                    {variation === index && (
                                                        <div className={`absolute top-8 left-0 w-full p-1 border-2  opacity-100 bg-slate-50 delay-1000 transition duration-500`}  >
                                                            No Data Found
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </Grid>
                                    )
                                })
                                :
                               ''
                                // sorted.map((product, index) => {
                                //     return (
                                //         <>

                                //             <Grid item xs={12} sm={4} md={4} key={index}>
                                //                 <div className=" border-2 flex flex-col gap-2 bg-slate-50">
                                //                     <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />

                                //                     <div className="items-center justify-center flex flex-col ">
                                //                         <p className="text-blue-400">{product.slug}</p>
                                //                         <p>₹ {product.min_price} - ₹{product.max_price} Lakh</p>
                                //                     </div>
                                //                     <Button type="primary" className="w-full ">Check Offers</Button>
                                //                     <hr />
                                //                     <div className="relative flex w-full justify-between p-1  cursor-pointer" onClick={() => { toggleVariation(index) }}>
                                //                         <p>
                                //                             No variation Found
                                //                         </p>
                                //                         {variation === index ? <PlusOutlined className="rotate-45 transition delay-300 duration-300" /> : <PlusOutlined className="rotate-0 transition delay-300 duration-300" />}

                                //                         {variation === index && (
                                //                             <div className={`absolute top-8 left-0 w-full p-1 border-2  opacity-100 bg-slate-50 delay-1000 transition duration-500`}  >
                                //                                 No Data Found
                                //                             </div>
                                //                         )}

                                //                     </div>
                                //                 </div>
                                //             </Grid>

                                //         </>
                                //     )
                                // })
                            }

                        </Grid>
                        {filterdata.length >0 &&
                        <div className="w-1/2 text-center m-auto p-1 border-2 rounded flex gap-5 mt-3">
                        <button className="border rounded outline-1 p-1" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <button className={`bg-gray-200 w-[100px] ${currentPage === pageNumber ?'bg-gray-500':''}`} key={pageNumber} onClick={() => handlePageClick(pageNumber)}>{pageNumber}</button>
                        ))}
                        </>
                        <button className="border rounded outline-1 p-1" onClick={handleNextPage} disabled={totalPages === currentPage}>Next</button>
                        </div>
                        }
                       
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
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShowProductType(!showProductType) }}>
                        <h1>Product Type</h1>
                        {showProductType ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showProductType && <>
                        {Object.entries(typeCount).map(([product, count]) => {
                            return (
                                <div key={product} className="p-1 flex gap-2 ">
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
                    </>
                    }
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShow(!show) }}>
                        <h1>Brand Type</h1>
                        {show ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {show && <>
                        {Object.entries(brandCounts).map(([product, count]) => {
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
                                        {`${product} (${count})`}
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
                            {Object.entries(tagConts)?.map(([tag, count]) => {
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
                                            {`${tag} (${count})`}
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
                            {Object.entries(priceCount).map(([price, count]) => (
                                <Menu key={price} className="p-1 flex gap-2 ">
                                    <Radio
                                        className="p-1 flex gap-2"
                                        checked={selectedPriceOption !== null && selectedPriceOption === price}
                                        onChange={() => handlePriceFilterChange(price)}

                                    >
                                        {`Under ${price} Lakh (${count})`}
                                    </Radio>
                                </Menu>
                            ))}
                            <Menu className="p-1 flex gap-2">

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