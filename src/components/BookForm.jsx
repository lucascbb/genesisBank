import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import BookDetails from './BookDetails';

function BookForm () {
  const { setBooks } = useContext(ThemeContext);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [botaoAdd, setBotaoAdd] = useState(false);

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
    } else if (name === 'descricao') {
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
          {(titulo.length < 3 && titulo !== '') && <p>O título deve ter pelo menos 3 caracteres.</p>}
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
          {(autor.length < 2 && autor !== '') && <p>O nome do autor ou autora deve ter pelo menos 2 caracteres.</p>}
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
          {(descricao.length < 12 && descricao !== '') && <p>A descricao deve ter pelo menos 12 caracteres.</p>}
        </div>
        <button
          type="button"
          disabled={!(autor.length >= 2 && titulo.length >= 3 && descricao.length >= 12)}
          onClick={ handleClick }
        >
          Adicionar Livro
        </button>
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
