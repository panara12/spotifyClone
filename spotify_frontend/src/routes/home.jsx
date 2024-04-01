import React from 'react'
import Spotifylogo from '../assets/mdi--spotify.svg'
import { Icon } from '@iconify/react';
import Dinnerimg from "../assets/dinnner.jpg"
import Bhajan from '../assets/Bhajan.webp';
import heart from '../assets/heart.jpg';
import friend from '../assets/friends.jpg';
import daydreamer from '../assets/dydreamer.jpg';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className='flex h-full w-full bg-black overflow-hidden'>
    {/* sidebar ------------------------------------*/}
      <div className='h-full w-3/12 bg-black text-white overflow-hidden'>
        <div className=' p-4 bg-app-black rounded-xl m-2'>
            <div className='flex justify-start items-center  pl-2 mb-4'>
                <img src={Spotifylogo} alt='as'
                  className='h-10'
                />
                <p>Spotify</p>
            </div>

            <div className='flex justify-start items-center pl-2 mb-3'>
              <Icon icon="fluent:home-12-filled"  style={{color:'white'}} 
                className='size-8'
              />
              <p className='ml-5 font-semibold'>Home</p>
            </div>

            <div className='flex justify-start items-center pl-2 opacity-55 hover:opacity-100'>
              <Icon icon="ion:search"  style={{color:'white'}} 
                className='size-8'
              />
              <p className='ml-5 font-semibold'>Search</p>
            </div>
          </div>
          <div className='flex-1 bg-app-black h-full rounded-xl p-3 m-2 '>
            <div className='flex justify-between items-center p-1 pl-3 mb-4'>
              <div className='flex justify-center items-center opacity-55 hover:opacity-100'>
                <Icon icon="icomoon-free:books"  style= {{color: 'white'}} 
                className='size-8'
                />
                <p className='ml-5 font-semibold'>Your library</p>
              </div>
            <div className='opacity-70 p-1  hover:bg-zinc-700 rounded-full'>
              <Icon icon="ic:baseline-plus"  style={{color: 'white'}} 
              className='size-6'
              />
            </div>
            </div>
            <div className='h-1/3 overflow-y-scroll no-scrollbar'>
            <div className='flex flex-col bg-zinc-800 rounded-xl p-1 pt-4 pl-3 mb-8 pb-5'>
              <div className='ml-4 font-semibold mb-3 text-lg'>
                Create your first playlist
              </div>
              <div className='ml-4 text-sm font-semibold mb-3'>
                It'easy we will help you!
              </div>
              <div className='ml-4 border bg-white text-black font-semibold p-2 flex rounded-full justify-center items-center w-36'>
                Create playlist
              </div>
            </div>
            <div className='flex flex-col bg-zinc-800 rounded-xl p-1 pt-4 pl-3 mb-2 pb-5'>
              <div className='ml-4 font-semibold mb-3 text-lg'>
                Create your first playlist
              </div>
              <div className='ml-4 text-sm font-semibold mb-3'>
                It'easy we will help you!
              </div>
              <div className='ml-4 border bg-white text-black font-semibold p-2 flex rounded-full justify-center items-center w-36'>
                Create playlist
              </div>
            </div>
            </div>
            <div className='flex flex-col  p-3'>
                <div className='opacity-65 mb-8'>  
                  <div className='flex mt-10 mb-4'>
                    <p className='text-xs mr-4'>Legal</p>
                    <p className='text-xs mr-3'>Safety & Privacy Center</p>
                    <p className='text-xs'>Privacy Policy</p>
                  </div>
                  <div className='flex mb-4'>
                    <p className='text-xs mr-4'>Cookie</p>
                    <p className='text-xs mr-4'>About us</p>
                    <p className='text-xs mr-4'> Accessibility</p>
                  </div>
                  <div className='mb-4'>
                    <p className='text-xs'>Cookies</p>
                  </div>
                </div>
                <div className='flex justify-center items-center border-2 border-solid w-1/2 p-2 rounded-full opacity-60 hover:opacity-100'>
                <Icon icon="tabler:world"  style={{color: 'white'}} 
                  className='size-6'
                />
                <p>English</p>
                </div>
            </div>
          </div>
      </div>
    {/* main content---------------------------------- */}
      <div className='h-full w-4/5 bg-app-black mt-2 rounded-lg overflow-y-scroll no-scrollbar mr-2'>
      {/* navbar----------------- */}
          <div className='h-1/10 w-full bg-black 
          bg-opacity-30 flex justify-between items-center'>
              <div className='flex justify-start items-center ml-10'>
              <Icon icon="ic:outline-less-than"  style={{color: 'white'}} 
                className='size-9 mr-4 bg-black rounded-full'
              />
              <Icon icon="ic:outline-greater-than"  style={{color: 'white'}} 
                className='size-9 bg-black rounded-full'
              />
              </div>
              <div className='flex justify-start items-center mr-14'>
                  <div className='text-white font-semibold p-3 mr-4 opacity-60 hover:opacity-100
                  '>
                    <Link to="/signup">Sign up</Link>
                  </div>
                  <div className='bg-white p-3 rounded-full font-semibold'>
                    <p className='mx-4'>
                    <Link to="/login">Log In</Link>
                    </p>
                  </div>
              </div>
          </div>
      {/* main ---------------------------- */}
          <div className='h-9/10 w-full pl-7'>
            <Playlist title="Spotify Playlist"/>
            <div className='flex justify-evenly'>
              <Card title="Dinner with Friends" discription="The perfect soundtrack to those long nights over..." url={Dinnerimg}
              />
              <Card title="Bhajan" discription="the love of god..." url={Bhajan}
              />
              <Card title="only love" discription="only for that one special person..." url={heart}
              />
              <Card title="Friends playlist" discription="problems equals to friends.." url={friend}
              />
              <Card title="Day Dreamer" discription="Drift away with enthralling instrumentals." url={daydreamer}
              />
            </div>
            <Playlist title="My Playlist"/>
            <div className='flex justify-evenly'>
              <Card title="Dinner with Friends" discription="The perfect soundtrack to those long nights over..." url={Dinnerimg}
              />
              <Card title="Bhajan" discription="the love of god..." url={Bhajan}
              />
              <Card title="only love" discription="only for that one special person..." url={heart}
              />
              <Card title="Friends playlist" discription="problems equals to friends.." url={friend}
              />
              <Card title="Day Dreamer" discription="Drift away with enthralling instrumentals." url={daydreamer}
              />
            </div><Playlist title="love Playlist"/>
            <div className='flex justify-evenly'>
              <Card title="Dinner with Friends" discription="The perfect soundtrack to those long nights over..." url={Dinnerimg}
              />
              <Card title="Bhajan" discription="the love of god..." url={Bhajan}
              />
              <Card title="only love" discription="only for that one special person..." url={heart}
              />
              <Card title="Friends playlist" discription="problems equals to friends.." url={friend}
              />
              <Card title="Day Dreamer" discription="Drift away with enthralling instrumentals." url={daydreamer}
              />
            </div>
          </div>
      </div>
    </div>
  )
}

const Playlist = ({title})=>{
  return(
      <div className='text-white  flex justify-between items-center  pt-4 mb-4'>
        <div className='text-2xl font-semibold w-full'>
          {title}
        </div>
        <div className='font-semibold opacity-80 flex mr-3'>
          <p className='mr-2'>show</p>
          <p>all</p>
        </div>
      </div>
  )
}

const Card = ({title,discription,url})=>{
  return(
    <div className='flex rounded-lg flex-col p-4 w-card h-card bg-zinc-900 hover:bg-zinc-800'>
        <div className='mb-4'>
          <img src={url} alt='abc' className='h-44 rounded-lg shadow-my '></img>
        </div>
        <div className='text-white font-semibold mb-2'>{title}</div>
        <div className='text-gray-500 font-bold text-xs'>{discription}</div>
    </div>
  )
}


export default Home
