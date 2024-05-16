import React, { useEffect, useState } from 'react'
import LoginContainer from '../components/container/logincontainer'
import { makeauthenticatedGETRequest } from '../utils/serverhelper';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

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
        <div className='h-full w-9/10 p-5 text-white flex flex-col justify-start items-center space-y-5 '>
            <div className='h-auto w-full flex justify-center'>
                <img src={user.image} className='rounded-full h-52 w-52'/>
            </div>
            <div className='self-start w-full'>
                <div className='font-semibold'>First Name</div>
                <div className='border-2 w-3/4 p-2'>{user.firstName}</div>
            </div>
            
            <div className='self-start w-full'>
                <div className='font-semibold'>Last Name</div>
                <div className='border-2 w-3/4 p-2'>{user.lastName}</div>
            </div>
            
            <div className='self-start w-full'>
                <div className='font-semibold'>Email</div>
                <div className='border-2 w-3/4 p-2'>{user.email}</div>
            </div>
            
            <div className='self-start w-full'>
                <div className='font-semibold'>Username</div>
                <div className='border-2 w-3/4 p-2'>{user.username}</div>
            </div>

            <div className='flex'>
                <Link to='/userupdate'>
                    <button className='border mr-10 px-3 py-2 hover:bg-white hover:text-black'>Edit</button>
                </Link>
                <Link to="/home">
                    <button className='border p-2 hover:bg-white hover:text-black'>Back</button>
                </Link>
            </div>
        </div>
    </LoginContainer>
  )
}

export default Userprofile
