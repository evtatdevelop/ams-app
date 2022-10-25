import React, { useEffect } from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { Loader } from './features/loader/loader';
import { useDispatch } from "react-redux";
import { getUser } from './features/user/userSlice';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getUser()) }, [dispatch, ]);

  return (
    <div className="App">
      <main className='main'><Mainpage/></main>
      <Loader/>
    </div>
  );
}

export default App;
