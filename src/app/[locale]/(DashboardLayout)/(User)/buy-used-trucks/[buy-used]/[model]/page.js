'use client'
import CustomBreadCrumd from "@/app/[locale]/(DashboardLayout)/components/reuseable/CustomBreadCrums";
import useProductStore from "@/store/productStrore";
import Link from "next/link";
import { parseBreadcrumbs } from "@/app/utils/utils";
import { usePathname } from "next/navigation";


const DetailPage=()=>{
    const pathname=usePathname()
    const breadcrumbs=parseBreadcrumbs(pathname)

    return(
        <>
        <CustomBreadCrumd breadcrumbs={breadcrumbs}/>
            
        </>
    )
}
export default DetailPage;