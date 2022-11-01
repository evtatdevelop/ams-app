import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { PersonalArea } from './features/personalArea/personalArea';
import { Resources } from './features/resources/resources';
import { Loader } from './features/loader/loader';
import { useDispatch } from "react-redux";
import { getUser } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getUser()) }, [dispatch, ]);

  return (
    <div className="App">
      {/* <main className='main'><Mainpage/></main> */}
      
      <Routes>
        <Route path='/' element={<Mainpage/>}/>
        <Route path='/personalArea' element={<PersonalArea/>}/>
        <Route path='/resources' element={<Resources/>}/>
      </Routes>

      <Loader/>
    </div>
  );
}

export default App;
