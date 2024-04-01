import React, { useEffect, useState } from 'react'
import Logincontainer from '../../components/container/logincontainer'
import { makeauthenticatedDELETERequest, makeauthenticatedGETRequest } from '../../utils/serverhelper';
import { useNavigate } from 'react-router-dom';


function Allusers(req,res) {
        const [userdata,setUserdata] = useState([]);
        const navigate = useNavigate();


        useEffect(()=>{
           const getData = async()=>{
                const response = await makeauthenticatedGETRequest("/userdata/get/alluserdata");
                setUserdata(response.data);
           }  
           getData();
        },[])

        const deleteUser = async(id)=>{
                const response = await  makeauthenticatedDELETERequest("/userdata/get/user/"+id);
                console.log(id);
                navigate("/admin");
        }


  return (
    <Logincontainer navigateTo="/admin" key={"alluser"}>
        <div className='grid grid-flow-row border'>
            <div className='bg-black w-full h-full grid grid-cols-3  text-white border'>
                <div className=' text-center border'>
                        name
                </div>
                <div className='text-center border'>
                        Username
                </div>
                <div className=' text-center border'>
                        delete user
                </div>
            </div>
            {
                userdata.map((item)=>{
                        return(
                                <div className='bg-black w-full h-full grid grid-cols-3 text-white border'>
                                { item.role != "admin" && <>
                                <div className=' text-center  self-center border p-2'>
                                        {item.firstName}
                                </div>
                                <div className=' text-center self-center border p-2'>
                                        {item.username}
                                </div>
                                <div className=' text-center border'>
                                        <button className='bg-gray-600 p-2 rounded-lg' 
                                        onClick={(e)=>{
                                                deleteUser(item._id);
                                        }}>
                                                delete
                                        </button>
                                </div>
                                </>
                                }
                                </div> 
                        )
                })
            }
            
        </div>

    </Logincontainer>
  )
}

export default Allusers
