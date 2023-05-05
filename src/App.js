import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { PrimaryPage } from './features/primaryPage/mainpage';
import { PersonalArea } from './features/personalArea/personalArea';
import { Components } from './features/components/components';
import { Loader } from './features/loader/loader';
import { useSelector, useDispatch } from "react-redux";
import { user, getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { testMode, permitted, root, mainpage, developer } from './config';
import { TestPage } from './testPage/testPage';
import { Workplace } from './features/workplace/workplace';
import { Resources } from './features/resources/resources';

function App() {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getRemote()) }, [dispatch, ]);

  const _pathBase = testMode ? '' : `/${root}`

  return (
    <div className="App">
      <Routes>
        {/* <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/> */}        
        {mainpage.includes(userData.login) || root === 'ams' 
          ? <Route path={`${_pathBase}/`} exact element={<PrimaryPage/>}/> 
          : <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/>
        }

        {/* <Route path={`/primarypage`} element={<PrimaryPage/>}/> */}

        {/* {mainpage.includes(userData.login) 
          ? <Route path={`${_pathBase}/mainpage`} element={<Mainpage/>}/> 
          : <Route path={`${_pathBase}/primarypage`} element={<PrimaryPage/>}/>
        } 
        <Route path={`/personalArea`} element={<PersonalArea/>}/>
        <Route path={`/workplace`} element={<Workplace/>}/>
        <Route path={`/resources`} element={<Resources/>}/>
        {permitted.includes(userData.login) ? <Route path={`/components`} element={<Components/>}/> : null} 
        {permitted.includes(userData.login) ? <Route path={`/apiTests`} element={<TestPage/>}/> : null}  */}

        {permitted.includes(userData.login)
          ? <>
            {mainpage.includes(userData.login) || root === 'ams' 
              ? <Route path={`${_pathBase}/mainpage`} element={<Mainpage/>}/> 
              : <Route path={`${_pathBase}/primarypage`} element={<PrimaryPage/>}/>
            } 
            {developer.includes(userData.login) 
              ? <>
                  <Route path={`/personalArea`} element={<PersonalArea/>}/>
                  <Route path={`/workplace`} element={<Workplace/>}/>
                  <Route path={`/resources`} element={<Resources/>}/>
                  <Route path={`/apiTests`} element={<TestPage/>}/>              
              </>
              : null
            } 
            <Route path={`/components`} element={<Components/>}/>           
          </>
          : null
        }
      </Routes>
      
      <Loader/>
    </div>
  );
}

export default App;
