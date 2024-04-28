import React, { useEffect, useState } from 'react'
import Logincontainer from '../components/container/logincontainer'
import { makeauthenticatedDELETERequest, makeauthenticatedGETRequest } from '../utils/serverhelper'
import { Link, useNavigate } from 'react-router-dom';
function Library() {

    const [playlistdata,setPlaylistdata] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const getplaylist = async ()=>{
            const newplaylist = await makeauthenticatedGETRequest("/playlist/get/my")
            setPlaylistdata(newplaylist);
            console.log(newplaylist);
            navigate('/library');
        }
        getplaylist();
    },[])

      const deleteplaylist = async(id)=>{
        const response = await makeauthenticatedDELETERequest("/playlist/get/deleteplaylist/"+id);
        console.log(response);
      }

      

  return (
    <Logincontainer navigateTo="/home" key={"library"}>
        <div className='text-white text-xl font-semibold mt-5'>
            My Playlist
        </div>
        <div className='grid grid-cols-5 gap-4'>
            {
                playlistdata.map(item=>{
                    return <Card title={item.name} url={item.thumbnail} key={JSON.stringify(item)} id={item._id}
                    deleteplaylist={deleteplaylist}/>
                }) 
            }
        </div>
    </Logincontainer>
  )
}

const Card = ({title,url,id,deleteplaylist})=>{
    const nevigate = useNavigate();
    return(
      <div className='flex rounded-lg flex-col p-4 w-card h-card bg-zinc-900 hover:bg-zinc-800'
      >
          <div className='mb-4' onClick={()=>{
            nevigate("/playlistsongs/"+id);
          }}>
            <img src={url} alt='abc' className='h-44 rounded-lg shadow-my '></img>
          </div>
          <div className='text-white font-semibold mb-2'>{title}</div>
          <div className='text-white self-center'><button className='bg-red-500 p-2 rounded-full' onClick={()=>{
            deleteplaylist(id);
            window.location.reload("/library");
          }
          }>Delete</button></div>
      </div>
    )
  }


export default Library
