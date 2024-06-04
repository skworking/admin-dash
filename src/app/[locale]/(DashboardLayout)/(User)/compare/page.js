'use client'
import { usePathname } from "next/navigation";
import Breadcrumbs from "../../components/reuseable/bread";
import compare from 'public/images/compare.webp';
import user1 from "public/images/users/user1.jpg";
import Image from "next/image";
const Compare = () => {
    const pathname = usePathname()
    return (
        <>
            <div className="relative ">
                {/* banner component */}
                <div className="mb-1 relative">
                    <Image
                        src={compare}
                        className="w-full sm:flex hidden "
                        alt="avatar"
                        width={5000}
                        height={100}
                    />
                    <div className="sm:absolute  top-0 bottom-0 left-20 m-auto sm:w-1/2 w-full p-2 h-1/2 text-start justify-center">
                        <p className="text-2xl font-semibold">Compare Trucks</p>
                        <p>Compare and know which truck is best for you.</p>
                    </div>
                </div>
                {/* breadcrum component */}
                <Breadcrumbs currentLoc={pathname} />
                
            </div>
        </>
    )
}
export default Compare;