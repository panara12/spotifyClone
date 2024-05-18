import React, { useEffect, useState } from 'react'
import LoginContainer from '../components/container/logincontainer'
import { makeauthenticatedGETRequest, makeauthenticatedPUTRequest } from '../utils/serverhelper';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

function Userupdate() {

  const navigate = useNavigate();
  const [cookies,setcookies] = useCookies(["userid"]);
    const [values,setvalues] = useState({
        firstName: "",
        lastName: "",
        username:"",
        email:"",
        image:"",
        id:cookies.userid
    })
    console.log(values);

    useEffect(()=>{
        const userdata = async ()=>{
            const data = await makeauthenticatedGETRequest("/userdata/get/logeduser/"+cookies.userid);
            setvalues({...values, firstName : data.data.firstName, lastName:data.data.lastName , username:data.data.username,email:data.data.email,image:data.data.image});
        }
        userdata()
    },[])

    const updateuservalue = async(e)=>{
        e.preventDefault();
        const response = await makeauthenticatedPUTRequest("/userdata/update/user/"+cookies.userid,values);
        navigate("/userprofile");
        console.log(response);
    }


  return (
    <LoginContainer key={"/userprofile"}>
        <div className='h-full w-9/10 p-5 text-white flex flex-col justify-start items-center space-y-5 '>
        <form className='h-full w-full'>
            <div className='h-auto w-full flex justify-center'>
                <div className='border p-5 flex'>
                    <img src={values.image} className='rounded-full h-52 w-52'/>
                </div>
            </div>

            <div className='self-start w-full'>
                <div className='font-semibold flex items-center'>
                <Icon icon="majesticons:image"  style={{color: 'white'}} 
                        className='mr-2 justify-end items-end '
                    />
                <span>New Image</span>
                </div>
                <div className='border-2 w-3/4 p-2'><input placeholder='image url' className='bg-app-black w-full' value={values.image} onChange={(e)=>{setvalues({...values,image:e.target.value})}}/></div>
            </div>

            <div className='self-start w-full mt-3'>
                <div className='font-semibold'>FirstName</div>
                <div className='border-2 w-3/4 p-2'><input value={values.firstName} 
                className='bg-app-black w-full' onChange={(e)=>{setvalues({...values,firstName:e.target.value})}}
                /></div>
            </div>
            
            
            <div className='self-start w-full mt-3'>
                <div className='font-semibold'>LastName</div>
                <div className='border-2 w-3/4 p-2'><input value={values.lastName} 
                className='bg-app-black w-full' onChange={(e)=>{setvalues({...values,lastName:e.target.value})}}
                /></div>
            </div>
            
            
            <div className='self-start w-full mt-3'>
                <div className='font-semibold'>email</div>
                <div className='border-2 w-3/4 p-2'><input value={values.email} 
                className='bg-app-black w-full' onChange={(e) => {setvalues({...values,email:e.target.value})}}
                /></div>
            </div>
            
            
            <div className='self-start w-full mt-3'>
                <div className='font-semibold'>username</div>
                <div className='border-2 w-3/4 p-2'><input value={values.username} 
                className='bg-app-black w-full' onChange={(e)=>{
                    setvalues({...values,username:e.target.value})
                }}
                /></div>
            </div>

            <div className='flex mt-3'>
                    <button className='border mr-10 px-3 py-2 hover:bg-white hover:text-black' onClick={(e)=>{updateuservalue(e)}}>Update</button>
                <Link to="/userprofile">
                    <button className='border p-2 hover:bg-white hover:text-black'>Cancle</button>
                </Link>
            </div>
        </form>
        </div>
    </LoginContainer>
  )
}

export default Userupdate
