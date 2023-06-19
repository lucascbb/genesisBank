import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import BookForm from './BookItem_Form';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../styles/book.css';

function BookList () {
  const { books } = useContext(ThemeContext);

  return (
    <main className='bookList'>
      {books.length > 0
        ? <BookForm />
        : <Box className="loading-Booklist">
              <CircularProgress />
              <h4>Carregando</h4>
          </Box>
        }
    </main>
  );
}

export default BookList;
