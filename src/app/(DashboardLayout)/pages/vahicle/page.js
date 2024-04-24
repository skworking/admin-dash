'use client'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Steps, Form, Input, Upload, message, Modal } from 'antd';
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { IoMdClose } from "react-icons/io";
// import 'antd/dist/antd.css';
// import styles from '../../../../styles/vahicle.module.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';


const { Step } = Steps;
const { Option } = Select;

const brands = ['Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Honda', 'Volkswagen', 'Hyundai', 'Mercedes-Benz'];
const years = ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
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
        year: '',
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
        rcStatus: {
            rcStatus: '',
            permit: '',
            fitnessValidity: '',
            insuranceValidity: '',
            taxValidity: ''
        }
    });
    console.log(vehicleDetails);
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
        setCurrentStep(currentStep + 1)
    };
    // const handleVehicleSelect = (value, field) => {
    //     setVehicleDetails({ ...vehicleDetails, [field]: value });

    // };
    const handleModelSelect = (value) => {
        setVehicleDetails({ ...vehicleDetails, model: value });
        setCurrentStep(currentStep + 1)
    };
    const handleYearSelect = (value) => {
        setVehicleDetails({ ...vehicleDetails, year: value });
        setCurrentStep(currentStep + 1)
    };

    // const handleImageChange = (fileList) => {
    //     setVehicleDetails({ ...vehicleDetails, images: fileList });
    // };

    const updateRCStatus = (key, value) => {
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                rcStatus: value
            }
        });
    };
    const handleChange = (event) => {
        // setAge(event.target.value);
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                rcStatus: event.target.value
            }
        })
    };
    const handleChangePermit = (event) => {
        // setAge(event.target.value);
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                permit: event.target.value
            }
        })
    };
    const handleChangeFitness=(e)=>{
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                fitnessValidity: e.target.value
            }
        })
    }
    const handleChangeInsorence=(e)=>{
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                insuranceValidity: e.target.value
            }
        })
    }
    const handleChangetaxValidity=(e)=>{
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                taxValidity: e.target.value
            }
        })
    }
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
    };

    
  const handleImageChange =async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try{
        const res=await axios.post('/api/upload',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        });
       if(res.success){

           const updatedImages = [...vehicleDetails.images];
           updatedImages[index] =  file.name;
           setVehicleDetails({
               ...vehicleDetails,
               images: updatedImages
            });
        }else{
            console.error('File upload failed.');
        }
    }catch(error){
        console.log(error);
    }

    // const updatedImages = [...vehicleDetails.images];
    // updatedImages[index] = file;

    // setVehicleDetails({
    //   ...vehicleDetails,
    //   images: updatedImages
    // });
  };
  const displayImage = async (id) => {
    try {
      const res = await axios.get(`/api/image/${id}`, {
        responseType: 'arraybuffer'
      });
      const blob = new Blob([res.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      window.open(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };
    const steps = [
        {
            title: "Select Brand",
            content: (

                <Form.Item
                    name="brand"
                    // label="Brand"

                    rules={[{ required: true, message: 'Please select the brand!' }]}
                >
                    <ul className=''>
                        {brands.map((brand) => (
                            <li
                                key={brand}
                                onClick={() => handleVehicleSelect(brand)}
                                className={vehicleDetails?.brand === brand ? 'bg-[#1890ff]  p-2 ' : ' cursor-pointer p-2  hover:bg-[#f0f0f0]'}
                            >
                                {brand}
                            </li>
                        ))}
                    </ul>
                    {/* <Select
                            placeholder="Select Brand"
                            onChange={handleVehicleSelect}
                            value={vehicleDetails?.brand}
                            open={currentStep === 0}
                        >
                            {brands.map((brand) => (
                                <Option key={brand} value={brand}>
                                    {brand}
                                </Option>
                            ))}
                        </Select> */}
                </Form.Item>
            )
        },
        {
            title: "Select Model",
            content: (
                <Form.Item
                    name="model"
                    // label="Model"
                    rules={[{ required: true, message: 'Please select the model!' }]}
                >
                    <ul className=''>
                        {models[vehicleDetails?.brand]?.map((model) => (
                            <li
                                key={model}
                                onClick={() => handleModelSelect(model)}
                                className={vehicleDetails?.model === model ? 'bg-[#1890ff] p-2' : ' cursor-pointer p-2  hover:bg-[#f0f0f0]'}
                            >
                                {model}
                            </li>
                        ))}
                    </ul>
                    {/* <Select
                            placeholder="Select Model"
                            onChange={handleModelSelect}
                            value={vehicleDetails?.model}
                        >
                            {models[vehicleDetails?.brand]?.map((model) => (
                                <Option key={model} value={model}>
                                    {model}
                                </Option>
                            ))}
                        </Select> */}
                </Form.Item>
            )
        },
        {
            title: "select Year",
            content: (
                <Form.Item
                    name="year"
                    // label="year"
                    rules={[{ required: true, message: 'Please select the year!' }]}
                >
                    <ul className='h-[300px] overflow-auto'>
                        {years.map((year) => (
                            <li
                                key={year}
                                onClick={() => handleYearSelect(year)}
                                className={vehicleDetails?.year === year ? 'bg-[#1890ff]  p-2 ' : ' cursor-pointer p-2  hover:bg-[#f0f0f0]'}
                            >
                                {year}
                            </li>
                        ))}
                    </ul>
                    {/* <Select
                            placeholder="Select year"
                            onChange={handleYearSelect}
                            value={vehicleDetails?.year}
                        >
                            {years?.map((y) => (
                                <Option key={y} value={y}>
                                    {y}
                                </Option>
                            ))}
                        </Select> */}
                </Form.Item>
            )
        },
        {
            title: "RC Staus",
            content: (
                <>
                    <Box
                        className='flex flex-col flex-grow  max-w-1/3 bg-white p-3 gap-2'

                    >
                        <Grid container spacing={2} columns={12} >
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">RC Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={vehicleDetails.rcStatus.rcStatus}
                                        label="RC Status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Yes'}>Yes</MenuItem>
                                        <MenuItem value={'No'}>No</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">State Permit</InputLabel>
                                    <Select
                                        
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={vehicleDetails.rcStatus.permit}
                                        label="State Permit"
                                        onChange={handleChangePermit}
                                    >
                                        <MenuItem value={'State Permit'}>State Permit</MenuItem>
                                        <MenuItem value={'National Permit'}>National Permit</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                   
                                    <TextField type='date' value={vehicleDetails.rcStatus.fitnessValidity}  onChange={handleChangeFitness} label="Fitness Validity" 
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                   
                                    <TextField type='date' value={vehicleDetails.rcStatus.insuranceValidity}  onChange={handleChangeInsorence} label="Insorence Validity" 
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                   
                                    <TextField type='date' value={vehicleDetails.rcStatus.taxValidity}  onChange={handleChangetaxValidity} label="Tax Validity" 
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* <Form.Item
                        name="rc status"
                        // label="year"
                        rules={[{ required: true, message: 'Please select the year!' }]}
                    >
                        <Select
                            placeholder="Select year"
                            onChange={updateRCStatus}
                            // value={vehicleDetails?.year}
                        >
                            {['Yes','No']?.map((y) => (
                                <Option key={y} value={y}>
                                    {y}
                                </Option>
                            ))}
                        </Select> 
                    </Form.Item>
                    <Form.Item
                        name="permit"
                        label="select permit"
                        rules={[{ required: true, message: 'Please select the year!' }]}
                    >
                        <Select
                            placeholder="Select year"
                            onChange={updateRCStatus}
                            // value={vehicleDetails?.year}
                        >
                            {['Yes','No']?.map((y) => (
                                <Option key={y} value={y}>
                                    {y}
                                </Option>
                            ))}
                        </Select> 
                    </Form.Item> */}
                </>
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
                // <div className="image-gallery">
                //     {vehicleDetails?.images?.map((image, index) => (
                //         <div className="image-item" key={index}>
                //             <img
                //                 src={image}
                //                 alt={`Image ${index + 1}`}
                //                 className='w-50 h-20'
                //                 onError={(e) => { e.target.src = 'https://static-asset.tractorjunction.com/tr/imagebg.webp'; }}
                //             />
                //             <button onClick={() => replaceImageUrl(index, `https://static-asset.tractorjunction.com/tr/image${index + 1}.webp`)}>
                //                 Change Image
                //             </button>
                //         </div>
                //     ))}
                // </div>
                <div className='p-2'>
                    <h1>Note - Upload minimum 2 Images</h1>
                    <div>
                        {vehicleDetails?.images.map((image, index) => (
                          <>
                          <input
                           key={index}
                           type='file'
                           onChange={(event) => handleImageChange(event, index)}
                           />
                         {image && (
                             <button onClick={() => displayImage(image)}>View Image</button>
                            )}
                        </>
                        ))}
                    </div>
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
        <div >

            {isModalVisible ?
                <div className='sm:w-[50%] flex flex-col justify-center  m-auto  bg-white'>
                    <div className='flex'>
                        <Steps current={currentStep}>
                            {steps.map((item) => (
                                <Step className='px-3 py-2' key={item.title} />
                            ))}
                        </Steps>
                        <button className='rounded my-2 p-1 bg-sky-300' onClick={handleModalCancel}><IoMdClose /></button>
                    </div>
                    <div className='w-full bg-blue-600 p-2 overflow-auto '>{steps[currentStep].title}</div>
                    <div >{steps[currentStep].content}</div>
                    <div >
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
                </div>
                :
                <div className='sm:w-2/3 m-auto justify-center items-center flex flex-col'>
                    <div>
                        <h1>SELL YOUR USED TRUCK AT BEST PRICE</h1>
                        <p>Enjoy a hassle free Truck selling process with us.</p>

                    </div>
                    <Box
                        className='flex flex-col flex-grow  max-w-1/3 bg-white p-3 gap-2'

                    >
                        <Grid container spacing={2} columns={12} onClick={openModal}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="outlined-Brand"
                                    label="Select Brand"
                                    value={vehicleDetails?.brand}
                                    className='w-full rounded-none'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
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
                                    InputLabelProps={{
                                        shrink: true,
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
                                    InputLabelProps={{
                                        shrink: true,
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
                                    InputLabelProps={{
                                        shrink: true,
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

                    {/* <Modal
                      
                        //  title={steps[currentStep].title}
                        visible={isModalVisible}
                        
                        onCancel={handleModalCancel}
                        footer={null}
                    >
                       
                      
                        <Steps current={currentStep}>
                            {steps.map((item) => (
                                <Step className='px-3 py-2' key={item.title} />
                            ))}
                        </Steps>
                        <div>
                            {steps.map((i)=>{console.log(i)})}
                        </div>
                        <div className='w-full bg-blue-600 p-2 overflow-auto '>{steps[currentStep].title}</div>
                        <div >{steps[currentStep].content}</div>
                        <div >
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
                    </Modal> */}
                </div>
            }

        </div>
    );
}
export default Vahicle;