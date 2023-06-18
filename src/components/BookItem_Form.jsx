import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import BookDetails from './BookDetails';

function BookForm () {
  const { books, setBooks, editBook } = useContext(ThemeContext);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '', image: '' });
  const [existingBook, setExistingBook] = useState(false);
  const [editingBook, setEditingBook] = useState(true);

  const addBook = () => {
    const duplicate = books.filter((exist) => exist.volumeInfo.title === newBook.title);
    if (duplicate.length > 0 && editingBook) { return setExistingBook(true); }

    const booksFiltrados = books.filter((ele) => ele.volumeInfo.title !== editBook[0] &&
      ele.volumeInfo.authors[0] !== editBook[1]
    );

    const data = {
      volumeInfo: {
        title: newBook.title,
        authors: [newBook.author],
        description: newBook.description,
        imageLinks: {
          thumbnail: newBook.image
        }
      }
    };

    setBooks(booksFiltrados);
    setBooks((prevBooks) => [data, ...prevBooks]);
    setEditingBook(true);
    setNewBook({
      title: '',
      author: '',
      description: '',
      image: ''
    });
  };

  useEffect(() => {
    setExistingBook(false);
  }, [newBook.title]);

  useEffect(() => {
    if (editBook.length > 0) {
      setEditingBook(false);
      setNewBook({
        title: editBook[0],
        author: editBook[1].join(', '),
        description: editBook[3],
        image: editBook[2]
      });
    } console.log(newBook.author);
  }, [editBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
    console.log(newBook.author);
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
            placeholder="O Pequeno Príncipe"
            name="title"
            value={newBook.title}
            onChange={ handleChange }
          />
          {newBook.title.length < 3 && newBook.title !== '' && (
            <p>O título deve ter pelo menos 3 caracteres.</p>
          )}
        </div>
        <div>
          <label htmlFor="author">
            Autor<span>*</span>
          </label>
          <input
            type="text"
            id="author"
            placeholder="Antoine De Saint-Exupéry"
            name="author"
            value={newBook.author}
            onChange={ handleChange }
          />
          {newBook.author.length < 3 && newBook.author !== '' && (
            <p>O nome do autor ou autora deve ter pelo menos 3 caracteres.</p>
          )}
        </div>
        <div>
          <label htmlFor="image">
            Link da Imagem<i>Opcional</i>
          </label>
          <input
            type="text"
            id="image"
            placeholder="https://images.tcdn.com.br/img/img_prod/850317/pequeno_principe_o_2329_1_6917d4e12c4129c862834e02ec9dce37.jpg"
            name="image"
            value={newBook.image}
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="description">
            Descrição
            <span>*</span>
          </label>
          <textarea
            id="description"
            placeholder="Uma história maravilhosa e profunda, para todas as idades, e ilustrada pelo próprio autor."
            name="description"
            value={newBook.description}
            onChange={ handleChange }
          />
          {newBook.description.length < 3 && newBook.description !== '' && (
            <p>A descrição deve ter pelo menos 3 caracteres.</p>
          )}
        </div>
        <button
          type="button"
          disabled={ newBook.title.length < 3 || newBook.description.length < 3 }
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
