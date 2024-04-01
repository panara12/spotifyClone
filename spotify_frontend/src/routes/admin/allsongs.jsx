import React, { useContext, useEffect, useState } from 'react'
import LoginContainer from '../../components/container/logincontainer'
import { makeauthenticatedDELETERequest, makeauthenticatedGETRequest } from '../../utils/serverhelper'
import Songcontext from '../../context/songcontext';

function Allsongs() {
    const [songdata , setSongdata] = useState([]);
    const {currentSong ,setCurrentSong} = useContext(Songcontext);
    
    useEffect(()=>{
        const getData = async()=>{
            const response = await makeauthenticatedGETRequest('/song/get/allsongs');
            setSongdata(response.data);
        }
        getData();
    },[])

    const deletesong = async(id)=>{
      const response = await makeauthenticatedDELETERequest("/song/get/allsongs/"+id);
      console.log(response);
    }

  return (
    <LoginContainer navigateTo="/admin" key={"allsongs"}>
    <div className='grid grid-cols-5 gap-3'>
        {
            songdata.map((item)=>{
                return(
                  <div onClick={()=>{setCurrentSong(item)}}>
                    <Card title={item.name} discription={item.artist.firstName} url={item.thumbnail}id={item._id} deletesong={deletesong} key={item._id}></Card>
                  </div>
                )
            })
        }
    </div>
    </LoginContainer>
  )
}

const Card = ({title,discription,url,id,deletesong})=>{
    return(
      <div className='flex rounded-lg flex-col p-4 w-card h-card overflow-hidden bg-zinc-900 hover:bg-zinc-800 mb-5'>
          <div className='mb-2'>
            <img src={url} alt='abc' className='h-44 rounded-lg shadow-my '></img>
          </div>
          <div className='text-white font-semibold mb-1'>{title}</div>
          <div className='text-gray-500 font-bold text-xs'>{discription}</div>
          <div className='text-center text-white'>
            <button className='bg-red-500 p-2 rounded-full' onClick={()=>{deletesong(id)}}>delete</button>
          </div>
      </div>
    )
  }

export default Allsongs
