'use client'
import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField,Button } from "@mui/material";
import axios from "axios";
import { message } from "antd";

const StateDistrict = () => {
    const [state, setState] = useState([]);
    const [district, setDistrict] = useState({});
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [product, setProduct] = useState([]);
    const fetchData = async () => {
        await axios.get('/api/state')
            .then((res) => {
                console.log(res.data.result);
                const updatedFormattedData = {};
                const updatedstate = [];
                res?.data?.result?.forEach(element => {
                    const { state, district } = element;

                    if (!updatedstate.includes(state)) {
                        updatedstate.push(state);
                    }
                    updatedFormattedData[state] = district[state];
                });
                setDistrict(updatedFormattedData);
                setState(updatedstate);

            }).catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    const [currentstate, setCurrentState] = useState('')
    const [currentdistrict, setCurrentDistrict] = useState('')
    const [teshil,setTehsil]=useState({})
    const [currenttehsil,setCurrentTehsil]=useState('')
    const handleChangestate = (event) => {
        setCurrentState(event.target.value)
    }
    const handleChangeDistrict = (e) => {
        setCurrentDistrict(e.target.value)
    }
    const handleTeshilChange=(e)=>{
        if(currentstate !== null && currentdistrict !== null){
            setCurrentTehsil(e.target.value)
        }
    }
    const handleAddTehsil=(e)=>{
        if(currenttehsil === ''){
            alert("tehsil are empty")
        }else if(currentstate !== null && currentdistrict !== null){
         
            setTehsil(prev=>({
                ...prev,
                [currentdistrict]:[...(prev[currentdistrict]||[]),currenttehsil]
            }))   
            setCurrentTehsil('')
        }else{
            alert("select state and district")
        }
    }
    const handleSubmit=async()=>{
        const data={
            state:currentstate,
            district:currentdistrict,
            teshil:teshil
        }
        console.log(data);
        await axios.post('/api/teshil',data)
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
    }
    console.log(state, district,teshil);
    return (
        <div className="flex flex-col gap-2">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentstate}
                    label="State State"
                    onChange={(e) => { handleChangestate(e, "state") }}

                >
                    {state.map((state) => {

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
                    value={currentdistrict}
                    label="Select District"
                    onChange={(e) => { handleChangeDistrict(e) }}

                >
                    {district[currentstate]?.map((district) => {

                        return (
                            <MenuItem key={district} value={district}>{district}</MenuItem>

                        )
                    })}

                </Select>
            </FormControl>
            <TextField
                id="outlined-Teshil"
                label="Enter Teshil Name"
                value={currenttehsil}
                className='w-full '
                onChange={handleTeshilChange}
                InputLabelProps={{
                    // shrink: true,
                }}
            />
            <Button type="primary" className=' m-auto w-full ' size='large' onClick={handleAddTehsil}>Add Teshil</Button>
            <Button type="primary" className='w-full mt-4' onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
export default StateDistrict;