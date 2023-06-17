import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function Home () {
  const { books } = useContext(ThemeContext);
  console.log(books);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
