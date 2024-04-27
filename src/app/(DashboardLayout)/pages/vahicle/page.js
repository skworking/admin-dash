'use client'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useState } from 'react';
import { Steps, Form, Input, Button, Upload, Modal, message } from 'antd';
import { IoMdClose } from "react-icons/io";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { FaLongArrowAltLeft } from "react-icons/fa";


const years = ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
const brands = ['Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Honda', 'Volkswagen', 'Hyundai', 'Mercedes-Benz'];
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
    const [dummy, SetDummy] = useState({
        images: [
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp",
            "https://static-asset.tractorjunction.com/tr/imagebg.webp"
        ]
    })
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
            address: {
                state: '',
                district: '',
                tehshil: ''
            }
        }
    });



    const [errors, setErrors] = useState({});


    const validateForm = () => {
        // Validation logic goes here

        const errors = {};
        console.log(currentStep);
        switch (currentStep) {
            case 4: // Image upload step
                if (vehicleDetails.images.length < 2) {
                    errors.images = 'Upload minimum 2 Images';
                    message.error({ content: errors.images, duration: 2 });
                }
                if (!vehicleDetails.price) {
                    errors.price = 'Price is required';
                    message.error({ content: errors.price, duration: 2 })
                }
                if (!vehicleDetails.drivenkm) {
                    errors.drivenkm = 'Driven Kilometer is required';
                    message.error({
                        content: errors.drivenkm,
                        duration: 2,

                    })
                }
                break;
            case 5:
                if (!vehicleDetails.userDetails.username) {
                    message.error({ content: "Please Enter UserName", duration: 2 })

                }
                if (!vehicleDetails.userDetails.email) {
                    message.error({ content: "Enter valid Email", duration: 2 })
                }
                if (!vehicleDetails.userDetails.mno) {
                    message.error({ content: "Enter Mobile Number", duration: 2 })
                }
                if (!vehicleDetails.userDetails.address.state) {
                    message.error({ content: "Please Select state", duration: 2 })
                }
                if (!vehicleDetails.userDetails.address.district) {
                    message.error({ content: "Please Select district", duration: 2 })
                }
                if (!vehicleDetails.userDetails.address.tehshil) {
                    message.error({ content: "Please Select tehshil", duration: 2 })
                }
                break;
            default:
                break;
        }
        // Update errors state
        setErrors(errors);

        // Check if there are any errors
        return Object.keys(errors).length === 0;
    };
    const handleNext = () => {
        const isValid = validateForm();
        if (isValid) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log(errors);

        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };


    const openModal = () => {
        console.log("call");
        setIsModalVisible(!isModalVisible);
    };

    const handleModalCancel = () => {
        setIsModalVisible(!isModalVisible);
    };


    const handleModelSelect = (key, value) => {
        setVehicleDetails({ ...vehicleDetails, [key]: value });
        setCurrentStep(currentStep + 1)
    };

    const handleChangeNumber = (key, e) => {
        const newValue = !isNaN(e.target.value) && e.target.value !== '' ? parseFloat(e.target.value) : '';
        setVehicleDetails({ ...vehicleDetails, [key]: newValue })
    }
    const handleChangeText = (key, e) => {

        setVehicleDetails({ ...vehicleDetails, [key]: e.target.value })
    }

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
                const dummyupdate = [...dummy.images];
                dummyupdate[index] = dataUrl;
                setVehicleDetails({
                    ...vehicleDetails,
                    images: updatedImages
                });
                SetDummy({
                    ...dummy,
                    images: dummyupdate
                })
            } else {
                console.log(res);
            }

        })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    console.log(vehicleDetails);
    const steps = [
        {
            title: "Brand",
            label: "Select Brand",
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
            title: "Model",
            label: "Select Model",
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
            title: "Year",
            label: "select Year",
            content: (
                <Form.Item
                    name="year"
                    // label="year"
                    rules={[{ required: true, message: 'Please select the year!' }]}
                >
                    <ul >
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
            title: "rcStaus",
            label: "RC Status",
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
            title: "image-and-price",
            label: 'Upload Images',
            content: (
                <div className='p-2 gap-3 flex flex-col'>
                    <h1 className='text-xs '>Note - Upload minimum 2 Images</h1>
                    <div>
                        <Grid container spacing={2}   >
                            {dummy?.images.map((image, index) => (
                                <>
                                    <Grid item xs={12} md={4} key={index}>
                                        <label htmlFor={`image-input-${index}`} className='text-gray-200 w-full'>|</label>
                                        <input
                                            id={`image-input-${index}`}
                                            key={index}
                                            type='file'
                                            accept="image/*"
                                            onChange={(event) => handleImageChange(event, index)}
                                            style={{ display: 'none' }}
                                        />

                                    </Grid>
                                </>
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
            title: "Details",
            label: 'User Detail',
            content: (

                <div className='p-2 gap-3 flex flex-col'>
                    <TextField
                        id="outlined-Model"
                        label="Enter Your Name"
                        name={vehicleDetails?.userDetails?.username}
                        value={vehicleDetails?.userDetails?.username}
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
                                value={vehicleDetails?.userDetails?.mno}
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
                                value={vehicleDetails?.userDetails?.email}
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

    const handleSubmit = async () => {
        const isValid = validateForm();
        if (isValid) {
            await axios.post('/api/vehicle', vehicleDetails)
                .then((res) => {
                    if(res.status === 200){
                        message.success("Register details successfully")
                        
                    }
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            console.log(errors);

        }
    }
    return (
        <div >

            {isModalVisible ?
                <div className='sm:w-[50%] flex flex-col justify-start   m-auto  bg-white'>
                    <div className='flex justify-between  overflow-auto gap-2'>
                        {currentStep > 0 && (
                            <Button onClick={handlePrev}>
                                <FaLongArrowAltLeft />
                            </Button>
                        )}

                        <div className='w-full  flex flex-nowrap gap-1 overflow-auto'>
                            <>
                                {!!vehicleDetails?.brand
                                    &&
                                    <Button onClick={() => setCurrentStep(0)}>
                                        {vehicleDetails.brand}
                                    </Button>
                                }
                                {!!vehicleDetails?.model &&
                                    <Button onClick={() => setCurrentStep(1)}>
                                        {vehicleDetails.model}
                                    </Button>
                                }
                                {!!vehicleDetails?.year &&
                                    <Button onClick={() => setCurrentStep(2)}>
                                        {vehicleDetails.year}
                                    </Button>
                                }
                                {!!vehicleDetails?.rcStatus?.rcStatus &&
                                    <Button onClick={() => setCurrentStep(3)}>
                                        {vehicleDetails?.rcStatus?.rcStatus && ':type-info'}
                                    </Button>
                                }
                                {!!vehicleDetails?.images &&
                                    <Button onClick={() => setCurrentStep(4)}>
                                        {vehicleDetails?.images && 'images'}
                                    </Button>
                                }

                            </>

                            {/* {steps.map((item)=>{
                            console.log(item);
                            return(
                                <button key={item} className='flex-nowrap w-full '>{item.title}
                                </button>
                            )
                        })} */}

                        </div>

                        <Button
                            onClick={handleModalCancel}
                        >
                            <IoMdClose />
                        </Button>

                    </div>
                    <div className='w-full bg-blue-600 p-2 my-2 overflow-auto '>{steps[currentStep].label}</div>
                    <div className='h-[50vh] overflow-auto'>{steps[currentStep].content}</div>
                    <div >
                        {currentStep > 2 && currentStep < steps.length - 1 && (
                            <Button type="primary" onClick={handleNext} className='w-full'>
                                Next
                            </Button>
                        )}
                        {currentStep === steps.length - 1 && (
                            <Button type="primary" onClick={() => handleSubmit()} className='w-full '>
                                List My Truck
                            </Button>
                        )}

                    </div>
                </div>
                :
                <div className='sm:w-2/3 m-auto justify-center items-center flex flex-col gap-3'>
                    <div>
                        <h1>SELL YOUR USED TRUCK AT BEST PRICE</h1>
                        <p>Enjoy a hassle free Truck selling process with us.</p>

                    </div>
                    <Box
                        className='flex flex-col flex-grow  max-w-1/3 bg-white p-4 gap-2'

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
                                    value={vehicleDetails?.drivenkm}
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

                                {/* {vehicleDetails?.images?.map((image, index) => { */}
                                {dummy?.images?.map((image, index) => {
                                    return (

                                        <div className=" outline border-b-slate-700" key={index}>
                                            <img
                                                width={50}
                                                height={50}
                                                onClick={openModal}
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className='w-[70px] h-[50px] sm:h-[70px] sm:w-[152px] object-cover '
                                                onError={(e) => { e.target.src = 'https://static-asset.tractorjunction.com/tr/imagebg.webp'; }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <Button type='primary' className='w-full' onClick={openModal}>Shell Your Truck</Button>
                        <p>By proceeding ahead you expressly agree to the Truck-Buses <span>Terms and Conditions</span></p>

                    </Box>

                </div>
            }

        </div>
    );
}
export default Vahicle;