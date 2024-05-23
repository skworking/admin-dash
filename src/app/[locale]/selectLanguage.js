import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageDropdown() {
  const router = useRouter();
  const locale = router.locale;
  const [isPending, startTransition] = useTransition();
  const localActive = useLocale();

  const languages = {
    en: { label: 'English', flag: '/flags/en.png' },
    hi: { label: 'हिन्दी', flag: '/flags/hn.png' },
  };

  const [selectedLang, setSelectedLang] = useState(locale);

  useEffect(() => {
    setSelectedLang(locale);
  }, [locale]);
 
  const changeLanguageAction = (lang) => {
    setSelectedLang(lang);
    startTransition(() => {
      router.replace(`/${lang}`);
    });
  };

  return (
    <div className="relative">
      <label className=''>
        <p className='sr-only'>change language</p>
        <select
          defaultValue={localActive}
          className=" flex  items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onChange={(e) => changeLanguageAction(e.target.value)}
          disabled={isPending}
        >
          {Object.keys(languages).map(key => (
            <option  className={`
             
            absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} key={key} value={key}>{languages[key].label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
