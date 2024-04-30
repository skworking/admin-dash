'use client'

import { Button } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table,  CardTitle, } from "reactstrap";
const BrandModelList = () => {
  const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
  const [product, setProduct] = useState([]);
  const [data, setData] = useState()
  // const [show, setShow] = useState(false);
  const fetchData = async () => {
    await axios.get('/api/brandmodel')
      .then((res) => {
        setProduct(res.data.result);
      }).catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/brandmodel/${id}`, {
        headers: {
          'Authorization': `Bearer ${isAuth}`
        }
      });
      if(res.success){
        
        toast.success('Delete successful!');
        // router.push('/user-list',{scroll:false})
        fetchData()
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>

      <div className="bg-white sm:w-full h-[50vh] p-1 flex flex-col   m-auto">
        <CardTitle className='text-lg font-semibold p-2 text-center'>Brand and Model Generator List</CardTitle>
        <>
          <div className="table-responsive">
            <Table className="text-nowrap mt-3 align-middle " borderless>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Models</th>

                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {product?.length > 0 ? product?.map((tdata, index) => {

                  return (<>
                    <tr key={index} className="border-top relative">
                      <td>
                        {tdata?.brand}
                      </td>

                      <td>
                        {tdata?.models[tdata?.brand].map((item) => {
                          return (
                            <tr>
                              <td>
                                {item}
                                <br />
                              </td>

                            </tr>
                          )
                        })}

                      </td>
                      <td>
                        <div className=' '>
                          <Link href={`/admin/edit/${tdata._id}`} className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2">Edit</Link>
                          {/* <button className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(tdata)}>Edit</button> */}
                          <Button className="items-center font-bold   rounded " type="primary" danger onClick={() => { handleDelete(tdata._id) }}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  </>)
                }) :
                  'No Data Found'
                }
              </tbody>
            </Table>
          </div>

        </>
      </div>

    </>
  )
}
export default BrandModelList;