import React,{Children, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import { Icon } from '@iconify/react';
import Sidebars from '../../components/shades/sidebars';
import Bhajan from '../../assets/Bhajan.webp';
import Navbar from '../../components/shades/navbar';
import {Howl,Howler} from 'howler';
import Songcontext from '../../context/songcontext';
import CreatePlaylist from '../../models/createPlaylist';
import Chooseplaylist from '../../models/chooseplaylist';
import { makeauthenticatedGETRequest, makeauthenticatedPOSTRequest } from '../../utils/serverhelper';
import Logout from '../../models/logout';
import {useCookies} from 'react-cookie';


function LoginContainer({children,screenname,navigateTo}) {
 
  const {currentSong,setCurrentSong,soundPlayed,setSoundPlayed,ispause,setIsPause} = useContext(Songcontext);
  const  [cookies, setCookie] = useCookies(["userid"]);
  const firstUpdate = useRef(true);
  const [createPlaylistopen , setCreateplaylistopen] = useState(false);
  const [choosePlaylistopen , setChooseplaylistopen] = useState(false);
  const [logout,setLogout] = useState(false);
  const [user ,setuser] = useState({});


  useLayoutEffect(()=>{
    if(firstUpdate.current){
      firstUpdate.current=false;
      return;
    }
    if(!currentSong){
      return;
    }
    Changesong(currentSong.track);
  },[currentSong && currentSong.track])

  
  useEffect(()=>{
    
    const userdata = async()=>{
      const response = await makeauthenticatedGETRequest('/userdata/get/logeduser/'+cookies.userid);
      console.log(response.data);
      setuser(response.data)
    }
    userdata();
  },[])

  const playsound = ()=>{
    if(!soundPlayed){
      return
    }
    soundPlayed.play();
  } 

  const Changesong =(Songsrc)=>{
    if(soundPlayed){
      soundPlayed.stop()
    }
    let sound = new Howl({
      src:[Songsrc],
      html5:true})
    setSoundPlayed(sound);
    sound.play();
    setIsPause(false);
  }

  const pauseSong=()=>{
    soundPlayed.pause();
  }

  const togglePlaySong=()=>{
    if(ispause){
      playsound();
      setIsPause(false);
    }else{
      pauseSong();
      setIsPause(true);
    }
  }

  const addsongtoplaylist = async(playlistId)=>{
    const songId = currentSong._id;
    const payload = {songId, playlistId};
    const  response = await makeauthenticatedPOSTRequest("/playlist/add/song",payload);
    if(response._id){
      setChooseplaylistopen(false);
    }
  }

  return (
    <div className='flex flex-col h-full w-full bg-black'>
      { 
        createPlaylistopen && <CreatePlaylist closemodel={()=>{setCreateplaylistopen(false)}}/>
      }
      {
        choosePlaylistopen && <Chooseplaylist addsongtoplaylist={addsongtoplaylist}  closemodel={()=>{setChooseplaylistopen(false)}}/>
      }
      {
        logout && <Logout closemodel={()=>{setLogout(false)}}/>
      }
      <div className={`${currentSong?"h-9/10":"h-full"} flex w-full bg-black overflow-hidden`}>
        {/* sidebar   ------------------------------------*/}
        <Sidebars setCreateplaylistopen={setCreateplaylistopen} usertype={user.role || "null"}/>
        {/* main content---------------------------------- */}
        <div className='h-full w-4/5 bg-app-black mt-2 rounded-lg overflow-y-scroll no-scrollbar  mr-2'>
        {/* navbar----------------- */}
        <Navbar setLogout={setLogout} fname={user.firstName||"null"} lname={user.lastName || "null"} back={navigateTo} usertype={user.role}/>
        {/* main ---------------------------- */}
        <div className='h-full w-full pl-7'>
            {children}
        
            {/* main - footer -------------------------- */}
            <div className='w-full mt-28  flex justify-start text-white lg:flex-row md:flex-col'>
              <div className='h-full w-2/3'>
                <div className='flex pl-5 sm:flex-col md:flex-col lg:flex-row  '>
                  <div className='flex flex-col space-y-2'>
                    <p className='font-semibold'>Company</p>
                    <Fottertext title="About" />
                    <Fottertext title="Jobs" />
                    <Fottertext title="For the Record" />
                  </div>
                  <div className='ml-32 flex flex-col space-y-2 sm:ml-0 sm:mt-10 md:ml-0 md:mt-10 lg:ml-32 lg:mt-0'>
                    <p className='font-semibold'>Communities</p>
                    <Fottertext title="For Artists"/>
                    <Fottertext title="Devlopers"/>
                    <Fottertext title="Advertising" />
                    <Fottertext title="Investors" />
                    <Fottertext title="Venders"/>
                  </div>
                </div>
                <div className='flex flex-col space-y-2 mt-10 pl-5'>
                    <p className='font-semibold '>Useful links</p>
                    <Fottertext title="Support"/>
                    <Fottertext title="Free Mobile App"/>
                </div>
              </div>
              <div className='h-full w-1/3 bg-app-black flex justify-end 
              md:justify-start md:mt-10
              items-start space-x-7 pr-20'>
                <div className='p-3 bg-zinc-800
                rounded-full'>
                  <Icon icon="lucide:instagram"  style={{color: 'white'}} 
                  className='size-6'
                  />
                </div>
                
                <div className='p-3 bg-zinc-800
                rounded-full'>
                  <Icon icon="mingcute:twitter-line"  style={{color: 'white'}} 
                    className='size-6'
                  />
                </div>

                <div className='p-3 bg-zinc-800
                rounded-full'>
                  <Icon icon="mingcute:facebook-fill"  style={{color: 'white'}} 
                    className='size-6'
                  />
                </div>
              </div>
            </div>
            <div className='mt-16'>
            <hr className='opacity-30'></hr>
            <div className='flex flex-col  p-3'>
                <div className='opacity-65 mb-8'>  
                  <div className='flex mt-10 mb-4'>
                    <p className=' mr-4 text-white'>Legal</p>
                    <p className='text-white  mr-3'>Safety & Privacy Center</p>
                    <p className='text-white '>Privacy Policy</p>
                  </div>
                  <div className='flex mb-4'>
                    <p className='text-white  mr-4'>Cookies</p>
                    <p className='text-white mr-4'>About us</p>
                    <p className=' text-white  mr-4'> Accessibility</p>
                  </div>
                  <div className='mb-4'>
                    <p className=' text-white'>&copy; 2024 Spotify AB</p>
                  </div>
                </div>
            </div>
            </div>
        </div>
        </div>
      </div>
      {/* music player -------------------------------------- */}
      {
        currentSong &&
          <div className=' flex justify-between h-1/10 items-center space-x-4'>
          <div className='flex items-center justify-start space-x-3 w-1/4 ml-3'>
            <img src={currentSong.thumbnail} className='w-14 h-14 rounded'></img>
            <div className='text-white'>
              <p className='text-sm font-semibold'>{currentSong.name}</p>
              <p className='text-xs opacity-70'>{currentSong.artist.firstName}</p>
            </div>
            <Icon icon="icon-park-outline:like"  style={{color: 'white'}} className='size-6' />
          </div>
          <div className=' w-1/2 h-full flex justify-center flex-col items-center'>
            <div className='flex items-center justify-center space-x-5'>
            <Icon icon="radix-icons:shuffle"  style={{color: 'white'}} className='size-6'/>
            <Icon icon="fluent:previous-28-filled"  style={{color: 'white'}} className='size-6'/>
            <Icon icon={ispause?"ic:baseline-play-circle":"ic:baseline-pause-circle"}  style={{color: 'white'}} className='size-10' onClick={togglePlaySong} />
            <Icon icon="fluent:next-48-filled"  style={{color: 'white'}} className='size-6'/>
            <Icon icon="solar:repeat-bold"  style={{color: 'white'}} className='size-6'/>
            {/* <Icon icon="zondicons:pause-outline"  style={{color: white}} /> */}

            </div>
            <div className=''>
              
            </div>
          </div>
          <div className='w-1/4 flex justify-end items-center h-full text-white'>
            <div className='hover:opacity-100 opacity-50' onClick={()=>{
              setChooseplaylistopen(true)
            }}>
              <Icon icon="ic:outline-playlist-add"  style={{color: 'white'}}  className='size-8 mr-3'/>
              <div className='mr-3'>
              add to playlist
              </div>
            </div>
          </div>
          </div>
      }
    </div>
  )
}


  const Fottertext = ({title})=>{
      return(
        <p className='text-white opacity-50'>{title}</p>
      )
  }
  

export default LoginContainer
