import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import { useTranslations } from "next-intl";

const OfferModal = ({ visible, onClose, onSubmit }) => {
    const t = useTranslations('Index');
    const [form] = Form.useForm();
    const [city, setCity] = useState('');
    const [value, setValue] = useState({ name: '', phone: '' });
    const [districts, setDistrict] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await axios.get('/api/district');
                setDistrict(res.data.result);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCity();
    }, []);

    const handleChange = (e, fieldname) => {
        setValue({ ...value, [fieldname]: e.target.value });
    };

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

    const handleFormSubmit = async () => {
        await form.validateFields();
        onSubmit({ ...value, city });
    };

    return (
        visible && (
            <div className="offer-modal">
                <Form form={form} onFinish={handleFormSubmit}>
                    <Form.Item name="name" rules={[{ required: true, message: t('Please enter your name') }]}>
                        <Input placeholder={t('Name')} value={value.name} onChange={(e) => handleChange(e, 'name')} />
                    </Form.Item>
                    <Form.Item name="phone" rules={[{ required: true, message: t('Please enter your phone number') }]}>
                        <Input placeholder={t('Phone')} value={value.phone} onChange={(e) => handleChange(e, 'phone')} />
                    </Form.Item>
                    <Form.Item name="city" rules={[{ required: true, message: t('Please select your city') }]}>
                        <Select
                            showSearch
                            placeholder={t('Select city')}
                            value={city}
                            onChange={handleCityChange}
                            onSearch={handleCitySearch}
                            filterOption={false}
                        >
                            {filteredCities.map((city, index) => (
                                <Select.Option key={index} value={city}>{city}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">{t('Submit')}</Button>
                    <Button type="default" onClick={onClose}>{t('Cancel')}</Button>
                </Form>
            </div>
        )
    );
};

export default OfferModal;
