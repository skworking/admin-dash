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
import e from 'cors';


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

const states = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa'];
const districts = {
    Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi'],
    Sindh: ['Karachi', 'Hyderabad', 'Sukkur'],
    'Khyber Pakhtunkhwa': ['Peshawar', 'Abbottabad', 'Swat']
};
const tehsils = {
    Lahore: ['Lahore City', 'Model Town', 'Gulberg'],
    Faisalabad: ['Faisalabad City', 'Ghulam Muhammadabad', 'Jaranwala'],
    Rawalpindi: ['Rawalpindi City', 'Chaklala', 'Taxila'],
    Karachi: ['Karachi Central', 'Karachi East', 'Karachi West'],
    Hyderabad: ['Hyderabad City', 'Latifabad', 'Qasimabad'],
    Sukkur: ['Sukkur City', 'Rohri', 'Saleh Pat'],
    Peshawar: ['Peshawar City', 'Charsadda', 'Nowshera'],
    Abbottabad: ['Abbottabad City', 'Havelian', 'Mansehra'],
    Swat: ['Mingora', 'Saidu Sharif', 'Barikot']
};

const Vahicle = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState({
        brand: '',
        model: '',
        year: '',
        drivenkm: '',
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
        },
        overview: '',
        userDetails: {
            username: '',
            mno: '',
            email: '',
            address:{
                state: '',
                district:'',
                tehshil:''
            }
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
    const handleModelSelect = (key, value) => {
        setVehicleDetails({ ...vehicleDetails, [key]: value });
        setCurrentStep(currentStep + 1)
    };
    const handleYearSelect = (value) => {
        setVehicleDetails({ ...vehicleDetails, year: value });
        setCurrentStep(currentStep + 1)
    };

    const handleChangeNumber = (key, e) => {
        const newValue = !isNaN(e.target.value) && e.target.value !== '' ? parseFloat(e.target.value) : '';
        setVehicleDetails({ ...vehicleDetails, [key]: newValue })
    }
    const handleChangeText = (key, e) => {

        setVehicleDetails({ ...vehicleDetails, [key]: e.target.value })
    }
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
    const handleChange = (event, key) => {
        // setAge(event.target.value);
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                [key]: event.target.value
            }
        })
    };
    const handleChangeUser = (event, key) => {
        // setAge(event.target.value);
        // setVehicleDetails({
        //     ...vehicleDetails,
        //     address: {
        //         ...vehicleDetails.address,
        //         [key]: event.target.value
        //     }
        // })
        setVehicleDetails(prevDetails => ({
            ...prevDetails,
            userDetails: {
              ...prevDetails.userDetails,
              address: {
                ...prevDetails.userDetails.address,
                [key]: event.target.value
              }
            }
          }));
    };
    const handleChangeDetails = (event, key) => {
        // setAge(event.target.value);
        setVehicleDetails({
            ...vehicleDetails,
            userDetails: {
                ...vehicleDetails.userDetails,
                [key]: event.target.value
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
    const handleChangeFitness = (e) => {
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                fitnessValidity: e.target.value
            }
        })
    }
    const handleChangeInsorence = (e) => {
        setVehicleDetails({
            ...vehicleDetails,
            rcStatus: {
                ...vehicleDetails.rcStatus,
                insuranceValidity: e.target.value
            }
        })
    }
    const handleChangetaxValidity = (e) => {
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


    const handleImageChange = async (event, index) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.success === true) {
                const infobuffer = res.data.result.image.data.data;
                const base64String = Buffer.from(infobuffer).toString('base64');
                const dataUrl = `data:image/jpeg;base64,${base64String}`;

                const updatedImages = [...vehicleDetails.images];
                updatedImages[index] = dataUrl;
                setVehicleDetails({
                    ...vehicleDetails,
                    images: updatedImages
                });
            } else {
                console.log(res);
            }

        })
            .catch(error => {
                console.error('Error:', error);
            });
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
                                onClick={() => handleModelSelect("brand", brand)}
                                className={vehicleDetails?.brand === brand ? 'bg-[#1890ff]  p-2 ' : ' cursor-pointer p-2  hover:bg-[#f0f0f0]'}
                            >
                                {brand}
                            </li>
                        ))}
                    </ul>

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
                                onClick={() => handleModelSelect("model", model)}
                                className={vehicleDetails?.model === model ? 'bg-[#1890ff] p-2' : ' cursor-pointer p-2  hover:bg-[#f0f0f0]'}
                            >
                                {model}
                            </li>
                        ))}
                    </ul>

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
                                onClick={() => handleModelSelect("year", year)}
                                className={vehicleDetails?.year === year ? 'bg-[#1890ff]  p-2 ' : ' cursor-pointer p-2  hover:bg-[#f0f0f0]'}
                            >
                                {year}
                            </li>
                        ))}
                    </ul>
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
                                        onChange={(e) => { handleChange(e, "rcStatus") }}
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
                                        onChange={(e) => { handleChange(e, "permit") }}
                                    // onChange={handleChangePermit}
                                    >
                                        <MenuItem value={'State Permit'}>State Permit</MenuItem>
                                        <MenuItem value={'National Permit'}>National Permit</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>

                                    <TextField type='date' value={vehicleDetails.rcStatus.fitnessValidity} onChange={(e) => { handleChange(e, "fitnessValidity") }} label="Fitness Validity"
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>

                                    <TextField type='date' value={vehicleDetails.rcStatus.insuranceValidity} onChange={(e) => { handleChange(e, "insuranceValidity") }} label="Insorence Validity"
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>

                                    <TextField type='date' value={vehicleDetails.rcStatus.taxValidity} onChange={(e) => { handleChange(e, 'taxValidity') }} label="Tax Validity"
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

                </>
            )
        },
        {
            title: 'Upload Images',
            content: (
                <div className='p-2 gap-3 flex flex-col'>
                    <h1 className='text-xs '>Note - Upload minimum 2 Images</h1>
                    <div>
                        <Grid container spacing={2}   >
                            {vehicleDetails?.images.map((image, index) => (
                                <Grid item xs={12} md={4}>
                                    <div key={index}>
                                        <label htmlFor={`image-input-${index}`} className='text-gray-200 w-full'>|</label>
                                        <input
                                            id={`image-input-${index}`}
                                            key={index}
                                            type='file'
                                            accept="image/*"
                                            onChange={(event) => handleImageChange(event, index)}
                                            style={{ display: 'none' }}
                                        />

                                    </div>

                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <h5 className='text-xs' >Enter Price for Tata Magic Express Bi-Fuel</h5>
                    <p className='text-center px-2 text-xs'>Note : Please enter the price that you expect in return for selling your used vehicle. Ensure you quote the expected price based on your vehicle's condition and the price you would be willing to pay to buy a similar second-hand model.</p>
                    <TextField
                        id="outlined-Model"
                        label="Enter Price"
                        type='tel'
                        name={vehicleDetails?.price}
                        value={vehicleDetails?.price}
                        className='w-full'
                        onChange={(e) => { handleChangeNumber("price", e) }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    />
                    <TextField
                        id="outlined-Model"
                        label="Enter Driven Kilometer"
                        type='tel'
                        name={vehicleDetails?.drivenkm}
                        value={vehicleDetails?.drivenkm}
                        className='w-full'
                        onChange={(e) => { handleChangeNumber("drivenkm", e) }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    />
                    <TextField
                        id="outlined-Model"
                        label="Overview"
                        name={vehicleDetails?.overview}
                        value={vehicleDetails?.overview}
                        className='w-full'
                        onChange={(e) => { handleChangeText("overview", e) }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    />
                </div>
            ),
        },
        {
            title: 'User Detail',
            content: (

                <div className='p-2 gap-3 flex flex-col'>
                    <TextField
                        id="outlined-Model"
                        label="Enter Your Name"
                        name={vehicleDetails?.userDetails?.username}
                        // value={vehicleDetails?.overview}
                        className='w-full'
                        onChange={(e) => { handleChangeDetails(e, "username") }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    />
                    <Grid container spacing={2}   >
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-Model"
                                type='tel'
                                label="Enter Your Mobile No"
                                name={vehicleDetails?.userDetails?.mno}
                                // value={vehicleDetails?.overview}
                                className='w-full'
                                onChange={(e) => { handleChangeDetails(e, "mno") }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    pattern: "[0-9]*",
                                    inputMode: "numeric",
                                    maxLength: 10,
                                }}

                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-Model"
                                label="Enter Your Email"
                                type='email'
                                name={vehicleDetails?.userDetails?.email}
                                // value={vehicleDetails?.overview}
                                className='w-full'
                                onChange={(e) => { handleChangeDetails(e, "email") }}
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                        </Grid>
                    </Grid>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vehicleDetails.userDetails.address.state}
                            label="State State"
                            onChange={(e) => { handleChangeUser(e, "state") }}

                        >
                            {states.map((state) => {

                                return (
                                    <MenuItem key={state} value={state}>{state}</MenuItem>

                                )
                            })}

                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select District</InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vehicleDetails.userDetails.address.district}
                            label="Select District"
                            onChange={(e) => { handleChangeUser(e, "district") }}

                        >
                            {districts[vehicleDetails.userDetails.address.state]?.map((district) => {

                                return (
                                    <MenuItem key={district} value={district}>{district}</MenuItem>

                                )
                            })}

                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select tehshil</InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vehicleDetails.userDetails.address.tehshil}
                            label="Select tehshil"
                            onChange={(e) => { handleChangeUser(e, "tehshil") }}

                        >
                            {tehsils[vehicleDetails.userDetails.address.district]?.map((tehshil) => {

                                return (
                                    <MenuItem key={tehshil} value={tehshil}>{tehshil}</MenuItem>

                                )
                            })}

                        </Select>
                    </FormControl>
                    <div>

                    </div>
                </div>
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

                                {vehicleDetails?.images?.map((image, index) => {
                                    // const  infobuffer=image?.data?.data;
                                    //  const base64String = Buffer.from(infobuffer && infobuffer)?.toString('base64');
                                    //  const dataUrl = `data:image/jpeg;base64,${base64String}`;
                                    return (

                                        <div className=" outline border-b-slate-700" key={index}>
                                            <img
                                                onClick={openModal}
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className='w-[150px] h-[100px] object-cover '
                                                onError={(e) => { e.target.src = 'https://static-asset.tractorjunction.com/tr/imagebg.webp'; }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <Button variant="contained" className='w-full' onClick={openModal}>Shell Your Truck</Button>
                        <p>By proceeding ahead you expressly agree to the Truck-Buses <span>Terms and Conditions</span></p>

                    </Box>

                </div>
            }

        </div>
    );
}
export default Vahicle;