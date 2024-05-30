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
import { root, mainpage, pathBase, permitted, developer } from './config';
import { TestPage } from './testPage/testPage';
import { Workplace } from './features/workplace/workplace';
import { Resources } from './features/resources/resources';

function App() {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getRemote()) }, [dispatch, ]);

  return (
    <div className="App">
      <Routes>
        { root === 'ams'
          ? mainpage.includes(userData.login) 
            ? <Route path={`${pathBase}/`} exact element={<Mainpage/>}/>
            : <Route path={`${pathBase}/`} exact element={<PrimaryPage/>}/> 
          
          : <Route path={`${pathBase}/`} exact element={<Mainpage/>}/>
        }

        <Route path={`${pathBase}/personalArea/:page`} element={<PersonalArea/>}/>
        <Route path={`${pathBase}/personalArea`} element={<PersonalArea/>}/> 

        <Route path={`/lk/:page`} element={<Lk/>}/>
        <Route path={`/lk`} element={<Lk/>}/> 

        {permitted.includes(userData.login)
          ? <>
              <Route path={`${pathBase}/mainpage`} element={<Mainpage/>}/> 
              <Route path={`${pathBase}/primarypage`} element={<PrimaryPage/>}/>
              {/* <Route path={`/components`} element={<Components/>}/>
              <Route path={`/apiTests`} element={<TestPage/>}/> */}
              
              {developer.includes(userData.login) 
                ? <>
                    <Route path={`/components`} element={<Components/>}/>
                    <Route path={`/apiTests`} element={<TestPage/>}/>
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
