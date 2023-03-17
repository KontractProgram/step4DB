import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './components/home';
import Street from './components/street';


function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/street":
      component = <Street />
      break
  
  }
  return (
    <>
    <Navbar />
    <div className='container'>
      {component}
    </div>
  </>
  );
}

export default App;
