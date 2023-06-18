import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import BookDetails from './BookDetails';

function BookForm () {
  const { books, setBooks } = useContext(ThemeContext);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImg, setUrlImg] = useState('');
  const [existingBook, setExistingBook] = useState(false);

  const addBook = () => {
    const existingBook = books.filter((exist) => exist.volumeInfo.title === titulo);

    if (existingBook.length > 0) {
      return setExistingBook(true);
    }

    const data = {
      volumeInfo: {
        title: titulo,
        authors: [autor],
        description: descricao,
        imageLinks: {
          thumbnail: urlImg
        }
      }
    };

    setBooks(prevBooks => [data, ...prevBooks]);
    setTitulo('');
    setAutor('');
    setDescricao('');
    setUrlImg('');
  };

  useEffect(() => {
    setExistingBook(false);
  }, [titulo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'titulo') {
      setTitulo(value);
    } else if (name === 'autor') {
      setAutor(value);
    } else if (name === 'descricao') {
      setDescricao(value);
    } else if (name === 'imagem') {
      setUrlImg(value);
    }
  };

  return (
    <div>
      <div>
        {existingBook && <p>Esse título já está cadastrado!</p>}
      </div>
      <form>
        <div>
          <label htmlFor="title">
            Título
            <span>*</span>
          </label>
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
          <label htmlFor="author">
            Autor
            <span>*</span>
          </label>
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
          <label htmlFor="author">
            Link da Imagem
            <i>Opcional</i>
          </label>
          <input
            type="text"
            id="imagem"
            name="imagem"
            value={urlImg}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">
            Descrição
            <span>*</span>
          </label>
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
          onClick={ addBook }
        >
          Adicionar Livro
        </button>
      </form>
      <BookDetails />
    </div>
  );
}

export default BookForm;
