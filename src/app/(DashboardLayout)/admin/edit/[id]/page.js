'use client'

import {  TextField } from '@mui/material';
import axios from 'axios';
import { useParams, redirect  } from 'next/navigation';
import { useState, useEffect } from 'react';
import {Button, message} from 'antd'
import Link from 'next/link';

const EditModel = () => {
  
  const params=useParams();

  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState('');
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Fetch product data based on the ID
    // Replace this with your actual fetch logic
    const fetchProduct = async (id) => {
      try {
        const response = await fetch(`/api/edit/search?_id=${id}`); // Assuming your API endpoint
        const data = await response.json();
      
        setProduct(data.record);
        if (data.record) {
          setBrand(data.record.brand);
          setModels(data.record.models[data.record.brand] || []); // Assuming models is an array in the product object
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
 
    if (!!params.id) {
      console.log("call",params.id);
      fetchProduct(params.id);
    }
  }, [params.id]);

  const handleBrandChange = (event) => {

   const newBrand = event.target.value;
    setBrand(newBrand);
    setModels(product.models[newBrand] || []);
  };

  const handleModelChange = (index, event) => {
    const updatedModels = [...models];
    updatedModels[index] = event.target.value;
    setModels(updatedModels);
  };

  const handleAddModel = (e) => {
    e.preventDefault();
    setModels([...models, '']);
  };
  const handleRemoveModel=(index)=>{
    const newModels = [...models];
    newModels.splice(index, 1);
    setModels(newModels);
  }

  const handleSubmit = async(e) => {
    try{

      const data={
        brand:brand,
        models:{
          [brand]:models
        }
      }
      
      console.log(data);
      await axios.put(`/api/brandmodel/${params.id}`,data)
      .then((res)=>{
        if(res.data.success){
          message.success({ content: res.data.message, duration: 2 });
        
        }
      }).catch((err)=>{
        console.log(err);
      })
    }catch(err){
      console.log(err);
    }
      
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className="bg-white sm:w-2/3 h-[50vh] p-1 flex flex-col justify-center  m-auto">
            
            <Link href={'/admin/brandmodellist'}><Button >Brand Model List</Button></Link>
            <h2 className='text-lg font-semibold p-2 text-center'>Brand and Model Edit Form</h2>
            <form >
                <div className="sm:p-5">
                    
                    <TextField
                        id="outlined-Brand"
                        label="Enter Brand Name"
                        value={brand}
                        className='w-full '
                        onChange={handleBrandChange}
                        InputLabelProps={{
                            // shrink: true,
                        }}
                    />
                    <div className='py-2 flex flex-col gap-2'>
                    {models?.map((model, index) => (
                      <div className='py-2 flex  gap-2' key={index}>
                        <TextField
                          id={`outlined-Model-${index}`}
                          label={`Enter Model Name ${index + 1}`}
                          value={model}
                          onChange={(event) => handleModelChange(index, event)}
                          className='w-1/2'
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {models.length > 1 && (
                          <Button type='primary' danger onClick={() => handleRemoveModel(index)}>Remove Model</Button>
                        )}
                        </div>
                    ))}
                  
                    <Button type="primary" className=' m-auto ' onClick={handleAddModel}>Add Model</Button>
                    </div>
                </div>
              
                <Button type="Primary" className='w-full bg-blue-500' onClick={handleSubmit}>Update</Button>
            </form>
        </div>
  );
}

export default EditModel;

