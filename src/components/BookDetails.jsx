import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';

function BookDetails ({ newTitulo, newAutor, newDescricao, addNewBook }) {
  const { books } = useContext(ThemeContext);
  // console.log(books);

  return (
    <div>
      {books && books.map((book, i) => (
        <div key={i}>
          <img
            alt={`Imagem do livro: ${book.volumeInfo.title}`}
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
