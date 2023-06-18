import React from 'react';
import BookItem from './BookItem';
import BookForm from './BookForm';

function BookList () {
  return (
    <div>
      <h1>Lista de Livros</h1>
      <BookForm />
    </div>
  );
}

export default BookList;
