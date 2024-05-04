'use client'
import { useState,useEffect } from "react";
import { FormControl,InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
const StateDistrict=()=>{
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
      const [currentstate,setCurrentState]=useState('')
      const [currentdistrict,setCurrentDistrict]=useState('')
      const handleChangestate=(event)=>{
        setCurrentState(event.target.value)
      }
      const handleChangeDistrict=(e)=>{
        setCurrentDistrict(e.target.value)
      }
    console.log(state,district);
    return(
        <>
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
        </>
    )
}
export default StateDistrict;