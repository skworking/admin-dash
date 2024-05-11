'use client'
import { useState } from "react";
import { Button, Row, Col, Form, Input, message } from 'antd'
import { DeleteOutlined, WarningFilled } from "@ant-design/icons";
import { Check } from "react-feather";
import axios from "axios";
import { useRouter } from "next/navigation";

const CityDistrict = () => {
    const [district, setDistrict] = useState('');
    const [cities, setCities] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const router = useRouter()
    const handleAddCity = () => {
        if (cityInput.trim() !== '') {
            setCities([...cities, cityInput]);
            setCityInput('');
        }
    };
    const handleDeleteCity = (index) => {
        setCities(cities.filter((_, i) => i !== index));
    };

    console.log(district, cities);
    const handleSubmit = async() => {
        
        if (district.trim() !== '' && cities.length > 0) {
            const data = { name: district, cities }
            await axios.post('/api/district',data)
            .then((res)=>{
                if(res.data.success){
                    message.success({ content: res.data.message, duration: 2 });
                    router.push('/admin/districtlist');
                }
                else{
                    message.warning({ content: res.data.message, duration: 2 });
                }
            }).catch((err)=>{

            })
            // setDistrict('');
            // setCities('');
            // setCityInput('');
        }
    };
    const FormItem = Form.Item;
    const [form] = Form.useForm();
    return (
        <div className="bg-white sm:w-2/3 h-[50vh] p-1 flex flex-col justify-center  m-auto">
            <h2 className='text-lg font-bold p-2 text-center'>District and City Genrator</h2>

            <Form form={form} className="flex flex-col gap-3" onFinish={handleSubmit}>
                <Row>
                    <Col xs={{ span: 20, offset: 1 }} lg={{ span: 21, offset: 1 }}>
                        <FormItem
                            name="district"
                            rules={[
                                { type: "text" },
                                { required: true, message: 'Please input your District!' }
                            ]}
                        >
                            <Input suffix={district?.length > 0 ? <Check color="green" /> : <WarningFilled />} placeholder="Enter District" value={district} className="no-rounded"
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </FormItem>

                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                        <FormItem
                            name="city"
                            rules={[
                                { type: "text" },
                                { required: true, message: 'Please input your City!' }
                            ]}
                        >
                            <Input suffix={cityInput?.length > 0 ? <Check color="green" /> : <WarningFilled />} placeholder="Enter city name" value={cityInput} className="no-rounded"
                                onChange={(e) => setCityInput(e.target.value)}
                            />
                        </FormItem>
                    </Col>
                    <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                        <Button type="primary" className="w-full" onClick={handleAddCity}>
                            Add City
                        </Button>
                    </Col>
                </Row>
                <Row>

                    <Col xs={{ span: 20, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                        <h2 className="font-bold text-lg">Cities:</h2>
                        <div className="flex ">
                            {cities?.map((city, index) => {
                                return (
                                    <div key={index} className="relative text-center">
                                        <p  className="bg-slate-50 p-2 text-black ">{city},</p>
                                        <button
                                            type="button"
                                            className=""
                                            onClick={() => handleDeleteCity(index)}
                                        >
                                            <DeleteOutlined className="text-red-500 group-hover:text-red-700" />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
                    <Col xs={{ span: 20, offset: 1 }} lg={{ span: 21, offset: 1 }}>
                        <Button type="primary" className="w-full" htmlType="submit">Submit</Button>
                    </Col>

            </Form>
        </div>
    )
}
export default CityDistrict;