'use client'

import axios from "axios";
import { useEffect,useState } from "react";
import { CardTitle } from "reactstrap";

const BrandModelList=()=>{
    const [product,setProduct]=useState([]);
    const fetchData=async()=>{
        await axios.get('/api/brandmodel')
        .then((res)=>{
            setProduct(res.data.result);
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(
        <div className="bg-white sm:w-full h-[50vh] p-1 flex flex-col   m-auto">
        <CardTitle className='text-lg font-semibold p-2 text-center'>Brand and Model Generator List</CardTitle>
          <>
          <div className="table-responsive">
              <Table className="text-nowrap mt-3 align-middle" borderless>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Slug</th>
                    <th>Brand</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                    </tbody>
                    </Table>
                    </div>
                    
          </>
        </div>
    )
}
export default BrandModelList;