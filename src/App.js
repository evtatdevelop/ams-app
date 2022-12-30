import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { PersonalArea } from './features/personalArea/personalArea';
import { Resources } from './features/resources/resources';
import { Loader } from './features/loader/loader';
import { useDispatch } from "react-redux";
import { getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { testMode } from './config';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getRemote()) }, [dispatch, ]);

  const _pathBase = testMode ? '' : '/ams'
  // const _pathBase = '';

  return (
    <div className="App">
      <Routes>
        <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/>
        <Route path={`/personalArea`} element={<PersonalArea/>}/>
        <Route path={`/resources`} element={<Resources/>}/> 
      </Routes>

      <Loader/>
    </div>
  );
}

export default App;
