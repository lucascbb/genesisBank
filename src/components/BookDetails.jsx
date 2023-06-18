import React, { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext';

function BookDetails () {
  const { books } = useContext(ThemeContext);
  console.log(books.items && books.items[9].volumeInfo.description);
  return (
    <div>
      {books.items && books.items.map((book) => (
        <div key={book.id}>
          <img
            alt={`Imagem do ${book.volumeInfo.title}`}
            src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
          />
          <h4>{book.volumeInfo.title}</h4>
          <p>{book.volumeInfo.authors.map((name) => `${name}, `).join('').slice(0, -2)}</p>
        </div>
      ))}
    </div>
  );
}

export default BookDetails;
