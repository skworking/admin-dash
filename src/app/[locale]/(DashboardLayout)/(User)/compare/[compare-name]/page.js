'use client'
import { usePathname } from "next/navigation";
import useProductStore from "@/store/productStrore";
import Breadcrumbs from "../../../components/reuseable/bread";
import { Button } from "antd";
import { useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";


const CompareDetails = () => {
    const pathname = usePathname();
    const { truck1, truck2 } = useProductStore();
    const [overview, setOverView] = useState(false)
    console.log(truck1,truck2);
   
    return (
        <div className="relative  ">
            <Breadcrumbs currentLoc={pathname} />
            <div className="p-2 w-full  ">
                <h1 className="text-xl font-semibold">{`Comapre ${truck1.slug.replace(/-/g, ' ')} vs ${truck2.slug.replace(/-/g, ' ')} `}</h1>
                <div className="flex sm:w-1/2 m-auto">
                    <div className=" text-center m-auto sm:w-1/3">
                        <div className="w-full flex items-center justify-center">
                            <img src={truck1?.images[0].original} alt="logo" className="w-1/2 " width={200} height={100} />
                        </div>
                        <p>{truck1.slug.replace(/-/g, ' ')}</p>
                        <Button type="primary" className="w-full">GET OFFERS</Button>
                    </div>
                    <div className="text-center m-auto sm:w-1/3">
                        <div className="w-full flex items-center justify-center">
                            <img src={truck1?.images[0].original} alt="logo" className="w-1/2  " width={200} height={100} />
                        </div>
                        <p>{truck2.slug.replace(/-/g, ' ')}</p>
                        <Button type="primary" className="w-full">GET OFFERS</Button>
                    </div>
                </div>
                <div className="py-2 max-w-7xl m-auto">
                   <h1 className="bg-red-500 max-w-7xl text-white m-auto p-2 flex justify-between" onClick={()=>{setOverView(!overview)}}> Overview
                        <span> {overview ?<ArrowUpOutlined />:<ArrowDownOutlined />}</span>
                   </h1>
                 
                   {!overview && (
                    <>
                    <div className="w-full justify-between items-center flex px-2 text-start ">
                        <span className="font-blod text-xl">
                          Brand
                        </span>
                        <span>{truck1.brand}</span>
                        <span>{truck2.brand}</span>
                    </div>
                    <div className="w-full justify-between items-center flex px-2 text-start ">
                        <span className="font-blod text-xl">
                          slug
                        </span>
                        <span>{truck1.slug}</span>
                        <span>{truck2.slug}</span>
                    </div>
                    </>
                   )}
                </div>

            </div>
        </div>
    )
}
export default CompareDetails;