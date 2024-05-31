'use client'
import useProductStore from "@/store/productStrore";
import Link from "next/link";
import { usePathname } from "next/navigation";

function parseBreadcrumbs(url) {
    // const path = new URL(url).pathname;
    const path = new URL(url, 'http://example.com').pathname;
    const segments = path.split('/').filter(segment => segment !== 'en| hi')
    console.log(segments);
    const breadcrumbMap = {
        '': 'Home',
        'tata-truck': 'Tata',
        'ace-gold-cng': 'Ace Gold CNG',
    };

    let breadcrumbs = segments.map((segment, index) => {
        if (segment === 'en') {
            return null; // Skip the language segment
        }

        // Map the segment to a label, defaulting to a capitalized version
        const label = breadcrumbMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        // Construct the URL for the breadcrumb
        const url = '/' + segments.slice(0, index + 1).map(seg => (seg === 'tata-truck' || seg === 'Tata-truck') ? 'tata' : seg).filter(seg => seg && seg !== 'en' && seg !== 'hi').join('/');

        return { label, url };
    }).filter(breadcrumb => breadcrumb); // Remove null values

    const tataIndex = breadcrumbs.findIndex(breadcrumb => breadcrumb.label === 'Tata');
    if (tataIndex !== -1 && breadcrumbs[tataIndex + 1]?.label === 'Ace Gold CNG') {
        breadcrumbs.splice(tataIndex + 1, 0, { label: 'Tata ACE', url: breadcrumbs[tataIndex].url + '/tata-ace' });
    }

    return breadcrumbs;
}
const DetailPage = () => {
    const { count, items } = useProductStore()

    const pathname = usePathname()

    const currentURL = pathname.split('/');
    const breadcrumbs = parseBreadcrumbs(pathname);
    console.log(breadcrumbs);
    console.log(pathname, currentURL);
    return (
        <>
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

            details page
        </>
    )
}
export default DetailPage;