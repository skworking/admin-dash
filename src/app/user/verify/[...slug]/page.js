'use client'
// pages/user/VerifyEmail.js

import { useEffect, useState } from 'react';

import {useParams  } from 'next/navigation'
const VerifyEmail=()=> {
  const params = useParams()
  const _id=params.slug[0];
  const uniqueString=params.slug[1]


  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    if (_id && uniqueString) {
      // Call API to verify email
      fetch(`/api/user/verify/?_id=${_id}&uniqueSting=${uniqueString}`)
        .then((response) => response.json())
        .then((data) => {
          setVerificationStatus(data.url);
        })
        .catch((error) => {
          console.error('Error:', error);
          setVerificationStatus('An error occurred while verifying email');
        });
    }
  }, [_id, uniqueString]);

  return (
    <div className='flex flex-col justify-center items-center w-full h-full absolute'>
      <h1>Email Verification Status</h1>
      <p>{verificationStatus}</p>
    </div>
  );
}
export default VerifyEmail;