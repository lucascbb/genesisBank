import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import BookDetails from './BookDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import semCapa from '../images/semCapa.png';

function BookForm () {
  const { books, setBooks, editBook } = useContext(ThemeContext);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    image: '',
    description: ''
  });
  const [existingBook, setExistingBook] = useState(false);
  const [editingBook, setEditingBook] = useState(true);

  const addBook = () => {
    const duplicate = books.filter(
      (exist) => exist.volumeInfo.title === newBook.title
    );
    if (duplicate.length > 0 && editingBook) {
      return setExistingBook(true);
    }

    const booksFiltrados = books.filter(
      (ele) =>
        ele.volumeInfo.title !== editBook[0] &&
        ele.volumeInfo.authors[0] !== editBook[1]
    );

    const data = {
      volumeInfo: {
        title: newBook.title,
        authors: [newBook.author],
        description: newBook.description,
        imageLinks: {
          thumbnail: newBook.image === '' ? semCapa : newBook.image
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
        image: editBook[2],
        description: editBook[3]
      });
    }
  }, [editBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  return (
    <section className="main-BookForm">
      <article>
        {existingBook && <p>Esse título já está cadastrado!</p>}
      </article>
      <form>
      <div className='inputs-BookForm'>
        <label htmlFor="title">
          <TextField
            required
            id="outlined-basic"
            label="Título do Livro"
            variant="outlined"
            helperText={
              newBook.title.length < 3 &&
              newBook.title !== '' &&
              'Mín. 3 caracteres'
            }
            type="text"
            placeholder="O Pequeno Príncipe"
            name="title"
            value={newBook.title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="author">
          <TextField
            required
            id="outlined-basic"
            label="Nome do autor"
            variant="outlined"
            helperText={
              newBook.author.length < 3 &&
              newBook.author !== '' &&
              'Mín. 3 caracteres'
            }
            type="text"
            placeholder="Antoine De Saint-Exupéry"
            name="author"
            value={newBook.author}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="image">
          <TextField
            id="outlined-basic"
            label="URL da Imagem"
            variant="outlined"
            type="text"
            placeholder="https://images.tcdn.com.br/img/img_prod/850317/pequeno_principe_o_2329_1_6917d4e12c4129c862834e02ec9dce37.jpg"
            name="image"
            value={newBook.image}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          <TextField
            required
            id="outlined-basic"
            label="Descrição do Livro"
            variant="outlined"
            helperText={
              (newBook.description.length < 12 || newBook.description.length > 300) &&
              newBook.description !== '' &&
              'Mín. 12 e Máx. 300 caracteres'
            }
            placeholder="Uma história maravilhosa e profunda, para todas as idades, e ilustrada pelo próprio autor."
            name="description"
            value={newBook.description}
            onChange={handleChange}
          />
        </label>
        </div>

        <Button
          variant="contained"
          type="button"
          disabled={newBook.title.length < 3 || newBook.author.length < 3 ||
             newBook.description.length < 12 || newBook.description.length > 300 }
          onClick={addBook}
        >
          Adicionar Livro
        </Button>
      </form>
      <BookDetails />
    </section>
  );
}

export default BookForm;
