import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './routes/Home'
import Login from './routes/Login';
import Signup from './routes/signup';
import { useCookies } from 'react-cookie';
import Loghome from './routes/loghome';
import Uploadsong from './routes/uploadsong';
import Admin from './routes/admin';
import Mysong from './routes/mysongs';
import Songcontext from './context/songcontext';
import { useEffect, useState } from 'react';
import Search from './routes/search';
import Allusers from './routes/admin/allusers';
import Library from './routes/library';
import Playlistsongs from './routes/playlistsongs';
import Allsongs from './routes/admin/allsongs';
import { makeauthenticatedGETRequest } from './utils/serverhelper';
import Likedsongs from '../src/routes/likedsongs'
import Songdetailpage from '../src/routes/songdetailpage'
import Userprofile from './routes/userprofile';
import Userupdate from './routes/userupdate';
import Changepass from './routes/changepass';




function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [cookie, setCookie] = useCookies(['token']);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [ispause, setIsPause] = useState(true);
  const [userrole,setuserrole] = useState("")

  useEffect(()=>{
    
    const userdata = async()=>{
      const response = await makeauthenticatedGETRequest('/userdata/get/logeduser/'+cookie.userid);
      setuserrole(response.data.role);
      console.log(userrole);
    }
    userdata();
  },[])
  console.log(userrole);

  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>

        {
          cookie.token ? (
            <Songcontext.Provider value={{ currentSong, setCurrentSong, soundPlayed, setIsPause, setSoundPlayed, ispause }}>
            {userrole=="admin" && 
            <Routes>
                <Route path='/home/' element={<Loghome />}></Route>
                <Route path='*' element={<Navigate to="/home/" />} />
                <Route path='/uploadsong' element={<Uploadsong />}></Route>
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/mysongs' element={<Mysong />}></Route>
                <Route path='/search' element={<Search />}></Route>
                <Route path='/library' element={<Library />}></Route>
                <Route path='/playlistsongs/:playlistId' element={<Playlistsongs />}></Route>
                <Route path='/admin/allusers' element={<Allusers />}></Route>
                <Route path='/admin/allsongs' element={<Allsongs />}></Route>
                <Route path='/likedsongs' element={<Likedsongs />}></Route>
                <Route path='/userprofile' element={<Userprofile />}></Route>
                <Route path='/userupdate' element={<Userupdate />}></Route>
                <Route path='/changepass' element={<Changepass />}></Route>
                <Route path='/songdetailpage/:id' element={<Songdetailpage />}></Route>
              </Routes>
            }
            {
              userrole=="artist" && 
              <Routes>
              
                <Route path='/userupdate' element={<Userupdate />}></Route>
                <Route path='/home/' element={<Loghome />}></Route>
                <Route path='/uploadsong' element={<Uploadsong />}></Route>
                <Route path='*' element={<Navigate to="/home/" />} />
                <Route path='/mysongs' element={<Mysong />}></Route>
                <Route path='/userprofile' element={<Userprofile />}></Route>
                <Route path='/search' element={<Search />}></Route>
                <Route path='/library' element={<Library />}></Route>
                <Route path='/playlistsongs/:playlistId' element={<Playlistsongs />}></Route>
                <Route path='/likedsongs' element={<Likedsongs />}></Route>
                <Route path='/changepass' element={<Changepass />}></Route>
                <Route path='/songdetailpage/:id' element={<Songdetailpage />}></Route>
              </Routes>

            }
            {userrole == "user" &&
              <Routes>
                <Route path='/userupdate' element={<Userupdate />}></Route>
                <Route path='/home/' element={<Loghome />}></Route>
                <Route path='*' element={<Navigate to="/home/" />} />
                <Route path='/userprofile' element={<Userprofile />}></Route>
                <Route path='/search' element={<Search />}></Route>
                <Route path='/library' element={<Library />}></Route>
                <Route path='/songdetailpage/:id' element={<Songdetailpage />}></Route>
                <Route path='/playlistsongs/:playlistId' element={<Playlistsongs />}></Route>
                <Route path='/changepass' element={<Changepass />}></Route>
                <Route path='/likedsongs' element={<Likedsongs />}></Route>
              </Routes>
            }
            </Songcontext.Provider>
          ) : (
            <Routes>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
          )}
      </BrowserRouter>
    </div>
  );
}

export default App
