'use client'
import { TextField } from '@mui/material';
import { Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

const BrandModelForm=()=> {
    const [brand, setBrand] = useState('');
    const [models, setModels] = useState({});
    const [currentModel, setCurrentModel] = useState('');

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleModelChange = (event) => {
        setCurrentModel(event.target.value);
    };

    const handleAddModel = () => {
        if (brand.trim() === '' || currentModel.trim() === '') {
            return alert("Models are empty");
        }
        setModels(prevModels => ({
            ...prevModels,
            [brand]: [...(prevModels[brand] || []), currentModel]
        }));
        setCurrentModel('');
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const data={
            brand:brand,
            models:models
        }
        await axios.post('/api/brandmodel',data)
        .then((res)=>{

        }).catch((err)=>{
            console.log(err);
        })
        // console.log('Brand:', brand);
        // console.log('Models:', models);
        // You can make an AJAX request to send the form data to the server here
    };

    return (
        <div className="bg-white sm:w-2/3 h-[50vh] p-1 flex flex-col justify-center  m-auto">
            <h2 className='text-lg font-semibold p-2 text-center'>Brand and Model Generator</h2>
            <form >
                <div className="sm:p-5">
                    
                    <TextField
                        id="outlined-Brand"
                        label="Enter Brand Name"
                        name={brand}
                        className='w-full '
                        onChange={handleBrandChange}
                        InputLabelProps={{
                            // shrink: true,
                        }}
                    />
                    <div className='py-2 flex gap-2'>

                    <TextField
                        id="outlined-Model"
                        label="Enter Model Name"
                        value={currentModel}
                        className='w-1/2 '
                        onChange={handleModelChange}
                        InputLabelProps={{
                            // shrink: true,
                        }}
                        />
                    <Button type="primary" className=' m-auto ' size='large' onClick={handleAddModel}>Add Model</Button>
                    </div>
                <Button type="primary" className='w-full mt-2 items-center ' onClick={handleSubmit}> Submit</Button>
                </div>
              
            </form>
        </div>
    );
}

export default BrandModelForm;
