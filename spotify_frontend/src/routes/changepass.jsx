import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { makeauthenticatedGETRequest, makeauthenticatedPUTRequest } from '../utils/serverhelper';

function Changepass() {
    const navigate = useNavigate();
    const [conpass,setConpass]= useState("");
    const [oldpass,setOldpass]= useState("");

    const [cookies,setcookies] = useCookies(["userid","token"]);

    const [values,setvalues] = useState({
        password:"",
        id:cookies.userid
    })
    console.log(values);

    useEffect(()=>{
        const userdata = async ()=>{
            const data = await makeauthenticatedGETRequest("/userdata/get/logeduser/"+cookies.userid);
            setOldpass(data.data.password);
        }
        userdata()
    },[])

    const updateuservalue = async(e)=>{
        e.preventDefault();
        if(conpass==values.password && oldpass!=values.password){
        const response = await makeauthenticatedPUTRequest("/userdata/update/user/"+cookies.userid,values);
        setcookies("token","",{path:"/",
        maxAge:-1});
        setcookies("userid","",{path:"/",
        maxAge:-1});
        navigate("/login");}
        else{
            alert("something wronge");
        }
    }





  return (
    <div className='w-full h-full flex flex-col items-center'>
            <div className='logo p-5 flex justify-center border-b border-solid border-gray-300 w-full'>
            <Icon icon="logos:spotify"  width="150"/>
            </div>
            <div className='inputRegion w-1/3 py-5 flex items-center flex-col justify-center'>
                <div className='font-bold mb-6 '>Change password</div>
                    <div className='Textinputs flex flex-col space-y-2 w-full' >
                        <label for="Old password" className='mt-4 font-semibold'>Old Passsword</label>
                        <input
                        className={`p-3 border border-gray-400 border-solid rounded placeholder-gray-500`}
                        type='text' 
                        placeholder="Old password"
                        id="Old password"
                        onChange={(e)=>{
                            if(e.target.value==oldpass){
                                setOldpass(e.target.value)
                            }
                        }}
                        />
                        </div>
                        <div className='Textinputs flex flex-col space-y-2 w-full' >
                        <label for="New password" className='mt-4 font-semibold'>New password</label>
                        <input
                        className={`p-3 border border-gray-400 border-solid rounded placeholder-gray-500`}
                        type='text' 
                        placeholder="New password"
                        id="New password"
                        onChange={(e)=>{
                            setvalues({...values,password:e.target.value})
                        }}
                        />
                        </div>
                        <div className='Textinputs flex flex-col space-y-2 w-full' >
                        <label for="conpass" className='mt-4 font-semibold'>Conform password</label>
                        <input
                        className={`p-3 border border-gray-400 border-solid rounded placeholder-gray-500`}
                        type='text' 
                        placeholder="enter new password again"
                        id="conpass"
                        onChange={(e)=>{
                            setConpass(e.target.value)
                        }}
                        />
                        </div>
                    <div className="w-full flex flex-col space-y-5 items-center my-8 justify-end">
                    <button
                    className='bg-app-green  p-3 px-10  rounded-full text-center'
                    onClick={(e)=>{updateuservalue(e)}}
                        >Change password</button>
                    <Link to="/userprofile">
                        <button
                        className='bg-app-green  p-3 px-10  rounded-full text-center'
                        >Cancle</button></Link>
                </div>
                
                <div className='w-full border border-solid border-gray-300'>
                </div>
            </div>
        </div>
  )
}

export default Changepass