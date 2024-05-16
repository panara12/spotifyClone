import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import {useCookies} from 'react-cookie';
import Textinput from '../components/shades/Textinput';
import Passwordinput from '../components/shades/Passwordinput';
import {Link, useNavigate} from 'react-router-dom';
import {makeUnauthenticatedPOSTRequest} from '../utils/serverhelper.jsx';


function Signup() {

    const [email,setEmail] = useState("");
    const [confirmemail ,setConfirmemail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPasword]=useState("") ; 
    const [firstName,setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [image, setImage] = useState("");
    const [role,setUserrole] = useState("user");
    const  [cookies, setCookie] = useCookies(["token"]);
    const [key,setkey] = useState("");
    const navigate = useNavigate();
    console.log(role);
    


    const signup = async ()=>{
        const data = {email, password,username, firstName, lastName,role,image};
        const keyfromsuer = key;
        const response = await makeUnauthenticatedPOSTRequest("/auth/register",data)
        if(keyfromsuer == "iamadmin" && role=="admin"){
        if(response && !response.err){
            console.log(response);
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate()+30);
            setCookie("token",token,{path:"/",expires:date});
            navigate("/home");
        }
        else{
            alert("failuer");
        }}
        else if(role == "artist" || role == "user"){
            if(response && !response.err){
                console.log(response);
                const token = response.token;
                const date = new Date();
                date.setDate(date.getDate()+30);
                setCookie("token",token,{path:"/",expires:date});
                navigate("/home");
            }
            else{
                alert("failuer");
            }   
        }
        else{
            alert("invalid");
        }
    }    


  return (
    <>
        <div className='w-full h-full flex flex-col items-center'>
            <div className='logo p-5 flex justify-center border-b border-solid border-gray-300 w-full'>
            <Icon icon="logos:spotify"  width="150"/>
            </div>
            <div className='inputRegion w-1/3 py-5 flex items-center flex-col justify-center'>
                <div className='font-bold text-2xl mb-6 '>Sign up for to start listening</div>
                <select  onChange={e => setUserrole(e.target.value)} defaultValue="user">
                    <option >user</option>
                    <option>artist</option>
                    <option>admin</option>
                </select>

                {role == "admin" &&
                <Textinput 
                classname="my-6"
                label="Key" 
                value={key}
                setvalue={setkey}
                placeholder="enter secrate key"/>}

                <Textinput 
                classname="my-6"
                label="Email" 
                value={email}
                setvalue={setEmail}
                placeholder="enter Email Address"/>

                <Textinput 
                classname=""
                label="confirm email" placeholder="enter email again"
                value={confirmemail}
                setvalue={setConfirmemail}
                />

                <Textinput 
                classname=""
                label="username" placeholder="enter your username"
                    value={username}
                    setvalue={setUsername}
                />

                <Passwordinput label="password" placeholder="enter Password"
                value={password}
                setvalue={setPasword}
                />

                <Textinput 
                classname=""
                label="firstname" placeholder="enter your firstname"
                    value={firstName}
                    setvalue={setFirstname}
                />

                <Textinput 
                classname=""
                label="lastname" placeholder="enter your lastname"
                    value={lastName}
                    setvalue={setLastname}
                />


                <Textinput 
                classname=""
                label="image" placeholder="enter your image url"
                    value={image}
                    setvalue={setImage}
                />

                <div className="w-full flex items-center my-8 justify-center">
                    <button
                    className='bg-app-green  p-3 px-10  rounded-full text-center'
                    onClick={(e)=>{
                        e.preventDefault();
                        signup();
                    }}
                    >Sign up</button>
                </div>

                <div className='w-full border border-solid border-gray-300'>
                </div>

                <div className='my-6 font-semibold text-lg '>
                    Already have an account?
                </div>
                <div className='w-full border border-gray-500 flex justify-center items-center py-5 rounded-full font-bold text-gray-500'>
                    <Link to="/login">LOG IN TO SPOTIFY</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup
