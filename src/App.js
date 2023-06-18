import React, { useState, useEffect } from 'react';
import Routes from './routes/Routes';
import ThemeContext from './context/ThemeContext';
import { getBooks } from './services/api/api';

function App () {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBooks();
      setBooks(data);
    };

    fetchData();
  }, []);

  return (
    <ThemeContext.Provider value={{ books }}>
      <Routes />
    </ThemeContext.Provider>
  );
}

export default App;
