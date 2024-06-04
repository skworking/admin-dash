'use client'
import { useState, useMemo, useEffect } from "react";
import useProductStore from "@/store/productStrore";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Breadcrumbs from "../../../components/reuseable/bread";
import { fetchData } from "@/app/utils/apiUtils";
import { calculatePriceCounts, getUniqueNameUrlWithCount } from "@/app/utils/utils";
import { Button, Checkbox, Col, Form, Input, Dropdown, Menu, Radio, Row, message, Select } from "antd";
import { CloseCircleOutlined, DownOutlined, MinusOutlined, PlusOutlined, WarningFilled } from "@ant-design/icons";
import { Grid } from "@mui/material";
import Image from "next/image";
import SkeletonLoader from "../../../components/reuseable/skelenton";
import Link from "next/link";
import SortModal from "../../../components/reuseable/shortModel";
import { Check } from "react-feather";
const BrandPage = () => {
    const t = useTranslations('Index')
    const setItems = useProductStore((state) => state.setItems)
    const pathname = usePathname()
    const endpoint = pathname.split("/").pop();
    const [products, setProducts] = useState([]);
    const handleSetProduct = (product) => {
        // const product = {
        //     id: 1,
        //     name: 'Sample Product',
        //     description: 'This is a sample product.',
        //     price: 99.99,
        //   };

        setItems(product);
    };
    const filterProducts = (products, value) => {
        return products.filter(product => product.brand.toLowerCase() === value.toLowerCase());
    }
    const [filterdata, setFilterData] = useState(null);
    const [filterProduct, setFilterProduct] = useState(null)
    useMemo(() => {

        if (endpoint !== null & products !== null) {
            const data = filterProducts(products, endpoint)
            setFilterProduct(data)
            setFilterData(data)

        }
    }, [products])
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [showTagFilter, setShowTagFilter] = useState(true);
    const [showPriceFilter, setShowPriceFilter] = useState(true);
    const [selectedPriceOption, setSelectedPriceOption] = useState(null);
    const [filters, setFilters] = useState({
        body: [],
        brand: [],
        tag: [],
        bodytype: [],
    });
    const [sortmodel, setShortModel] = useState(true)
    const [filtermodel, setFilterModel] = useState(true)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [variation, setVariation] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPages, setTotalPage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [showProdctBody, setShowProductBody] = useState(true);
    const [offer, setOffer] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const fetchProducts = async () => {
        const { data, totalPages } = await fetchData('/api/products', isAuth);
        setProducts(data);
        //   setTotalPage(totalPages);
    };
    useEffect(() => {

        fetchProducts();
        // fetchData();
    }, []);

    const handleNextPage = () => {
        if (totalPages > 1) {
            setcurrentPage(currentPage + 1);
        }
    };

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
        {
            sortmodel & screenWidth < 1024 &&
                setShortModel(!sortmodel)
        }
        if (filterdata.length > 0)
            setFilterData(sortedProducts)

    }
    const menu = (
        <Menu onClick={({ key }) => handleSortBy(key)}>
            <Menu.Item key="priceHighToLow">{t('Price: High to Low')}</Menu.Item>
            <Menu.Item key="priceLowToHigh">{t('Price: Low to High')}</Menu.Item>
        </Menu>
    );
    const filtercall = async () => {
        setLoading(!loading)
        if (screenWidth < 1024) {
            setFilterModel(!filtermodel)
        }
        const data = {
            bodytype: filters.bodytype,
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
            setLoading(!loading);
            setFilterData(response.result)

            setTotalPage(response.totalPages)
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
            tag: [],
            bodytype: [],
        })
        setSelectedPriceOption(null)
        fetchProducts()
    }
    const togglePriceFilter = () => {
        setShowPriceFilter(!showPriceFilter);
    }
    const handlePriceFilterChange = (max) => {
        setSelectedPriceOption(max);
    }

    const priceCount = calculatePriceCounts(filterProduct)
    const uniqueNameUrlWithCount = getUniqueNameUrlWithCount(filterProduct)
    const closemodel = () => {
        setShortModel(!sortmodel)
    }
    const FormItem = Form.Item;
    const [form] = Form.useForm();
    const { Option } = Select;
    return (
        <div className="relative">
            <Breadcrumbs currentLoc={pathname} />
            <div className="px-10  mt-5 d-flex w-full relative">
                <div className="w-1/5 text-justify lg:flex flex-col hidden outline-1 ">
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>{t('Reset')}</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>{t('Apply filter')}</button>
                    </div>

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShowProductBody(!showProdctBody) }}>
                        <h1>{t('Body Type')}</h1>
                        {showProdctBody ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showProdctBody &&

                        <div className={`${uniqueNameUrlWithCount?.length > 5 ? 'h-[200px] overflow-auto bg-white' : 'h-auto  bg-white  '} `}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {uniqueNameUrlWithCount.map((item, index) => {

                                    const name1 = item?.name?.split('.')
                                    console.log(name1[0].toLowerCase());
                                    const handleChange = (e) => {
                                        const { value, checked } = e.target;
                                        setFilters(prevFilters => ({
                                            ...prevFilters,
                                            bodytype: checked
                                                ? [...prevFilters.bodytype, value]
                                                : prevFilters.bodytype.filter(item => item !== value)
                                        }));
                                    }
                                    return (
                                        <Grid item xs={12} sm={4} md={4} key={index}>

                                            <Checkbox
                                                className="w-full"
                                                key={index}
                                                value={name1[0].toLowerCase()}
                                                checked={filters.bodytype.includes(name1[0].toLowerCase())}
                                                onChange={handleChange}

                                            >

                                                <Image src={item.url} width={50} height={80} />
                                                <div>{t(`${name1[0]}`)} ({item.count})</div>
                                            </Checkbox>

                                        </Grid>
                                    )
                                })}

                            </Grid>
                        </div>
                    }

                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={togglePriceFilter}>
                        <h1>{t('Price Range')}</h1>
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

                                        {t(`Under ${price} Lakh`)} ({`${count}`})
                                    </Radio>
                                ))}
                                <Radio
                                    key="none"
                                    className="p-1 flex gap-2"
                                    checked={selectedPriceOption === null}
                                    onChange={() => handlePriceFilterChange(null)}
                                >
                                    {t('None')}
                                </Radio>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex grow flex-col lg:w-4/5 h-screen bg-white">
                    <div className=" p-2 lg:flex  justify-between hidden">
                        <div className="font-bold">{t('Populer')} {t(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`)} {t(`Trucks`)}
                            <hr className="w-[50px] h-2  bg-blue-500  rounded " style={{ opacity: 1 }} ></hr>
                        </div>
                        <Dropdown overlay={menu} >
                            <Button icon={<DownOutlined />} >{t('Sort By')}</Button>
                        </Dropdown>
                    </div>
                    <div className="w-full  p-2 ">
                        <div className="lg:hidden mb-2">{t('Populer')} {t(`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`)} {t(`Trucks`)}
                            <hr className="w-[50px] h-2  bg-blue-500  rounded " style={{ opacity: 1 }}></hr>
                        </div>

                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {

                                !!filterdata ?
                                    filterdata.map((product, index) => {
                                        return (
                                            <>
                                                <Grid item xs={12} sm={4} md={4} key={index} onClick={() => { handleSetProduct(product) }}>
                                                    <Link href={`/brands/${endpoint}-truck/${product.slug}`}
                                                        // href={{
                                                        //     pathname: `/brands/${endpoint}-truck/${product.slug}`
                                                        //     // query: { name: product.name, image: product.image, body: product.body },
                                                        // }}
                                                        className="no-underline text-black">
                                                        <div className="border-2  flex flex-col gap-2 bg-slate-50">
                                                            <img className="object-cover w-full h-[200px]" src={product.gallery[0].original} alt="logo" />

                                                            <div className="items-center justify-center flex flex-col gap-2 p-3">
                                                                <p>{t(`${product.slug}`)}</p>
                                                                <p>₹{product.min_price} - ₹{product.max_price} {t('Lakh')}</p>
                                                                <Button type="primary" className="w-full " onClick={(e) => { handleOffer(e, product) }}>{t('Check Offers')}</Button>
                                                            </div>
                                                            <hr />
                                                            <div className="relative w-full">
                                                                <div className="flex w-full justify-between p-1 cursor-pointer" onClick={() => toggleVariation(index)}>
                                                                    <p>{t('No variation Found')}</p>
                                                                    <PlusOutlined className={`transition-transform duration-300 ${variation === index ? 'rotate-45' : 'rotate-0'}`} />
                                                                </div>
                                                                {variation === index && (
                                                                    <div className="absolute top-full left-0 w-full p-1 border-2 bg-slate-50 transition-opacity duration-500">
                                                                        {t('No Data Found')}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Grid>

                                            </>
                                        )
                                    })
                                    :
                                    ''

                            }
                        </Grid>
                        {loading && <SkeletonLoader />}
                        {filterdata?.length > 0 &&
                            <Button type="primary" className="sm:w-1/2 w-full border mt-5 flex justify-center m-auto rounded outline-1 p-1" onClick={handleNextPage} disabled={totalPages === 1}>{t('Load More')}</Button>
                        }
                        <br />
                        <br />
                    </div>
                    {offer != null &&
                        <div className="absolute w-full p-2 flex h-screen justify-between opacity-100 bg-transparent  items-center  bg-gray-300" >
                            <div className="justify-center m-auto bg-slate-50 sm:w-1/2 w-full sm:h-1/2 h-full items-center ">
                                <CloseCircleOutlined className="float-end items-end p-2 text-end hover:text-gray-500 font-bold" onClick={handleClose} />
                                <div className="w-full p-2 flex flex-col ">
                                    <Form form={form} className="flex flex-col gap-3" onFinish={handleSignIn}>
                                        <Row>
                                            <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                                                <h1 className="w-full text-bold text-xl">{offer.slug}</h1>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>

                                                <FormItem

                                                    name="name"
                                                    rules={[
                                                        { type: "text" },
                                                        { required: true, message: 'Please input your Name!' }
                                                    ]}
                                                >
                                                    <Input suffix={value?.name?.length > 0 ? <Check color="green" /> : <WarningFilled />} placeholder="Name" value={value.name} className="no-rounded"
                                                        onChange={(e) => handleChange(e, 'name')}
                                                    />
                                                </FormItem>
                                            </Col>
                                            <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>

                                                <FormItem

                                                    name="phone"
                                                    rules={[
                                                        { type: "tel" },
                                                        { required: true, message: 'Please input your Mobile No!' }
                                                    ]}
                                                >
                                                    <Input suffix={value?.phone?.length > 0 ? <Check color="green" /> : <WarningFilled />} placeholder="Phone Number" value={value.phone} className="no-rounded"
                                                        onChange={(e) => handleChange(e, 'phone')}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={{ span: 20, offset: 1 }} lg={{ span: 21, offset: 1 }}>
                                                <FormItem
                                                    rules={[
                                                        { required: true, message: 'Please select a city' },
                                                    ]}
                                                >
                                                    <Select
                                                        value={city}
                                                        onChange={handleCityChange}
                                                        onSearch={handleCitySearch}
                                                        placeholder="Select a city"

                                                        showSearch

                                                    >

                                                        {districts.map(district => (
                                                            district.cities.map(city => (
                                                                <Option key={`${city}, ${district.name}`} value={`${city}, ${district.name}`}>
                                                                    {`${city}, ${district.name}`}
                                                                </Option>
                                                            ))
                                                        ))}
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{ span: 20, offset: 1 }} lg={{ span: 21, offset: 1 }}>
                                                <Button type="primary" className="w-full" htmlType="submit">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={{ span: 21, offset: 1 }} >
                                                <p>By proceeding ahead you expressly agree to the Truck Buses<span>Terms and Conditions</span></p>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </div>

                    }
                </div>
            </div>
            <div className={`fixed bottom-0 p-2 w-screen flex lg:hidden bg-white justify-between ${filtermodel & screenWidth < 1024 && 'hidden'} ${sortmodel & screenWidth < 1024 && 'hidden'} `}>
                <button className="w-full grow border-r-2 border-gray-300" onClick={() => { setShortModel(!sortmodel) }}>Sort</button>
                <button className="w-full grow" onClick={() => { setFilterModel(!filtermodel) }} >Filter</button>
            </div>
            <SortModal
                isVisible={sortmodel}
                screenWidth={screenWidth}
                handleClose={closemodel}
                handleSortBy={handleSortBy}
            />
            {filtermodel & screenWidth < 1024 ? (
                <div className="w-full text-justify h-screen bg-white lg:flex flex-col fixed overflow-x-auto  top-0  outline-1  ">
                    <div className="flex mt-5 justify-between w-full gap-2 p-2 bg-blue-100 ">
                        <button className="bg-sky-50  hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>{t(`Cancel`)}</button>
                        <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>{t('Apply filter')}</button>
                    </div>
                    <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer " onClick={() => { setShowProductBody(!showProdctBody) }}>
                        <h1>{t('Body Type')}</h1>
                        {showProdctBody ? <MinusOutlined /> : <PlusOutlined />}
                    </div>
                    {showProdctBody && <>
                        <div className={`${uniqueNameUrlWithCount?.length > 5 ? 'h-[200px] overflow-auto bg-white' : 'h-auto  bg-white  '} `}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {uniqueNameUrlWithCount.map((item, index) => {

                                    const name1 = item?.name?.split('.')

                                    const handleChange = (e) => {
                                        const { value, checked } = e.target;
                                        setFilters(prevFilters => ({
                                            ...prevFilters,
                                            bodytype: checked
                                                ? [...prevFilters.bodytype, value]
                                                : prevFilters.bodytype.filter(item => item !== value)
                                        }));
                                    }
                                    return (
                                        <Grid item xs={2} sm={4} md={2} key={index}>

                                            <Checkbox
                                                className=""
                                                key={index}
                                                value={name1[0]}
                                                checked={filters.bodytype.includes(name1[0].toLowerCase())}
                                                onChange={handleChange}

                                            >

                                                <Image src={item.url} width={50} height={80} />
                                                <div>{t(`${name1[0]}`)} ({item.count})</div>
                                            </Checkbox>

                                        </Grid>
                                    )
                                })}

                            </Grid>
                        </div>
                    </>
                    }
                </div>) : ''}
        </div>
    )
}
export default BrandPage;