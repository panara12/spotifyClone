import React, { useEffect, useState } from 'react'
import { makeauthenticatedGETRequest } from '../utils/serverhelper';

function Chooseplaylist({closemodel,addsongtoplaylist}) {

    const [playlistdata,setPlaylistdata] = useState([]);

    useEffect(()=>{
        const getplaylist = async ()=>{
            const response = await makeauthenticatedGETRequest("/playlist/get/my")
            setPlaylistdata(response);
        }
        getplaylist();
    },[])


  return (
    <div className='text-white absolute z-10 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center' onClick={closemodel}>
      <div className='bg-app-black w-1/3 rounded text-white text-center' onClick={(e)=>{
        e.stopPropagation();
      }}>
        <div className='text-2xl mt-3  font-semibold'>Choose playlist
        </div>
        <div className='flex flex-col h-1/2 my-2'>
            { 
                playlistdata.map((item)=>{
                    return(
                        <Playlistcard info={item}  addsong={addsongtoplaylist} key={JSON.stringify(item)}/>
                    )
                })
            }
        </div>

      </div>
    </div>
  )
}

const Playlistcard = ({info, addsong})=>{
    return (
    <div className='flex justify-start items-center  space-x-4 mx-4 border-2 rounded-lg border-white border-opacity-50 my-1 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer' 
    onClick={()=>{addsong(info._id)}}>
        <div className='p-2'>
            <img src={info.thumbnail} className='w-14 h-14 rounded-md'/>
        </div>
        <div className='text-xl'>
            {info.name}
        </div>
    </div>
)}

export default Chooseplaylist
