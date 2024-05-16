import {backendurl} from './config.jsx';

export const makeUnauthenticatedPOSTRequest = async (route,body)=>{
    const response = await fetch(backendurl+route,{
        method:"POST",
        headers:{
            "Content-Type":"application/json", 
        },
        body:JSON.stringify(body),
    });
    const fromattedResponse = await response.json();
    return fromattedResponse;
}


export const makeauthenticatedPOSTRequest = async (route,body)=>{
    const token = getToken();
    const response = await fetch(backendurl+route,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}` 
        },
        body:JSON.stringify(body),
    });
    const fromattedResponse = await response.json();
    return fromattedResponse;
}

export const makeauthenticatedPUTRequest = async (route,body)=>{
    const token = getToken();
    const response = await fetch(backendurl+route,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}` 
        },
        body:JSON.stringify(body),
    });
    const fromattedResponse = await response.json();
    return fromattedResponse;
}



export const makeauthenticatedGETRequest = async (route)=>{
    const token = getToken();
    const response = await fetch(backendurl+route,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}` 
        },
    });
    const fromattedResponse = await response.json();
    return fromattedResponse;
}

export const makeauthenticatedDELETERequest = async (route)=>{
    const token = getToken();
    const response = await fetch(backendurl+route,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}` 
        },
    });
    const fromattedResponse = await response.json();
    return fromattedResponse;
}


const getToken = ()=>{
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1"
    );
    return accessToken; 
}