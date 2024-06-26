'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
// import { usePathname } from 'next/navigation';
// interface BreadCrumbProps {
//   currentLoc?: string;
// }
const Breadcrumbs = (props) => {
  const { currentLoc } = props;
  const t = useTranslations("Index")
  const endpoint = currentLoc.split("/").pop();
  //   console.log('bg', currentLoc);
  // const pathname = usePathname()
  // console.log(pathname);
  //   const loc = useLocation().pathname;
  const [location, setLocation] = useState(null);

  console.log(currentLoc);

  useEffect(() => {
    // const regex = url1.replace(/^\/(hi|en)/, '');
    // const regex = /\/(\w+)\//;
    const regex = /^\/(hi|en)\//;
    // const match = currentLoc.replace(regex, '/');
    const match = currentLoc.split('/').filter(segment => segment !== '');
    console.log(match);
    if (match?.length > 2) {
      setLocation(match[1]);
    }

  }, [currentLoc]);
  return (


    <nav className="flex relative w-full px-2 top-[-6%] bg-slate-200 shadow-md " aria-label="Breadcrumb">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      >
        {/* <svg
          className="w-3 h-3 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
        </svg> */}
        {t('Home')}
      </Link>
      {location !== null &&
        <>
          <>/</>
          <Link className=" text-site-color" href={`/${location}`}>
            &nbsp;{t(`${location}`)}&nbsp;
          </Link>
        </>
      }
      /&nbsp;{t(`${endpoint.replace(/-/g," ")}`)}
    </nav>

  );
};

export default Breadcrumbs;
