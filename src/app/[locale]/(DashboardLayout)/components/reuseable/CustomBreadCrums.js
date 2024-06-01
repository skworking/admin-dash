import React from "react";
import Link from "next/link";
const CustomBreadCrumd=({breadcrumbs})=>{
    return(
        <nav aria-label="breadcrumb">
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
            </nav>
    )
}
export default CustomBreadCrumd;