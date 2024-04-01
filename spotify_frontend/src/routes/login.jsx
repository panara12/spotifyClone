import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Textinput from '../components/shades/Textinput';
import Passwordinput from '../components/shades/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverhelper.jsx';
import {useCookies} from 'react-cookie';



function Login() {
    
    const [email,setEmail] = useState("");
    const  [cookies, setCookie] = useCookies(["token"]);
    const [password,setPasword]=useState("");
    const navigate = useNavigate();

    const login = async ()=>{ 
        const data = {email, password};
        const response = await makeUnauthenticatedPOSTRequest("/auth/login",data)
        if(response && !response.err){
            console.log(response);
            const token = response.user.token;
            const userid = response.user._id;
            const date = new Date();
            date.setDate(date.getDate()+30);
            setCookie("token",token,{path:"/",expires:date});
            setCookie("userid",userid,{path:"/",expires:date});
            navigate("/home/"+response.user._id);
        }
        else{
            alert("failuer");
        }
    }  


  return (
    <>
        <div className='w-full h-full flex flex-col items-center'>
            <div className='logo p-5 flex justify-center border-b border-solid border-gray-300 w-full'>
            <Icon icon="logos:spotify"  width="150"/>
            </div>
            <div className='inputRegion w-1/3 py-5 flex items-center flex-col justify-center'>
                <div className='font-bold mb-6 '>To continue, log in to spotify.</div>
                <Textinput 
                classname=""
                label="Email Address or Username" placeholder="enter Email Address or Username"
                    value={email}
                    setvalue={setEmail}
                />
                <Passwordinput label="password" placeholder="enter Password"
                    value={password}
                    setvalue={setPasword}
                />
                <div className="w-full flex items-center my-8 justify-end">
                    <button
                    className='bg-app-green  p-3 px-10  rounded-full text-center'
                    onClick={(e)=>{
                        e.preventDefault()
                        login();
                    }}
                    >Log In</button>
                </div>
                <div className='w-full border border-solid border-gray-300'>
                </div>
                <div className='my-6 font-semibold text-lg '>
                    Don't have an account?
                </div>
                <div className='w-full border border-gray-500 flex justify-center items-center py-5 rounded-full font-bold text-gray-500'>
                    <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
