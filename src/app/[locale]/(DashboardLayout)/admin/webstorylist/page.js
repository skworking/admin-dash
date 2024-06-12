'use client'

import { Button, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, CardTitle, } from "reactstrap";
import { useRouter } from "next/navigation";

const WebStoryList = () => {
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [loading,setLoading]=useState(true)
    const [product, setProduct] = useState([]);
    const router = useRouter()
    const fetchData = async () => {
        await axios.get('/api/webstory', { headers: { 'Authorization': `token ${isAuth}` } })
            .then((res) => {
                setProduct(res.data.result);
                setLoading(!loading)
            }).catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    if(loading){
        return <>...loading</>
    }
    const handleDelete = async (id) => {
        try {
          const res = await axios.delete(`/api/webstory/${id}`, {
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
        router.replace(`/admin/webstorylist/${id}`)
    }
    console.log(product);
    return (
        <>
            <div className="bg-white sm:w-full h-full p-1 flex flex-col   m-auto">
                <CardTitle className='text-lg font-semibold p-2 text-center'>Web-Stopry List</CardTitle>

                <div className="table-responsive">
                    <Table className="text-nowrap mt-3 align-middle " borderless>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product?.length > 0 ? product?.map((data, index) => {
                                return (
                                    <tr key={data._id}>
                                        <td>{data.name}</td>
                                        <td>{data.slug}</td>
                                        <td>
                                            <div className=' '>
                                                {/* <Link href={`/admin/edit/${tdata._id}`} className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2">Edit</Link> */}
                                                <button className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(data._id)}>Edit</button>
                                                <Button className="items-center font-bold   rounded " type="primary" danger onClick={() => { handleDelete(data._id) }}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) :
                                'No Data Found'
                            }
                        </tbody>
                    </Table>
                </div>

            </div>
        </>
    )
}
export default WebStoryList;