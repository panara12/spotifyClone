import React, { useEffect, useState } from 'react'
import LoginContainer from '../components/container/logincontainer'
import { Icon } from '@iconify/react'
import { makeauthenticatedGETRequest } from '../utils/serverhelper';
import Singlesongcard from '../components/shades/singlesongcard';

function Search() {

    const [isInputFocused,setisInputFocused] = useState(false);
    const [searchtext,setSearchtext] = useState("");
    const [allsongs,setAllsongs] = useState([]);

    useEffect(()=>{
        const allsongs = async()=>{
            const data = await makeauthenticatedGETRequest("/song/get/allsongs");
            setAllsongs(data.data);
        }
        allsongs()
    },[])
    console.log(allsongs);


  return (
    <LoginContainer navigateTo="/home" key={"search"}>
        <div className='flex flex-col h-full'>
            <div className='flex justify-center items-center w-full' >
                <div className={`flex items-center justify-start w-1/3 py-2 rounded-full  bg-black ${isInputFocused ?"border border-white":""}`}>    
                    <Icon icon="ion:search"  style= {{color:'white'}} 
                        className='size-8 mr-1 ml-5' 
                    />
                    <input type='text' placeholder='what do you want to listen to ?' className='w-full bg-black m-2 text-white focus:outline-none'
                        onFocus={()=>{
                            setisInputFocused(true);
                        }}
                        onBlur={()=>{
                            setisInputFocused(false);
                        }}
                    onChange={(e)=>{
                        setSearchtext(e.target.value);
                    }}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                            searchSong();
                        }
                    }}
                    />
                </div>
            </div>
            {
                allsongs.length > 0 ?
            <div className='pt-10 space-y-3'>
            <div className='text-white'>
                search result for<span className='font-bold'> "{searchtext}"</span>
            </div>
            {
                allsongs.filter((item)=>{
                    return searchtext.toLowerCase() === "" ? item : item.name.toLowerCase().includes(searchtext); 
                }).map(item=>{
                    return <Singlesongcard info={item} key={JSON.stringify(item)}/>
                })
            }
            </div>:
            <div className='text-white pt-10'>
                nothig searched
            </div>
            }
        </div>
    </LoginContainer>
  )
}

export default Search
