import React from 'react';
import { Menu } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const SortModal = ({ isVisible, screenWidth, handleClose, handleSortBy }) => {
    if (!isVisible || screenWidth >= 1024) {
        return null;
    }

    return (
        <div className="w-full flex flex-col justify-between h-screen fixed top-0 bg-gray-300">
            <CloseCircleOutlined 
                className="justify-end flex text-xl hover:text-white p-3 mt-5 cursor-pointer" 
                onClick={handleClose} 
            />
            <div>
                <Menu onClick={({ key }) => handleSortBy(key)}>
                    <Menu.Item key="priceHighToLow">Price: High to Low</Menu.Item>
                    <Menu.Item key="priceLowToHigh">Price: Low to High</Menu.Item>
                </Menu>
            </div>
        </div>
    );
};

export default SortModal;
