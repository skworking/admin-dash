'use client'

import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const EditModel = () => {

  const pathname=useParams();

  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState('');
  const [models, setModels] = useState([]);
console.log(models);
  useEffect(() => {
    // Fetch product data based on the ID
    // Replace this with your actual fetch logic
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/brandmodel/search?id=${pathname.id}`); // Assuming your API endpoint
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
    if (pathname.id) {
      fetchProduct();
    }
  }, []);
  console.log(brand);
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data={
      brand:brand,
      models:{
        [brand]:models
      }
    }

    console.log(data);
    await axios.put(`/api/brandmodel/${pathname.id}`,data)
    .then((res)=>{

    }).catch((err)=>{
        console.log(err);
    })
 
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className="bg-white sm:w-2/3 h-[50vh] p-1 flex flex-col justify-center  m-auto">
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
                      <div className='py-2 flex flex-col gap-2' key={index}>
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
                      </div>
                    ))}
                  
                    <Button type="primary" className=' m-auto ' size='large' onClick={handleAddModel}>Add Model</Button>
                    </div>
                </div>
              
                <Button type="Primary" className='w-full bg-blue-500' onClick={handleSubmit}>Update</Button>
            </form>
        </div>
  );
}

export default EditModel;

