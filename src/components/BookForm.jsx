import React, { useState } from 'react';

function BookForm () {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(titulo);
    console.log(autor);
    console.log(descricao);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
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
    <form onSubmit={handleSubmit}>
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
          onKeyDown={handleKeyDown}
        />
      </div>
      <button type="submit">Adicionar Livro</button>
    </form>
  );
}

export default BookForm;
