'use client'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Steps,  Form, Input, Select, Upload, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import styles from '../../../../styles/vahicle.module.css';
import { TextField } from '@mui/material';

const { Step } = Steps;
const { Option } = Select;

const brands = ['Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Honda', 'Volkswagen', 'Hyundai', 'Mercedes-Benz'];
const years=['2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024']
const models = {
    Toyota: ['Camry', 'Corolla', 'Rav4', 'Highlander', 'Sienna'],
    Ford: ['F-150', 'Escape', 'Explorer', 'Ranger', 'Expedition'],
    Chevrolet: ['Silverado', 'Equinox', 'Traverse', 'Tahoe', 'Malibu'],
    Nissan: ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Versa'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
    Volkswagen: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf'],
    Hyundai: ['Elantra', 'Sonata', 'Santa Fe', 'Tucson', 'Kona'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'],
};

const Vahicle = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState({
        brand: '',
        model: '',
        year:'',
        totalKm: '',
        price: '',
        images: [
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp"
        ],
    });

    const replaceImageUrl = (index, newUrl) => {
        setVehicleDetails(setVehicleDetails.images?.map((image, i) => (i === index ? newUrl : image)));
      };

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleFormSubmit = (values) => {
        console.log('Form Values:', values);
        message.success('Form submitted successfully!');
    };

    const openModal = () => {
        console.log("call");
        setIsModalVisible(!isModalVisible);
    };

    const handleModalCancel = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleVehicleSelect = (value) => {
        setVehicleDetails({ ...vehicleDetails, brand: value });
    };

    const handleModelSelect = (value) => {
        setVehicleDetails({ ...vehicleDetails, model: value });
    };
    const handleYearSelect = (value) => {
        setVehicleDetails({ ...vehicleDetails, year: value });
    };

    const handleImageChange = (fileList) => {
        setVehicleDetails({ ...vehicleDetails, images: fileList });
    };

    const steps = [
        {
            title: "Select Brand",
            content:(
                <Form.Item
                        name="brand"
                        label="Brand"
                        rules={[{ required: true, message: 'Please select the brand!' }]}
                    >
                        <Select
                            placeholder="Select Brand"
                            onChange={handleVehicleSelect}
                            value={vehicleDetails?.brand}
                        >
                            {brands.map((brand) => (
                                <Option key={brand} value={brand}>
                                    {brand}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
            )
        },
        {
            content:(
                <Form.Item
                        name="model"
                        label="Model"
                        rules={[{ required: true, message: 'Please select the model!' }]}
                    >
                        <Select
                            placeholder="Select Model"
                            onChange={handleModelSelect}
                            value={vehicleDetails?.model}
                        >
                            {models[vehicleDetails?.brand]?.map((model) => (
                                <Option key={model} value={model}>
                                    {model}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
            ) 
        },
        {
            content:(
                <Form.Item
                        name="year"
                        label="year"
                        rules={[{ required: true, message: 'Please select the year!' }]}
                    >
                        <Select
                            placeholder="Select year"
                            onChange={handleYearSelect}
                            value={vehicleDetails?.year}
                        >
                            {years?.map((y) => (
                                <Option key={y} value={y}>
                                    {y}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
            ) 
        },
        {
            title: 'Upload Images',
            content: (
                // <Form
                //     form={form}
                //     name="uploadImagesForm"
                //     initialValues={{ remember: true }}
                //     onFinish={handleNext}
                // >
                //     <Form.Item
                //         name="images"
                //         label="Images"
                //         valuePropName="fileList"
                //         getValueFromEvent={(e) => {
                //             if (Array.isArray(e)) {
                //                 return e;
                //             }
                //             return e && e.fileList;
                //         }}
                //         rules={[{ required: true, message: 'Please upload images!' }]}
                //     >
                //         <Upload
                //             listType="picture"
                //             multiple
                //             maxCount={3}
                //             accept="image/*"
                //             onChange={(info) => {
                //                 const { fileList } = info;
                //                 handleImageChange(fileList);
                //             }}
                //         >
                //             <Button icon={<UploadOutlined />}>Upload</Button>
                //         </Upload>
                //     </Form.Item>
                // </Form>
                <div className="image-gallery">
                {vehicleDetails?.images.map((image, index) => (
                    <div className="image-item" key={index}>
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className='w-50 h-20'
                        onError={(e) => { e.target.src = 'https://static-asset.tractorjunction.com/tr/imagebg.webp'; }}
                      />
                      <button onClick={() => replaceImageUrl(index, `https://static-asset.tractorjunction.com/tr/image${index + 1}.webp`)}>
                        Change Image
                      </button>
                    </div>
                  ))}
                  </div>
            ),
        },
        {
            title: 'Additional Details',
            content: (
                <Form
                    form={form}
                    name="additionalDetailsForm"
                    initialValues={{ remember: true }}
                    onFinish={handleFormSubmit}
                >
                    <Form.Item name="overview" label="Overview">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="userName"
                        label="Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="userMobileNo"
                        label="Mobile Number"
                        rules={[{ required: true, message: 'Please input your mobile number!' }]}
                    >
                        <Input type="tel" />
                    </Form.Item>
                    <Form.Item
                        name="userEmail"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        name="state"
                        label="State"
                        rules={[{ required: true, message: 'Please input the state!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="district"
                        label="District"
                        rules={[{ required: true, message: 'Please input the district!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tehsil"
                        label="Tehsil"
                        rules={[{ required: true, message: 'Please input the tehsil!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.sellTruckForm}>

                <div className='sm:w-2/3 m-auto justify-center items-center flex flex-col'>
                    <div>
                        <h1>SELL YOUR USED TRUCK AT BEST PRICE</h1>
                        <p>Enjoy a hassle free Truck selling process with us.</p>

                    </div>
                    <Box
                        className='flex flex-col flex-grow  max-w-1/3 bg-white p-3 gap-2'
                        
                        >
                            <Grid container spacing={2} columns={12}  onClick={openModal}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-Brand"
                                    label="Select Brand"
                                    value={vehicleDetails?.brand}
                                    className='w-full rounded-none'
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-Model"
                                    label="Select Model"
                                   value={vehicleDetails?.model}
                                    className='w-full'
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-tkd"
                                    label="Total Km Driven"
                                    value={vehicleDetails?.totalKm}
                                    className='w-full rounded-none'
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-price"
                                    label="Price"
                                    value={vehicleDetails?.price}
                                    InputProps={{
                                        readOnly: true,
                                      }}  
                                    className='w-full'
                                />
                            </Grid>
                        </Grid>
                       <div className='mt-3'>
                        <h1>UPLOAD TRUCK IMAGES</h1>
                        <div className='flex max-w-1/6 gap-1 m-auto p-2'>

                        {vehicleDetails?.images?.map((image, index) => (
                            <div className=" outline border-b-slate-700" key={index}>
                            <img
                                onClick={openModal}
                                src={image}
                                alt={`Image ${index + 1}`}
                                className='w-[150px] h-[100px] object-cover '
                                onError={(e) => { e.target.src = 'https://static-asset.tractorjunction.com/tr/imagebg.webp'; }}
                            />
                            </div>
                        ))}
                        </div>
                       </div>     
                        <Button variant="contained" className='w-full' onClick={openModal}>Shell Your Truck</Button>
                        <p>By proceeding ahead you expressly agree to the Truck-Buses <span>Terms and Conditions</span></p>
                       
                    </Box>
                    
                    <Modal
                         title={steps[currentStep].title}
                        visible={isModalVisible}
                        onCancel={handleModalCancel}
                        footer={null}
                    >
                        <Steps current={currentStep}>
                            {steps.map((item) => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className={styles.stepsContent}>{steps[currentStep].content}</div>
                        <div className={styles.stepsAction}>
                            {currentStep < steps.length - 1 && (
                                <Button type="primary" onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                            {currentStep === steps.length - 1 && (
                                <Button type="primary" onClick={() => form.submit()}>
                                    Submit
                                </Button>
                            )}
                            {currentStep > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
                                    Previous
                                </Button>
                            )}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
export default Vahicle;