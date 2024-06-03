import React, { useState } from 'react';
import { Checkbox, Collapse, Radio, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const FilterPanel = ({ filters, setFilters, uniqueNameUrlWithCount, priceCount, handleReset, filtercall }) => {
   
    const t = useTranslations('Index');
   console.log(priceCount);
    const [showTagFilter, setShowTagFilter] = useState(true);
    const [showPriceFilter, setShowPriceFilter] = useState(true);
    const [showProductBody, setShowProductBody] = useState(true);
    const [selectedPriceOption, setSelectedPriceOption] = useState(null);

    const toggleTagFilter = () => {
        setShowTagFilter(!showTagFilter);
    };

    const togglePriceFilter = () => {
        setShowPriceFilter(!showPriceFilter);
    };

    const handlePriceFilterChange = (max) => {
        setSelectedPriceOption(max);
    };

    return (
        <div className="w-1/5 text-justify lg:flex flex-col hidden outline-1">
            <div className="flex justify-between w-full gap-2 p-2 bg-blue-100">
                <button className="bg-sky-50 hover:bg-blue-500 text-blue-500 m-auto hover:text-white p-2 grow flex border-1 border-blue-500 rounded" onClick={handleReset}>{t('Reset')}</button>
                <button className="hover:bg-blue-500 bg-blue-400 p-2 grow text-white rounded" onClick={filtercall}>{t('Apply filter')}</button>
            </div>

            <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={() => setShowProductBody(!showProductBody)}>
                <p>{t('BodyType')}</p>
                <span>{showProductBody ? <MinusOutlined /> : <PlusOutlined />}</span>
            </div>

            {showProductBody && (
                <div className="flex justify-start flex-col text-gray-600 p-3 bg-blue-50">
                    <Checkbox.Group value={filters.body} onChange={(checkedValues) => setFilters({ ...filters, body: checkedValues })} style={{ display: 'flex', flexDirection: 'column' }}>
                        {uniqueNameUrlWithCount.map((product, index) => (
                            <Checkbox key={index} value={product.name_url}>{product.name} ({product.count})</Checkbox>
                        ))}
                    </Checkbox.Group>
                </div>
            )}

            <div className="flex justify-between w-full gap-2 p-2 bg-blue-100 cursor-pointer" onClick={togglePriceFilter}>
                <p>{t('Price Range')}</p>
                <span>{showPriceFilter ? <MinusOutlined /> : <PlusOutlined />}</span>
            </div>

            {/* {showPriceFilter && !!priceCount && (
                <div className="flex justify-start flex-col text-gray-600 p-3 bg-blue-50">
                    <Radio.Group value={selectedPriceOption} onChange={(e) => handlePriceFilterChange(e.target.value)} style={{ display: 'flex', flexDirection: 'column' }}>
                        {priceCount?.map((price, index) => (
                            <Radio key={index} value={price.max}>{price.max}</Radio>
                        ))}
                    </Radio.Group>
                </div>
            )} */}
        </div>
    );
};

export default FilterPanel;
