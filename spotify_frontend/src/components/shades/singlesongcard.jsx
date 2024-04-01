import React, { useContext } from 'react'
import { Icon } from '@iconify/react';
import Songcontext from '../../context/songcontext';


function Singlesongcard({info,playsound}) {

  const {currentSong ,setCurrentSong} = useContext(Songcontext);

  return (
    <div className='text-white flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm justify-between items-center w-9/10'
    onClick={()=>{
      setCurrentSong(info);
    }}
    >
      <div className='flex space-x-4 items-center'>
        <div className='w-12 h-12 bg-white bg-cover bg-center'>
          <img src={info.thumbnail} className='object-cover w-12 h-12'></img>
        </div>
        <div className='flex flex-col justify-center items-start'>
        <div className='hover:underline cursor-pointer'>{info.name}</div>
        <div className='hover:underline cursor-pointer text-xs opacity-50'>{info.artist.firstName+" "+info.artist.lastName}</div>
        </div>
      </div>
      <div className='flex p-2 justify-start items-center opacity-60'>
        <div className='mr-5'><Icon icon="icon-park-outline:like"  style={{color: 'white'}} className='size-6'/></div>
        <div className='mr-5 '>3:44</div>
        <div className=''><Icon icon="ph:dots-three-bold"  style={{color: 'white'}} className='size-9'/></div>
      </div>
    </div>
  )
}

export default Singlesongcard
