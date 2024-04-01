import React, { useState } from 'react'
import { makeauthenticatedPOSTRequest } from '../utils/serverhelper';
import { useNavigate } from 'react-router-dom';


function CreatePlaylist({closemodel}) {
    const [playlistname,setplaylistname] = useState("");
    const [playlistthumbnail,setplaylistthumnail] = useState("");
    const navigate = useNavigate();

    const createnewplaylist= async()=>{
        console.log(playlistname +"  "+ playlistthumbnail);
        const response = await makeauthenticatedPOSTRequest("/playlist/create",{name:playlistname,thumbnail:playlistthumbnail,songs:[]});
        console.log(response);
        if(response._id){
            closemodel();
            navigate("/library");
        }
    }


  return (
    <div className='text-white absolute z-10 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center' onClick={closemodel}>
      <div className='bg-gray-300 w-1/3 rounded text-black text-center' onClick={(e)=>{
        e.stopPropagation();
      }}>
        <div className='text-2xl font-semibold'>create playlist</div>
        <div className='text-black flex items-center justify-center flex-col'>
            <div className='p-2 mb-4 flex justify-center items-center'>
                          <label htmlFor="Playlist" className="">Playlist Name  : </label>
                          <input type='text' id='Playlist' 
                          value={playlistname}
                          onChange={(e)=>{
                            setplaylistname(e.target.value)
                          }}
                           placeholder='Enter Song name...' className='p-3 border border-gray-400 border-solid rounded placeholder-gray-500 ml-3'/>
            </div>
            <div className='p-2 mb-4 flex justify-center items-center'>
                          <label htmlFor="thumbnail" className="">thumbnail : </label>
                          <input type='text' id='thumbnail' 
                          value={playlistthumbnail}
                          onChange={(e)=>{
                            setplaylistthumnail(e.target.value)
                          }}
                           placeholder='Enter thumbnsil.' className='p-3 border border-gray-400 border-solid rounded placeholder-gray-500 ml-3'/>
            </div>
            <div className='bg-black w-1/3 text-white mb-10 p-2 rounded-full'
             onClick={createnewplaylist}>
                Create playlist
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePlaylist
