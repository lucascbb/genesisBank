import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';

function BookDetails () {
  const { books, setBooks } = useContext(ThemeContext);

  const removeBook = (title, author) => {
    const booksFiltrados = books.filter((ele) => ele.volumeInfo.title !== title && ele.volumeInfo.authors !== author);
    setBooks(booksFiltrados);
  };

  return (
    <div>
      {books && books.map((book, i) => (
        <div key={i}>
          <button onClick={ () => removeBook(book.volumeInfo.title, book.volumeInfo.authors) } >
            Remover
          </button>
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
