import React from 'react';
import { Mainpage } from './features/mainpage/mainpage';
import { Loader } from './features/loader/loader';
import './App.scss';

function App() {
  return (
    <div className="App">
      <main className='main'><Mainpage/></main>
      <Loader/>
    </div>
  );
}

export default App;
