import React from 'react';
import BookList from '../components/BookList';
import Logo from '../images/logo.png';

function Home () {
  return (
    <>
      <header>
        <img src={ Logo } alt='Logo do site'></img>
        <h1>Book House</h1>
      </header>
      <BookList />
      <footer />
    </>
  );
}

export default Home;
