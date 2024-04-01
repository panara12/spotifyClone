import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({setLogout,fname,lname,back,usertype}) {
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
                    <p className='mx-4'>
                    Explore Premium
                    </p>
                  </div>
                  {(usertype== "admin" || usertype=="artist") &&
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
                  <div class="dropdown" onClick={()=>{setLogout(true)}}>
                    {fname.charAt(0).toUpperCase()}
                    {lname.charAt(0).toUpperCase()}
                    </div>
                  </div>
              </div>
          </div>
          <div className='h-14 bg-app-black flex justify-start items-center space-x-4 pl-5 '>
              <div className='p-1 px-4  bg-white rounded-full'>All</div>
              <div className='p-1 px-4 bg-white  bg-opacity-30 rounded-full'>Podcast</div>
              <div className='p-1 px-4 bg-zinc-700 rounded-full'>Music</div>
          </div>
        </div>
  )
}

export default Navbar
