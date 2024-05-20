import React, { useState } from 'react'
import {makeauthenticatedPOSTRequest} from '../utils/serverhelper'
function Demo() {
    const [image,setImage] = useState();
    
    
    const imageupload = async()=>{
        const formdata = new FormData()
        formdata.append("image",image)
        console.log(formdata);
        // const response = await makeauthenticatedPOSTRequest("/userdata/upload",formdata);
        
    }


  return (
    <form action="" encType='multipart/form-data'>
        <input type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
        <input type="submit" onClick={()=>{imageupload()}} />
    </form>
  )
}

export default Demo