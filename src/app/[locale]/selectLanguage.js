import React, { useEffect, useState } from "react";
import { get, map } from "lodash";
import { useRouter } from "next/navigation";


const LanguageDropdown = () => {
  const router = useRouter();
  const languages = {
    en: { label: 'English', flag: '/flags/en.png' },
    hn: { label: 'Hindi', flag: '/flags/de.png' },
  };
  
  const { locale, pathname, asPath, query } = router;
  
  const [selectedLang, setSelectedLang] = useState(locale);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setSelectedLang(locale);
  }, [locale]);

  console.log(locale,pathname,asPath);
  const changeLanguageAction = (lang) => {
    // router.push({ pathname, query }, asPath, { locale: lang });
    setSelectedLang(lang);
    setMenu(false);
  };

  const toggle = () => {
    setMenu(!menu);
  };

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="language-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img
          src={get(languages, selectedLang)?.flag}
          alt="Language Flag"
          className="w-5 h-5 mr-2"
        />
        {get(languages, selectedLang)?.label}
        <svg
          className="w-5 h-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 6.707a1 1 0 0 1 1.414 0L10 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {menu && (
        <div
          className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {map(Object.keys(languages), (key) => (
              <button
                key={key}
                onClick={() => changeLanguageAction(key)}
                className={`${
                  selectedLang === key
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } w-full px-4 py-2 text-sm text-left flex`}
                role="menuitem"
              >
                <img
                  src={get(languages, key)?.flag}
                  alt="Language Flag"
                  className="w-5 h-5 mr-5"
                />
                {get(languages, key)?.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LanguageDropdown);
