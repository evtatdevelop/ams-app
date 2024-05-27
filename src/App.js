import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { PrimaryPage } from './features/primaryPage/mainpage';
import { PersonalArea } from './features/personalArea/personalArea';
import { Lk } from './features/lk/lk';
import { Components } from './features/components/components';
import { Loader } from './features/loader/loader';
import { useSelector, useDispatch } from "react-redux";
import { user, getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { mode, permitted, root, mainpage, developer } from './config';
import { TestPage } from './testPage/testPage';
import { Workplace } from './features/workplace/workplace';
import { Resources } from './features/resources/resources';

function App() {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getRemote()) }, [dispatch, ]);

  // const _pathBase = testMode ? '' : `/${root}`
  const _pathBase = mode === 'local' ? '' : `/${root}`

  return (
    <div className="App">
      <Routes>
        {/* <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/> */}        

        {/* {mainpage.includes(userData.login) 
          ? <Route path={`${_pathBase}/`} exact element={<PrimaryPage/>}/> 
          : <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/>
        } */}

        { root === 'ams'
          ? mainpage.includes(userData.login) 
            ? <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/>
            : <Route path={`${_pathBase}/`} exact element={<PrimaryPage/>}/> 
          
          : <Route path={`${_pathBase}/`} exact element={<Mainpage/>}/>
        }

        <Route path={`${_pathBase}/personalArea/:page`} element={<PersonalArea/>}/>
        <Route path={`${_pathBase}/personalArea`} element={<PersonalArea/>}/> 

        <Route path={`/lk/:page`} element={<Lk/>}/>
        <Route path={`/lk`} element={<Lk/>}/> 

        {permitted.includes(userData.login)
          ? <>
              <Route path={`${_pathBase}/mainpage`} element={<Mainpage/>}/> 
              <Route path={`${_pathBase}/primarypage`} element={<PrimaryPage/>}/>
              <Route path={`/components`} element={<Components/>}/>
              <Route path={`/apiTests`} element={<TestPage/>}/>
              
              {developer.includes(userData.login) 
                ? <>
                    <Route path={`/workplace`} element={<Workplace/>}/>
                    <Route path={`/resources`} element={<Resources/>}/>       
                </>
                : null
              } 

            </>
          : null
        }
      </Routes>
      
      <Loader/>
    </div>
  );
}

export default App;
