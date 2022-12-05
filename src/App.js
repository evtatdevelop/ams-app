import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { PersonalArea } from './features/personalArea/personalArea';
import { Resources } from './features/resources/resources';
import { Loader } from './features/loader/loader';
import { useDispatch } from "react-redux";
import { getUser } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { testMode } from './config';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getUser()) }, [dispatch, ]);

  const _pathBase = testMode ? '' : '/ams/'

  return (
    <div className="App">
      <Routes>
        <Route path={`${_pathBase}/`} element={<Mainpage/>}/>
        <Route path={`${_pathBase}/personalArea`} element={<PersonalArea/>}/>  {/* ToDo: this route doesn't work */}
        <Route path={`${_pathBase}/resources`} element={<Resources/>}/>        {/* ToDo: this route doesn't work */}
      </Routes>

      <Loader/>
    </div>
  );
}

export default App;
