import {createContext} from 'react';
import React from 'react'

const Songcontext =createContext({
    currentSong:null,
    setCurrentSong:(currentSong)=>{},
    soundPlayed : null,
    setSoundPlayed : ()=>{},
    ispause : null, 
    setIsPause : ()=>{}
})

export default Songcontext
