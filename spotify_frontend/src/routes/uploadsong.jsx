import React, { useEffect, useState } from 'react'
import Sidebars from '../components/shades/sidebars'
import Navbar from '../components/shades/navbar'
import CloudinaryUpload from '../components/shades/CloudinaryUpload';
import {makeauthenticatedGETRequest, makeauthenticatedPOSTRequest} from '../utils/serverhelper';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';


function Uploadsong() {
  const [name,setName] = useState("");
  const [thumbnail,setthumbnail]=useState("");
  const [uploadsongname,setuploadsongname] = useState("");
  const navigate = useNavigate();
  const [playlisturl,setplaylisturl] = useState("");
  const  [cookies, setCookie] = useCookies(["userid"]);
  const  [user,setuser] = useState({});
  console.log(cookies.userid);


  const submitSong = async ()=>{
    const data = {name,thumbnail,track:playlisturl};
    const response = await makeauthenticatedPOSTRequest("/song/create",data);
    console.log(response);
    if(response.err){
      alert("not upload");
    }
    navigate("/loghome");
  }

  useEffect(()=>{
    
    const userdata = async()=>{
      const response = await makeauthenticatedGETRequest('/userdata/get/logeduser/'+cookies.userid);
      console.log(response.data);
      setuser(response.data)
    }
    userdata();
  },[])

  return (
    <div className='flex h-full w-full bg-black overflow-hidden'> 
        <Sidebars usertype={user.role || "null"}/>
        <div className='h-full w-4/5 bg-app-black mt-2 rounded-lg overflow-y-scroll no-scrollbar mr-2'>
            <Navbar fname={user.firstName || "null"} lname={user.lastName || "null"} back={"/home"}/>
            {/* main content -------------------- */}
            <div className='h-full w-full pl-7 mt-2'>
                <div className=' h-full w-full'>
                    <p className='text-3xl text-center  text-white mb-10'>upload song</p>
                    <div className='h-full w-full flex flex-col justify-start items-center '>
                        <div className='p-2 mb-4 flex justify-center items-center'>
                          <label htmlFor="songname" className="text-white">Song Name  : </label>
                          <input type='text' id='songname' 
                          value={name}
                          onChange={(e)=>{
                            setName(e.target.value)
                          }}
                           placeholder='Enter Song name...' className='p-3 border border-gray-400 border-solid rounded placeholder-gray-500 ml-3'/>
                         </div> 
                         <div className='p-2 mb-4 flex justify-center items-center'>
                          <label htmlFor="songname" className="text-white">thumbnail : </label>
                          <input type='text' id='songname'  
                          value={thumbnail}
                          onChange={(e)=>{
                            setthumbnail(e.target.value)
                            console.log(e.target.value)
                          }}
                          placeholder='Enter Song name...' className='bg-white p-3 border border-gray-400 border-solid rounded placeholder-gray-500 ml-5'/>
                         </div>
                         <div className='p-1 mb-5 self-center'>
                            {
                              uploadsongname?
                              <div className='bg-white p-4 font-semibold rounded-full'>{uploadsongname.substring(0,20)}...</div>
                              :
                              <CloudinaryUpload setUrl
                              ={setplaylisturl} setName={setuploadsongname}/>
                            }
                         </div>
                          <button className=' bg-white py-2 px-4 rounded-full' 
                          onClick={submitSong}
                          >
                            upload 
                          </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Uploadsong
