'use client'
import { useEffect, useState } from "react";
import { Table,  CardTitle, } from "reactstrap";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "antd";

const DistrictCity=()=>{
    const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
    const [product, setProduct] = useState([]);
    const [data, setData] = useState()
    const router=useRouter()
    // const [show, setShow] = useState(false);
    const fetchData = async () => {
      await axios.get('/api/district')
        .then((res) => {
          setProduct(res.data.result);
        }).catch((err) => {
          console.log(err);
        })
    }
    useEffect(() => {
      fetchData()
    }, [])
    return(
        <div className="bg-white sm:w-full h-full p-1 flex flex-col   m-auto">
        <CardTitle className='text-lg font-semibold p-2 text-center'>District and City Generator List</CardTitle>
        <>
          <div className="table-responsive">
            <Table className="text-nowrap mt-3 align-middle " borderless>
              <thead>
                <tr>
                  <th>District</th>
                  <th>City</th>

                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {product?.length > 0 ? product?.map((tdata, index) => {
                 console.log(tdata);
                 return (<>
                    <tr key={tdata._id} className="border-top relative">
                      <td>
                        {tdata?.name}
                      </td>

                      <td>
                        {/* {tdata?.models[tdata?.brand]?.map((item) => {
                          return (
                            <tr key={item}>
                              <td>
                                {item}
                                <br />
                              </td>

                            </tr>
                          )
                        })} */}
                        {tdata.cities.map((i)=>{
                          return(
                        <>
                            {i}
                        </>
                        )
                        })}

                      </td>
                      <td>
                        <div className=' '>
                          {/* <Link href={`/admin/edit/${tdata._id}`} className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2">Edit</Link> */}
                          <button className=" hover:bg-green-500  text-black font-bold py-2 px-4 rounded mr-2" /* onClick={() => handleEdit(tdata._id)} */>Edit</button>
                          <Button className="items-center font-bold   rounded " type="primary" danger /* onClick={() => { handleDelete(tdata._id) }} */>Delete</Button>
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
    )
}
export default DistrictCity;