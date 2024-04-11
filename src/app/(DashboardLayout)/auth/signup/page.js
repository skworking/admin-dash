'use client'
import React from 'react'
const handlecall=(e)=>{
  
  console.log("call");
}
const SignUp = () => {
 
  return (
    <div onClick={handlecall}>
        Register
    </div>
  )
}

export default SignUp;
