import React, { useContext, useEffect, useState } from 'react'
import Logincontainer from '../components/container/logincontainer'
import { makeauthenticatedGETRequest } from '../utils/serverhelper'
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react';
import Songcontext from '../context/songcontext';


function Songdetailpage() {
    const [songdatas, setSongdata] = useState([]);
    const [userdatas, setuserdata]= useState([]);
    const [colors , setColors] = useState();
    const {id} = useParams();
    const [soundPlayed, setSoundPlayed] = useState(null);
    const {currentSong ,setCurrentSong,ispause,setIsPause} = useContext(Songcontext);
    

    const playsound = (Songsrc) => {
        if (soundPlayed) {
          soundPlayed.stop()
        }
        let sound = new Howl({
          src: [Songsrc],
          html5: true
        })
        setSoundPlayed(sound);
        sound.play();
      }

    useEffect(()=>{
        const data = async ()=>{
            const songdata = await makeauthenticatedGETRequest("/song/get/song/"+id);
            setSongdata(songdata.data[0])
        }
        data();
        const user = async ()=>{
            const userdata = await makeauthenticatedGETRequest("/userdata/get/logeduser/"+songdatas.artist)
            setuserdata(userdata.data);
            console.log(userdatas);
            random_color()
        }
        user()
    },[])
    console.log(songdatas);

    const random_color = ()=>{
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        setColors("#"+randomColor);
    }

  return (
    <Logincontainer navigateTo={"/mysongs"}>
            <div className='w-full h-9/10 rounded-md flex flex-col' style={{backgroundColor : colors}}>
            <div className='w-full h-2/4 flex justify-start items-end'>
                <div className='flex mb-10 ml-16 w-full'>
                    <div className='flex items-end justify-start'>
                    <img src={songdatas.thumbnail} className='h-52 w-56 shadow-my rounded-md'></img>
                    </div>
                    <div className='text-white flex flex-col justify-end items-start ml-8'>
                        <div className='font-bold'>song</div>
                        <div className='font-bold text-6xl mb-3'>
                            {songdatas.name}
                        </div>
                        <div className='flex items-center'>
                            <img src={userdatas.image}
                                className='h-10 w-10 rounded-full'
                            />
                            &nbsp;
                            <div className='font-bold'>{userdatas.firstName}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='backdrop-brightness-50 w-full h-2/4 p-2'>
                <div className='h-14 w-14 bg-app-green flex justify-center items-center rounded-full ml-5 mt-5' onClick={()=>{
                    setCurrentSong(songdatas)
                }}>
                    <Icon icon="ph:play-fill"  style={{color: 'white'}} />
                </div>
                <div className='flex text-white mt-14'>
                    <img src={userdatas.image}  className='rounded-full w-36 h-36'/>
                    <div className='ml-10 w-full flex flex-col justify-center'>
                        <div className='font-semibold text-xl'>Artist</div>
                        <div className='font-bold text-5xl'>{userdatas.firstName}</div>
                    </div>
                </div>
            </div>   
        </div>
  
    </Logincontainer>
  )
}

export default Songdetailpage
