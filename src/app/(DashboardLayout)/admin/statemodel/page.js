'use client'
import { TextField, Button } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const StateDistrictForm = () => {
    const [state, setState] = useState('');
    const [district, setDistrict] = useState({});
    const [currentDistrict,setCurrentDistrict]=useState('')
 

    const router = useRouter();

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setCurrentDistrict(event.target.value);
    };

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            state: state,
            district: district,
        };

       console.log(data);
       await axios.post('/api/state',data)
       .then((res)=>{
           if(res.data.success){
               message.success({ content: res.data.message, duration: 2 });
            //    router.push('/');
           }
           else{
               message.warning({ content: res.data.message, duration: 2 });
           }
       }).catch((err)=>{
           console.log(err);
       })
    };
    const handleAddModel = (e) => {
        e.preventDefault();
        if (state.trim() === '' || currentDistrict.trim() === '') {
            return alert("District are empty");
        }
        setDistrict(prevModels => ({
            ...prevModels,
            [state]: [...(prevModels[state] || []), currentDistrict]
        }));
        setCurrentDistrict('');
    };

    return (
        <div className="bg-white sm:w-2/3 h-[50vh] p-1 flex flex-col justify-center m-auto">
            <h2 className='text-lg font-semibold p-2 text-center'>State, District, and Tehsil Form</h2>
            <form>
                <div className="sm:p-5">
                    <TextField
                        id="outlined-State"
                        label="Enter State Name"
                        value={state}
                        className='w-full '
                        onChange={handleStateChange}
                        InputLabelProps={{
                            // shrink: true,
                        }}
                    />
                    <div>

                    <TextField
                        id="outlined-District"
                        label="Enter District Name"
                        value={currentDistrict}
                        className='w-full mt-4'
                        onChange={handleDistrictChange}
                        InputLabelProps={{
                            // shrink: true,
                        }}
                        />
                    <Button type="primary" className=' m-auto ' size='large' onClick={handleAddModel}>Add District</Button>
                    </div>
                  
                    <Button type="primary" className='w-full mt-4' onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default StateDistrictForm;
