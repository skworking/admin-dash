'use client'

import { Button, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table,  CardTitle, } from "reactstrap";
import { useRouter } from "next/navigation";
const BrandModelList = () => {
  const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
  const [product, setProduct] = useState([]);
  const [data, setData] = useState()
  const router=useRouter()
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
      if(res.data.success){
        
        message.success({ content: res.data.message, duration: 2 });
        // router.push('/user-list',{scroll:false})
        
        fetchData()
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleEdit=(id)=>{
    router.replace(`/admin/edit/${id}`)
  }

  return (
    <>

      <div className="bg-white sm:w-full h-full p-1 flex flex-col   m-auto">
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
                    <tr key={tdata._id} className="border-top relative">
                      <td>
                        {tdata?.brand}
                      </td>

                      <td>
                        {tdata?.models[tdata?.brand]?.map((item) => {
                          return (
                            <tr key={item}>
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
                          {/* <Link href={`/admin/edit/${tdata._id}`} className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2">Edit</Link> */}
                          <button className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(tdata._id)}>Edit</button>
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