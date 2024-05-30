'use client'
import useProductStore from "@/store/productStrore";
import { usePathname} from "next/navigation";

const DetailPage=()=>{
    // const product = useProductStore((state) => state.product);
    const pathname=usePathname()

    // console.log(product);
    return(
        <>
            details page
        </> 
    )
}
export default DetailPage;