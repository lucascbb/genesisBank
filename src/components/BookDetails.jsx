import React, { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

function BookDetails () {
  const { books, setBooks, setEditBook } = useContext(ThemeContext);
  const [expandedBook, setExpandedBook] = useState(null); // Estado para controlar o livro expandido

  const removeBook = (title, author) => {
    const booksFiltrados = books.filter(
      (ele) =>
        ele.volumeInfo.title !== title && ele.volumeInfo.authors !== author
    );
    setBooks(booksFiltrados);
  };

  const editBook = (title, author, img, description) => {
    setEditBook([title, author, img, description.slice(0, 300)]);
  };

  const toggleExpandedBook = (book) => {
    setExpandedBook(expandedBook === book ? null : book);
  };

  return (
    <ol className="main-BookDetails">
      {books &&
        books.map((book, i) => (
          <li key={i} className="li-BookDetails">
            <div>
              <img
                className="img-BookDetails"
                alt={`Imagem do livro: ${book.volumeInfo.title}`}
                src={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
              />
              <div className="btns-BookDetails">
                <button
                  variant="contained"
                  onClick={() =>
                    removeBook(book.volumeInfo.title, book.volumeInfo.authors)
                  }
                >
                  <AiOutlineDelete />
                </button>
                <button
                  variant="contained"
                  onClick={() =>
                    editBook(
                      book.volumeInfo.title,
                      book.volumeInfo.authors,
                      book.volumeInfo.imageLinks.thumbnail,
                      book.volumeInfo.description
                    )
                  }
                >
                  <AiOutlineEdit />
                </button>
              </div>
            </div>
            <div className="texts-BookDetails">
              <h4>{book.volumeInfo.title}</h4>
              <p>
                {'Por: ' +
                  book.volumeInfo.authors
                    .map((name) => `${name}, `)
                    .join('')
                    .slice(0, -2)}
              </p>

              <div>
                {book.volumeInfo.description.length > 170
                  ? (
                  <>
                    <p
                      style={{
                        maxHeight: expandedBook === book ? '90%' : '110px',
                        background:
                          expandedBook === book
                            ? 'transparent'
                            : 'linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.637) 150%)'
                      }}
                    >
                      {book.volumeInfo.description.slice(0, 300)}
                    </p>
                    <button onClick={() => toggleExpandedBook(book)}>
                      {expandedBook === book ? 'Ler menos' : 'Ler mais'}
                    </button>
                  </>
                    )
                  : <p>{book.volumeInfo.description.slice(0, 300)}</p>}
              </div>
            </div>
          </li>
        ))}
    </ol>
  );
}

export default BookDetails;
