import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { Loader } from './features/loader/loader';
import { useSelector, useDispatch } from "react-redux";
import { lang, getUser } from './features/user/userSlice';
import './App.scss';

function App() {
  const language = useSelector(lang);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getUser(language)) }, [dispatch, language]);

  return (
    <div className="App">
      <main className='main'><Mainpage/></main>
      <Loader/>
    </div>
  );
}

export default App;
