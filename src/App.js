import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { PersonalArea } from './features/personalArea/personalArea';
import { Components } from './features/components/components';
import { Loader } from './features/loader/loader';
import { useSelector, useDispatch } from "react-redux";
import { user, getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { testMode } from './config';
import { TestPage } from './testPage/testPage';
import { Workplace } from './features/workplace/workplace';
import { Resources } from './features/resources/resources';

function App() {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getRemote()) }, [dispatch, ]);

  const _pathBase = testMode ? '' : '/ams'
  // const _pathBase = '';

  return (
    <div className="App">
      <Routes>
        <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/>
        <Route path={`/personalArea`} element={<PersonalArea/>}/>
        <Route path={`/workplace`} element={<Workplace/>}/>
        <Route path={`/resources`} element={<Resources/>}/>
        {userData.login === 'TatarenkoEG' ? <Route path={`/components`} element={<Components/>}/> : null} 
        {userData.login === 'TatarenkoEG' ? <Route path={`/apiTests`} element={<TestPage/>}/> : null} 
      </Routes>

      <Loader/>
    </div>
  );
}

export default App;
