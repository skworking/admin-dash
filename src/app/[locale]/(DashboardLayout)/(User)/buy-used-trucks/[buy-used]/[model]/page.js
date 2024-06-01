'use client'
import CustomBreadCrumd from "@/app/[locale]/(DashboardLayout)/components/reuseable/CustomBreadCrums";
import useProductStore from "@/store/productStrore";
import Link from "next/link";
import { parseBreadcrumbs } from "@/app/utils/utils";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Tooltip } from "antd";


const DetailPage=()=>{
    const t=useTranslations();
    const pathname=usePathname()
    const breadcrumbs=parseBreadcrumbs(pathname)
    const { count, items } = useProductStore()
    console.log(items);
    return(
        <>
        <CustomBreadCrumd breadcrumbs={breadcrumbs}/>
        <div className="sm:flex  gap-3 w-full p-3">
                <div className="sm:w-1/2">
                   
                <img src={items.gallery[0].original} height={500} width={500} alt="logo"/> 
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col gap-2">
                    <Tooltip title={`${items.brand} ${items.slug} ${items.description}`} placement="bottom">
                    <h3 className="bold font-semibold text-xl">{items.brand} {items.slug}</h3>
                    </Tooltip>
                    <hr className="w-[50px] h-2  bg-blue-500   rounded " style={{ opacity: 1 }}></hr>
                    <p>Ex-Showroom Price</p>
                    <p className="font-semibold text-xl">₹{items.min_price} - ₹{items.max_price} {t(`Lakh`)}* <mark className="text-sm">get on Reoad price</mark></p>
                    <p>Product-Type   : {items.product_type}</p>
                    <p>No's of available- {items.quantity}</p>
                    <p>Selling Price : ₹{items.sale_price} Lakh</p>
                </div>
            </div>
        </>
    )
}
export default DetailPage;