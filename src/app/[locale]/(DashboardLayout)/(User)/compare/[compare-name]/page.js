'use client'
import useProductStore from "@/store/productStrore";
const CompareDetails=()=>{
    const {truck1,truck2}=useProductStore();
    return(
        <>
        <h1>Comparation between Trucks</h1>
            {truck1?.name} - {truck2?.name}
        </>
    )
}
export default CompareDetails;