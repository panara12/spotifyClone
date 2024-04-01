import React from 'react'
import Spotifylogo from '../../assets/mdi--spotify.svg';
import likedsong from '../../assets/likedsong.jpg'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom';

function Sidebars({setCreateplaylistopen ,usertype}) {
  return (
    <div className='h-full w-3/12 bg-black text-white overflow-hidden'>
        <div className=' p-4 bg-app-black rounded-xl m-2'>
            <div className='flex justify-start items-center  pl-2 mb-4'>
                <img src={Spotifylogo} alt='as'
                  className='h-10'
                />
                <p>Spotify</p>
            </div>
            {usertype=="admin" &&
            <Link to="/admin">
              <div className='flex justify-start items-center pl-2 mb-3'>
              <Icon icon="ri:admin-fill"  style={{color: 'white'}} className='size-8'/>
              <p className='ml-5 font-semibold'>Admin</p>
              </div>
            </Link>
            }
            <Link to="/home">
              <div className='flex justify-start items-center pl-2 mb-3'>
              <Icon icon="fluent:home-12-filled"  style={{color:'white'}} 
                className='size-8'
              />
              <p className='ml-5 font-semibold'>Home</p>
              </div>
            </Link>
            <Link to="/search">
            <div className='flex justify-start items-center pl-2 opacity-55 hover:opacity-100 mb-3'>
              <Icon icon="ion:search"  style={{color:'white'}} 
                className='size-8'
              />
              <p className='ml-5 font-semibold'>Search</p>
            </div>
            </Link>
            {(usertype=="artist" || usertype == "admin") &&
            <Link to="/mysongs">
              <div className='flex justify-start items-center pl-2 opacity-55 hover:opacity-100'>
                <Icon icon="streamline:music-folder-song"  style={{color: "white"}} className='size-7'/>
                <p className='ml-5 font-semibold'>My Songs</p>
              </div>
            </Link>
            }
          </div>
          <div className='flex-1 bg-app-black h-full rounded-xl p-3 m-2 '>
            <div className='flex justify-between items-center p-1 pl-3 mb-3 '>
              <Link to="/library">
              <div className='flex justify-center items-center opacity-55 hover:opacity-100'>
                <Icon icon="icomoon-free:books"  style= {{color: 'white'}} 
                className='size-8'
                />
                <p className='ml-5 font-semibold'>Your library</p>
              </div>
              </Link>
            <div className='flex justify-center items-center'>
            <div className='opacity-70 p-1  hover:bg-zinc-700 rounded-full mr-1'>
              <Icon icon="ic:baseline-plus"  style={{color: 'white'}} 
              className='size-6'
              />
            </div>
            <div className='opacity-70 p-1  hover:bg-zinc-700 rounded-full'>
                <Icon icon="ph:arrow-right-thin"  style={{color: 'white'}} 
                className='size-6 '
                />
            </div>
            </div>
            </div>
            <div className='flex justify-between items-center p-1 pl-2 mb-3 '>
            <div className='flex justify-center items-center opacity-55 hover:opacity-100' onClick={()=>{
                  setCreateplaylistopen(true)
                }}>
              <Icon icon="material-symbols-light:create-new-folder-outline"  style={{color: 'white'}} className='size-9'/>
                <button className='ml-5 font-semibold' 
                
                >Create playlist</button>
              </div>
            </div>
            <div className='h-1/2 overflow-y-scroll no-scrollbar'>
            <div className='flex pl-3 justify-between items-center'>
                <div className='opacity-50 hover:opacity-100 hover:bg-zinc-800 p-1 rounded-full'>
                <Icon icon="ion:search"  style={{color:'white'}} 
                className='size-6'
              />
                </div>
                <div className='opacity-50 hover:opacity-100 flex'>
                <p>Recent</p>
                <Icon icon="ant-design:bars-outlined"  style={{color: 'white'}} 
                  className='size-6 ml-2 mr-2'
                />
                </div>
            </div>
            <div className='9/10'>
              <div className='flex justify-start items-center m-3'>
                <div className='mr-3'>
                  <img src={likedsong} className='h-14 rounded-lg'></img>
                </div>
                <div className=''>
                  <p>Liked Songs</p>
                  <p>playlist .&nbsp; 33 songs</p>
                </div>
              </div>
            </div>
            </div> 
          </div>
      </div>
  )
}

export default Sidebars
