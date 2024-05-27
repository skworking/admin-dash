// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useTranslations } from 'next-intl';
// const MultiLevelDropdown = () => {
//   const t=useTranslations('Index');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [subDropdownOpen, setSubDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const toggleSubDropdown = () => setSubDropdownOpen(!subDropdownOpen);
  
 
//   return (
//     <div className="relative inline-block text-left" >
//       <button
//         onClick={toggleDropdown}
//         className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//       >
//         {t('New Trucks')}
//         <svg
//           className="-mr-1 ml-2 h-5 w-5"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             fillRule="evenodd"
//             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       {dropdownOpen && (
//         <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
//           <div className="py-1">
       
//             <div className="relative">
//               <button
//                 onClick={toggleSubDropdown}
//                 className="flex justify-between w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 {t('Brands')}
//                 <svg
//                   className="ml-2 h-5 w-5 inline-block"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>

//               {subDropdownOpen && (
//                 <div className="origin-top-left absolute left-full top-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
//                   <div className="py-1" onClick={toggleDropdown}>
//                     <Link
//                       href="/brands/tata"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       {t('Tata')}
//                     </Link>
//                     <Link
//                       href="/brands"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                        {t('All Brands')}
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>
//             {/* <a
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Reset
//             </a> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiLevelDropdown;
import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const MultiLevelDropdown = ({ headerItems }) => {
  const t = useTranslations('Index');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subDropdownOpen, setSubDropdownOpen] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => (prev === index ? null : index));
  };

  const toggleSubDropdown = (index) => {
    setSubDropdownOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative inline-block text-left">
      {headerItems.map((item, index) => (
        <div key={index} className="relative inline-block text-left mr-4">
          {item.subItems ? (
            <>
              <button
                onClick={() => toggleDropdown(index)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t(item.label)}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen === index && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <div key={subIndex} className="relative">
                        {subItem.subItems ? (
                          <>
                            <button
                              onClick={() => toggleSubDropdown(subIndex)}
                              className="flex justify-between w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {t(subItem.label)}
                              <svg
                                className="ml-2 h-5 w-5 inline-block"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>

                            {subDropdownOpen === subIndex && (
                              <div className="origin-top-left absolute left-full top-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="py-1">
                                  {subItem.subItems.map((innerSubItem, innerSubIndex) => (
                                    <Link
                                      key={innerSubIndex}
                                      href={innerSubItem.href}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      {t(innerSubItem.label)}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {t(subItem.label)}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t(item.label)}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiLevelDropdown;
