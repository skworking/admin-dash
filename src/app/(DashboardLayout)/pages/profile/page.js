'use client'
import { useState } from "react";

const Profile=()=>{
    const [user,setUSer]=useState(typeof window !== 'undefined' && JSON.parse(sessionStorage.getItem('user')))
    return(
        <>
            Profile:
            {user.email}
        </>
    )
}
export default Profile;