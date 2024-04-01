import React, { useEffect, useState } from 'react'
import Singlesongcard from '../components/shades/singlesongcard'
import { Howl, Howler } from 'howler';
import { makeauthenticatedGETRequest,makeauthenticatedDELETERequest } from '../utils/serverhelper'
import LoginContainer from '../components/container/logincontainer';
import { useNavigate } from 'react-router-dom';

function Mysong() {

  const [songdata, setSongdata] = useState([]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const navigate = useNavigate();

  const deleteSong = async(id)=>{
    const response = await  makeauthenticatedDELETERequest("/song/get/mysongs/"+id);
    console.log(id);
    navigate("/mysongs");
  }


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

  useEffect(() => {
    const getData = async () => {
      const response = await makeauthenticatedGETRequest("/song/get/mysongs")
      setSongdata(response.data);
    }
    getData();
  }, [])

  return (
    
    <LoginContainer navigateTo="/home" key={"mysongs"}>
      <div className='text-white text-lg font-semibold mb-3'>
        <div>Songs</div>
        {songdata.map((item) => {
          return (
          <div className='flex justify-between items-center'>
            <Singlesongcard info={item} playsound={playsound} key={JSON.stringify.item}/>
              <button onClick={()=>{deleteSong(item._id)}} className='p-2 bg-red-600 rounded-xl'>Delete</button>
          </div>
          )
        })}
      </div>
    </LoginContainer>
  )
}

export default Mysong
