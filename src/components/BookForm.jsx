import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import BookDetails from './BookDetails';

function BookForm () {
  const { setBooks } = useContext(ThemeContext);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleClick = () => {
    const data = {
      volumeInfo: {
        title: titulo,
        authors: [autor],
        description: descricao,
        imageLinks: {
          thumbnail: ''
        }
      }
    };

    setBooks(prevBooks => [...prevBooks, data]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'titulo') {
      setTitulo(value);
    } else if (name === 'autor') {
      setAutor(value);
    } else {
      setDescricao(value);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="titulo"
            value={titulo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="autor"
            value={autor}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            type="text"
            id="description"
            name="descricao"
            value={descricao}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={ handleClick }>Adicionar Livro</button>
      </form>
      <BookDetails
        newTitulo={ titulo }
        newAutor={ autor }
        newDescricao={ descricao }
        addNewBook={ handleClick }
      />
    </div>
  );
}

export default BookForm;
