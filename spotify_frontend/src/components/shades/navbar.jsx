import { Icon } from '@iconify/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';


function Navbar({image,back,usertype}) {
  const  [cookies, setCookie] = useCookies(["token"]);

    const navigate = useNavigate();
    const  logout=()=>{
        setCookie("token","",{path:"/",
        maxAge:-1});
        setCookie("userid","",{path:"/",
        maxAge:-1});
        navigate("/home");
    }
    const url = window.location.href;


  return (
    <div className='sticky z-1 top-0'> 
          <div className='h-1/10 w-full bg-app-black 
           flex justify-between items-center py-3 '>
              <div className='flex justify-start items-center ml-10'>
              <Link to={back}>
              <Icon icon="ic:outline-less-than"  style={{color: 'white'}} 
                className='size-9 mr-4 bg-black rounded-full'
              />
              </Link>
              <Icon icon="ic:outline-greater-than"  style={{color: 'white'}} 
                className='size-9 bg-black rounded-full'
              />
              </div>
              <div className='flex justify-start items-center mr-14'>
                  <div className='bg-white p-2 rounded-full font-semibold mr-5'>
                    <p className='mx-4 text-sm'>
                    Explore Premium
                    </p>
                  </div>
                  {((usertype== "admin") || (usertype=="artist")) &&
                  <Link to="/uploadsong">
                  <div className='text-white font-semibold p-2 mr-4 opacity-60 hover:opacity-100 sm:hidden md:hidden lg:flex  bg-black
                  rounded-full flex justify-center items-center
                  '>
                  <Icon icon="material-symbols-light:upload"  style={{color: 'white'}}  className='size-5'/>
                    Upload songs
                  </div>
                  </Link>
                  }
                  <div className='text-white font-semibold p-2 mr-4 opacity-60 hover:opacity-100 lg:flex md:hidden sm:hidden bg-black
                  rounded-full flex justify-center items-center
                  '>
                  <Icon icon="el:download"  style={{color: 'white'}} className='size-5 mr-1'/>
                    Install App
                  </div>
                  <div className='bg-black p-1 rounded-full mr-5'>
                  <Icon icon="mdi:bell-outline"  style={{color: 'white'}} className='size-7'/>
                  </div>
                  <div className='text-white text-lg p-1 rounded-full bg-black'>
                  <Link to="/userprofile">
                    <div class="dropdown">
                    <img src={image} className='h-10 w-10 rounded-full'/>
                    </div>
                  </Link>
                  </div>
                  <div className='ml-5 bg-white p-2 rounded-full'
                  onClick={()=>{
                    logout()
                  }} >
                    logout
                  </div>
              </div>
          </div>
          {(url == "http://localhost:5173/home" ||url == "http://localhost:5173/library" ||url == "http://localhost:5173/mysongs")  &&
          <div className='h-14 bg-app-black flex justify-start items-center space-x-4 pl-5 '>
              <div className='p-1 px-4  bg-white rounded-full'>All</div>
              <div className='p-1 px-4 bg-white  bg-opacity-30 rounded-full'>Podcast</div>
              <div className='p-1 px-4 bg-zinc-700 rounded-full'>Music</div>
          </div>
          }
        </div>
  )
}

export default Navbar
