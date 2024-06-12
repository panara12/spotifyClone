import React, { useState } from 'react'
import {makeauthenticatedPOSTRequest} from '../utils/serverhelper'
import {FormData} from "formdata-node"
function Demo() {
    var [image,setImage] = useState();
    console.log(image);
    const formdata = new FormData()
    formdata.set("image",image)
    for (var pair of formdata.entries()) {
      console.log(pair); 
    }

    const imageupload = async()=>{
        
        const response = await makeauthenticatedPOSTRequest("/userdata/upload",formdata);
        console.log("formdata=".response);
    }


  return (
    <form action="" encType='multipart/form-data'>
        <input type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
        <input type="submit" onClick={()=>{imageupload()}} />
    </form>
  )
}

export default Demo