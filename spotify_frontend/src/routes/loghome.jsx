import React,{useContext, useEffect, useRef, useState} from 'react'
import {Howl,Howler} from 'howler';
import LoginContainer from '../components/container/logincontainer';
import { makeauthenticatedGETRequest } from '../utils/serverhelper';
import Songcontext from '../context/songcontext';
import { Link, json } from 'react-router-dom';



function Loghome() {
  const [soundPlayed,setSoundPlayed]=useState(null);
  const [ispause , setIsPause] = useState(true);
  const [playlistdata,setPlaylistdata] = useState([]);
  const [songdata,setSongdata] = useState([]);
  const {currentSong ,setCurrentSong} = useContext(Songcontext);

  const playsound =(Songsrc)=>{
    if(soundPlayed){
      soundPlayed.stop()
    }
    let sound = new Howl({
      src:[Songsrc],
      html5:true})
    setSoundPlayed(sound);
    sound.play();
  }

  const pauseSong=()=>{
    soundPlayed.pause();
  }

  const togglePlaySong=()=>{
    if(ispause){
      playsound("https://res.cloudinary.com/dbkvirsvl/video/upload/v1709109360/y9kinmu8trmrmfjsq8sc.mp3");
      setIsPause(false);
    }else{
      pauseSong();
      setIsPause(true);
    }
  }

  useEffect(()=>{
    const Allplaylist = async()=>{
      const getdata = await  makeauthenticatedGETRequest("/playlist/get/allplaylist");
      setPlaylistdata(getdata.data);
    }
    Allplaylist();

    const allsongs = async()=>{
      const data = await makeauthenticatedGETRequest("/song/get/allsongs")
      setSongdata(data.data);
      console.log(songdata);
    }
    allsongs();

  },[])

  const Playlistsongs =({songs})=>{
    return(
    songs.map((i,index)=>{
      return(
        <div onClick={()=>{setCurrentSong(i)}}>
          <Card title={i.name} url={i.thumbnail} key={JSON.stringify.item}/>
      </div>
      )
    }))
  }

  const Allsongs = ()=>{
    return(
      songdata.map((item)=>{
        return(
          <div onClick={()=>{setCurrentSong(item)}}>
            <Card title={item.name} url={item.thumbnail} />
          </div>
        )
      })
    )
  }


  return (
    <LoginContainer key={"home"}>
            {
              playlistdata.map((item,i)=>{
                if(i<3){
                return(
                <>
                  <Playlist title={item.name} id={item._id} key={JSON.stringify.item}/>
                  <div className='grid grid-cols-1  md:grid-cols-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
                  <Playlistsongs songs={item.songs} key={JSON.stringify.item}/>
                  </div>
                </>
                )}
              })
            }
            <div className='text-2xl font-semibold w-full text-white'>All Songs</div>
            <div className='grid grid-cols-1  md:grid-cols-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
              <Allsongs />
            </div>
    </LoginContainer>
  )
}



const Playlist = ({title,id})=>{
    return(
        <div className='text-white  flex justify-between items-center  pt-4 mb-4'>
          <div className='text-2xl font-semibold w-full'>
            {title}
          </div>
          <Link to={"/playlistsongs/"+id}>
          <div className='font-semibold opacity-80 flex mr-3'>
            <p className='mr-2'>show</p>
            <p>all</p>
          </div>
          </Link>
        </div>
    )
  }
  
  const Card = ({title,url})=>{
    return(
      <div className='flex rounded-lg flex-col p-4 w-card h-card overflow-hidden bg-zinc-900 hover:bg-zinc-800 mb-4'>
          <div className='mb-4'>
            <img src={url} alt='abc' className='h-44 rounded-lg shadow-my '></img>
          </div>
          <div className='text-white font-semibold mb-2'>{title}</div>
      </div>
    )
  }

export default Loghome
