import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginContainer from '../components/container/logincontainer';
import Singlesongcard from '../components/shades/singlesongcard';
import { makeauthenticatedGETRequest } from '../utils/serverhelper';

function Playlistsongs() {
    const {playlistId} = useParams();
    const [playlistdata , setPlaylistdata] = useState({});

    useEffect(()=>{
        const getplaylistdata = async ()=>{
            const response = await makeauthenticatedGETRequest("/playlist/get/playlist/"+playlistId);
            setPlaylistdata(response);
            console.log(response);
        }
        getplaylistdata();
    },[])

  return (
      <LoginContainer navigateTo="/library" key={"playlistsongs"}>
      {
        playlistdata._id &&
        <div>
            <div className='text-white text-xl font-semibold mt-5'>
            {playlistdata.name}
            </div>
            <div className='pt-10 space-y-3'>
            {
                playlistdata.songs.map(item=>{
                    return <Singlesongcard info={item} key={JSON.stringify(item)}/>
                })
            }
            </div>
        </div>
      }
      </LoginContainer>
  )
}

export default Playlistsongs
