import React, { useEffect, useState } from 'react'
import LoginContainer from '../components/container/logincontainer'
import { makeauthenticatedGETRequest } from '../utils/serverhelper';
import { useCookies } from 'react-cookie';

function Userprofile() {
    const [user,setuser] = useState({});
    const [cookies,setcookies] = useCookies(["userid"]);

    useEffect(()=>{
        const userdata = async ()=>{
            const data = await makeauthenticatedGETRequest("/userdata/get/logeduser/"+cookies.userid);
            setuser(data.data);
        }
        userdata()
    },[])


  return (
    <LoginContainer navigateTo="home">
        <div className='h-full w-9/10 p-5 text-white flex flex-col justify-start items-center space-y-5 bg-blue-500'>
            <div className='h-auto w-full flex justify-center'>
                <img src={user.image} className='rounded-full h-52 w-52'/>
            </div>
            
        </div>
    </LoginContainer>
  )
}

export default Userprofile
