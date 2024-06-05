'use client'
import { usePathname, useRouter } from "next/navigation";
import Breadcrumbs from "../../components/reuseable/bread";
import banner from 'public/images/compare.webp';
import Image from "next/image";
import { fetchData } from "@/app/utils/apiUtils";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "../../components/reuseable/select";
import { Button } from "antd";
import useProductStore from "@/store/productStrore";


const ComparePage = () => {
    // const { setTruck1, setTruck2 } = useProductStore();
    const setTruck1=useProductStore((state)=> state.setTruck1)
    const setTruck2=useProductStore((state)=> state.setTruck2)
    const pathname = usePathname();
    const router=useRouter()
    const [product, setProducts] = useState([]);
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));

    const fetchProducts = async () => {
        const { data } = await fetchData('/api/products', isAuth);
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, [isAuth]);

    const productTypes = [...new Set(product.map(item => item.product_type))];

    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand1, setSelectedBrand1] = useState('');
    const [selectedSlug1, setSelectedSlug1] = useState('');
    const [selectedBrand2, setSelectedBrand2] = useState('');
    const [selectedSlug2, setSelectedSlug2] = useState('');

    const brands = selectedType ? [...new Set(product.filter(item => item.product_type === selectedType).map(item => item.brand))] : [];
    const slugs1 = selectedBrand1 ? [...new Set(product.filter(item => item.product_type === selectedType && item.brand === selectedBrand1).map(item => item.slug))] : [];
    const slugs2 = selectedBrand2 ? [...new Set(product.filter(item => item.product_type === selectedType && item.brand === selectedBrand2).map(item => item.slug))] : [];


    const filteredProduct1 = product.find(item =>
        item.product_type === selectedType &&
        item.brand === selectedBrand1 &&
        item.slug === selectedSlug1
    );
    const handleCompare=()=>{
        setTruck1(filteredProduct1);
        setTruck2(filteredProduct2);
        router.push(`/compare/${selectedSlug1}-vs-${selectedSlug2}`)
    }

    const filteredProduct2 = product.find(item =>
        item.product_type === selectedType &&
        item.brand === selectedBrand2 &&
        item.slug === selectedSlug2
    );
    console.log(selectedSlug1);
    const t = useTranslations("Index");
  
    return (
        <>
            <div className="relative flex flex-col gap-1">
                {/* Banner component */}
                <div className="mb-1 relative">
                    <Image
                        src={banner}
                        className="w-full sm:flex hidden"
                        alt="avatar"
                        width={5000}
                        height={100}
                    />
                    <div className="sm:absolute top-0 bottom-0 left-20 m-auto sm:w-1/2 w-full p-2 h-1/2 text-start justify-center">
                        <p className="text-2xl font-semibold">Compare Trucks</p>
                        <p>Compare and know which truck is best for you.</p>
                    </div>
                </div>
                {/* Breadcrumbs component */}
                <Breadcrumbs currentLoc={pathname} />

                <div className="sm:p-10 mt-2 sm:max-w-7xl w-full m-auto flex flex-col gap-3  items-center ">
                    <div className="bg-blue-400 w-full rounded justify-around flex flex-start overflow-hidden gap-2 flex-wrap">
                        {productTypes.map(type => (
                            <label key={type} className="flex gap-2">
                                <input
                                    type="radio"
                                    name="productType"
                                    value={type}
                                    checked={selectedType === type}
                                    onChange={(e) => {
                                        setSelectedType(e.target.value);
                                        setSelectedBrand1('');
                                        setSelectedSlug1('');
                                        setSelectedBrand2('');
                                        setSelectedSlug2('');
                                    }}
                                />
                                {t(`${type}`)}
                            </label>
                        ))}
                    </div>

                    {selectedType && (
                        <div className="sm:flex sm:flex-row w-full justify-center text-start gap-8 mt-4">
                            <div className="border-2 p-2 text-center m-auto sm:w-1/2">
                                <h2>Add Truck 1</h2>
                                <div className="w-full flex items-center justify-center">
                                {!!filteredProduct1 && (
                                    <img src={filteredProduct1?.images[0].original} alt="logo" className="w-1/2  " width={200} height={100} />
                                ) }
                                </div>
                                <Select
                                    label="Select Brand"
                                    options={brands}
                                    value={selectedBrand1}
                                    onChange={(e) => {
                                        setSelectedBrand1(e.target.value);
                                        setSelectedSlug1('');
                                    }}
                                    placeholder="- Select Brand -"
                                />

                                {selectedBrand1 && (
                                    <Select
                                        label="Select Slug"
                                        options={slugs1}
                                        value={selectedSlug1}
                                        onChange={(e) => setSelectedSlug1(e.target.value)}
                                        placeholder="- Select a Slug -"
                                    />
                                )}
                            </div>

                            <div className="border-2 p-2 text-center sm:w-1/2">
                                <h2>Truck 2</h2>
                                <div className="w-full flex items-center justify-center">
                                {!!filteredProduct2 && (
                                    <img src={filteredProduct2?.images[0].original} alt="logo" className="w-1/2  " width={200} height={100} />
                                ) }
                                </div>
                                <Select
                                    label="Select Brand"
                                    options={brands}
                                    value={selectedBrand2}
                                    onChange={(e) => {
                                        setSelectedBrand2(e.target.value);
                                        setSelectedSlug2('');
                                    }}
                                    placeholder="--Select a Brand--"
                                />

                                {selectedBrand2 && (
                                    <Select
                                        label="Select Slug"
                                        options={slugs2}
                                        value={selectedSlug2}
                                        onChange={(e) => setSelectedSlug2(e.target.value)}
                                        placeholder="- Select a Slug -"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    <Button type="primary" className="w-1/3 " onClick={handleCompare}  disabled={!filteredProduct1 || !filteredProduct2}> Find Compare </Button>
                    
                    
                </div>
            </div>
        </>
    );
};

export default ComparePage;
