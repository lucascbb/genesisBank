import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '../pages/Home';

class Routers extends React.Component {
  render () {
    return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={ <Home /> } />
          </Routes>
        </BrowserRouter>
    );
  }
}

export default Routers;
