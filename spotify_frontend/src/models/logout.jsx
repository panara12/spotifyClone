import React, { useState } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function Logout({closemodel}) {
    const [cookies,setCookie]= useCookies(["token"]);
    const navigate = useNavigate();
    const  logout=()=>{
        setCookie("token","",{path:"/",
        maxAge:-1});
        setCookie("userid","",{path:"/",
        maxAge:-1});
        navigate("/home");
    }

  return (
    <div className='text-white absolute z-10 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center' onClick={closemodel}>
      <div className='bg-gray-300 w-1/3 rounded text-black text-center' onClick={(e)=>{
        e.stopPropagation();
      }}>
        <div className='text-2xl font-semibold' 
        onClick={()=>{
            logout()
        }}>Log out</div>
      </div>
    </div>
  )
}

export default Logout
