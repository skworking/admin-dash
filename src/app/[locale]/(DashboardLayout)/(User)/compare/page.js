'use client'
import { usePathname } from "next/navigation";
import Breadcrumbs from "../../components/reuseable/bread";
import compare from 'public/images/compare.webp';
import Image from "next/image";
import { fetchData } from "@/app/utils/apiUtils";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const Compare = () => {
    const pathname = usePathname();
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

    const filteredProduct2 = product.find(item => 
        item.product_type === selectedType &&
        item.brand === selectedBrand2 &&
        item.slug === selectedSlug2
    );

    const t = useTranslations("Index");

    return (
        <>
            <div className="relative">
                {/* Banner component */}
                <div className="mb-1 relative">
                    <Image
                        src={compare}
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

                <div className="p-10 max-w-7xl m-auto">
                    <div className="bg-red-300 w-full justify-around flex">
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
                            <div>
                                <h2>Truck 1</h2>
                                <div className="mt-4">
                                    <label htmlFor="brand1">Select Brand:</label>
                                    <select
                                        id="brand1"
                                        value={selectedBrand1}
                                        onChange={(e) => {
                                            setSelectedBrand1(e.target.value);
                                            setSelectedSlug1('');
                                        }}
                                    >
                                        <option value="">--Select a Brand--</option>
                                        {brands.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                {selectedBrand1 && (
                                    <div className="mt-4">
                                        <label htmlFor="slug1">Select Slug:</label>
                                        <select
                                            id="slug1"
                                            value={selectedSlug1}
                                            onChange={(e) => setSelectedSlug1(e.target.value)}
                                        >
                                            <option value="">--Select a Slug--</option>
                                            {slugs1.map(slug => (
                                                <option key={slug} value={slug}>{slug}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h2>Truck 2</h2>
                                <div className="mt-4">
                                    <label htmlFor="brand2">Select Brand:</label>
                                    <select
                                        id="brand2"
                                        value={selectedBrand2}
                                        onChange={(e) => {
                                            setSelectedBrand2(e.target.value);
                                            setSelectedSlug2('');
                                        }}
                                    >
                                        <option value="">--Select a Brand--</option>
                                        {brands.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                {selectedBrand2 && (
                                    <div className="mt-4">
                                        <label htmlFor="slug2">Select Slug:</label>
                                        <select
                                            id="slug2"
                                            value={selectedSlug2}
                                            onChange={(e) => setSelectedSlug2(e.target.value)}
                                        >
                                            <option value="">--Select a Slug--</option>
                                            {slugs2.map(slug => (
                                                <option key={slug} value={slug}>{slug}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <h2 className="mt-4">Comparison:</h2>
                    <ul>
                        {filteredProduct1 && (
                            <li key={filteredProduct1.slug}>
                                <strong>Truck 1:</strong> {filteredProduct1.name}
                            </li>
                        )}
                        {filteredProduct2 && (
                            <li key={filteredProduct2.slug}>
                                <strong>Truck 2:</strong> {filteredProduct2.name}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Compare;
