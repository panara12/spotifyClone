import React from 'react'
import { Link } from 'react-router-dom'
import Logincontainer from '../components/container/logincontainer'


function Admin() {
  return (

    <Logincontainer navigateTo="/home" key={"admin"}>
        <div className='h-auto bg-black w-full grid grid-flow-row p-10 grid-cols-3 gap-x-20 gap-y-10 mt-10'>
            
            <div className='w-full h-28 bg-app-black text-white flex justify-center items-center  
            hover:font-bold
            hover:text-2xl
            text-xl font-semibold
            hover:border rounded-xl'>
                <Link to="/admin/allusers">users</Link>
            </div>
            <div className='w-full h-28 bg-app-black flex justify-center text-xl font-semibold rounded-xl 
            hover:border text-white items-center 
            hover:font-bold
            hover:text-2xl '>
                <Link to="/admin/allsongs">songs</Link>
            </div>
            <div className='w-full h-28 bg-app-black text-white flex justify-center text-xl font-semibold 
            hover:font-bold
            hover:text-2xl
            hover:border rounded-xl
            items-center '>
                <Link>playlists</Link>
            </div>
            <div className='w-full h-28 bg-app-black text-white flex justify-center text-xl font-semibold
            hover:font-bold
            hover:text-2xl
            hover:border rounded-xl 
            items-center '>
                <Link>other</Link>
            </div>
    </div>
    </Logincontainer>
    
  )
}

export default Admin

