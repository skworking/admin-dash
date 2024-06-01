'use client'
import useProductStore from "@/store/productStrore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { parseBreadcrumbs } from "@/app/utils/utils";
import CustomBreadCrumd from "../../../components/reuseable/CustomBreadCrums";
// function parseBreadcrumbs(url) {
//     // const path = new URL(url).pathname;
//     const path = new URL(url, 'http://example.com').pathname;
//     const segments = path.split('/').filter(segment => segment !== 'en' && segment !=='hi')
//     console.log(segments);
//     const breadcrumbMap = {
//         '': 'Home',
//         // 'tata-truck': 'Tata',
//         // 'ace-gold-cng': 'Ace Gold CNG',
//     };

//     let breadcrumbs = segments.map((segment, index) => {
//         console.log(segment);
//         if (segment === 'en') {
//             return null; // Skip the language segment
//         }

//         // Map the segment to a label, defaulting to a capitalized version
//         const label = breadcrumbMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

//         // Construct the URL for the breadcrumb
//         const url = '/' + segments.slice(0, index + 1).map(seg => seg === segments[2] ? seg.replace('-truck','') : seg).filter(seg => seg && seg !== 'en' && seg !== 'hi').join('/');

//         return { label, url };
//     }).filter(breadcrumb => breadcrumb); // Remove null values

//     const tataIndex = breadcrumbs.findIndex(breadcrumb => breadcrumb.label === 'Tata');
//     if (tataIndex !== -1 && breadcrumbs[tataIndex + 1]?.label === 'Ace Gold CNG') {
//         breadcrumbs.splice(tataIndex + 1, 0, { label: 'Tata ACE', url: breadcrumbs[tataIndex].url + '/tata-ace' });
//     }

//     return breadcrumbs;
// }
const DetailPage = () => {
    const t=useTranslations();
    const { count, items } = useProductStore()

    const pathname = usePathname()

    const currentURL = pathname.split('/');
    const breadcrumbs = parseBreadcrumbs(pathname);
  
    return (
        <>
            {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {breadcrumbs?.map((crumb, index) => {

                        return (
                            <li key={index} className="breadcrumb-item">
                                {index === breadcrumbs.length - 1 ? (
                                    <>{crumb.label}</>
                                ) : (
                                    <Link href={crumb.url}>
                                        {crumb.label}
                                    </Link>
                                )}

                            </li>
                        )
                    })}
                </ol>
            </nav> */}
            <CustomBreadCrumd breadcrumbs={breadcrumbs}/>
            <div className="sm:flex  gap-3 w-full p-3">
                <div className="sm:w-1/3">
                    
                <img src={items.gallery[0].original} height={500} width={500} alt="logo"/> 
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col gap-2">
                    <h3 className="bold font-semibold text-xl">{items.brand} {items.slug}</h3>
                    <hr className="w-[50px] h-2  bg-blue-500   rounded " style={{ opacity: 1 }}></hr>
                    <p>{items.description}</p>
                    <p>₹{items.min_price} - ₹{items.max_price} {t(`Lakh`)}* <mark>get on Reoad price</mark></p>
                    <p>Product-Type   : {items.product_type}</p>
                    <p>No's of available- {items.quantity}</p>
                    <p>Selling Price : ₹{items.sale_price} Lakh</p>
                </div>
            </div>
           
        </>
    )
}
export default DetailPage;