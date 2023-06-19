import React from 'react';
import App from '../App.js';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockBooks = [
  {
    volumeInfo: {
      title: 'Livro 1',
      authors: ['Autor 1'],
      imageLinks: {
        thumbnail: 'https://example.com/book1-image.jpg'
      }
    }
  },
  {
    volumeInfo: {
      title: 'Livro 2',
      authors: ['Autor 2'],
      imageLinks: {
        thumbnail: 'https://example.com/book2-image.jpg'
      }
    }
  }
];

describe('Book List Page - Testes', () => {
  test('Testando se o título H2 esta presente na tela', () => {
    const { getByText } = render(<App />);

    const titleElement = getByText(/Lista de Livros/i);
    expect(titleElement).toBeInTheDocument();
  });
});

describe('Book Item Form - Testes', () => {
  test('Testando se o input de "Título" esta presente na tela', () => {
    render(<App />);
    const titleInput = screen.getByLabelText(/Título/i);
    expect(titleInput).toBeInTheDocument();
  });

  test('Testando se o input de "Autor" esta presente na tela', () => {
    render(<App />);
    const authorInput = screen.getByLabelText(/Autor/i);
    expect(authorInput).toBeInTheDocument();
  });

  test('Testando se o input de "Imagem" esta presente na tela', () => {
    render(<App />);
    const imageInput = screen.getByLabelText(/Link da Imagem/i);
    expect(imageInput).toBeInTheDocument();
  });

  test('Testando se o input de "Descrição" esta presente na tela', () => {
    render(<App />);
    const descriptionTextarea = screen.getByLabelText(/Descrição/i);
    expect(descriptionTextarea).toBeInTheDocument();
  });
});

describe('Book Item Form - Testes', () => {
  test('Testando se ao clicar no botao com os inputs preenchidos aparece o resultado na tela', () => {
    render(<App />);

    const titleInput = screen.getByLabelText(/Título/i);
    const authorInput = screen.getByLabelText(/Autor/i);
    const imageInput = screen.getByLabelText(/Link da Imagem/i);
    const descriptionTextarea = screen.getByLabelText(/Descrição/i);

    fireEvent.change(titleInput, { target: { value: 'O Pequeno Príncipe' } });
    fireEvent.change(authorInput, { target: { value: 'Antoine De Saint-Exupéry' } });
    fireEvent.change(imageInput, { target: { value: 'https://example.com/book-image.jpg' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Uma história maravilhosa.' } });

    const addButton = screen.getByText(/Adicionar Livro/i);
    fireEvent.click(addButton);

    expect(screen.getByText(/O Pequeno Príncipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Antoine De Saint-Exupéry/i)).toBeInTheDocument();
    expect(screen.getByText(/Uma história maravilhosa./i)).toBeInTheDocument();
    expect(screen.getByAltText(/Imagem do livro: O Pequeno Príncipe/i)).toHaveAttribute('src', 'https://example.com/book-image.jpg');
  });
});

describe('Book List Page - Testes', () => {

});

test('Testando a remoção de um livro', async () => {
  render(<App />);
  await waitFor(() => {
    const removeButtons = screen.queryAllByText(/Remover/i);
    expect(removeButtons).toHaveLength(10);

    const firstTitle = screen.getByText(/React Aprenda Praticando/i);
    expect(firstTitle).toBeInTheDocument();

    fireEvent.click(removeButtons[0]);
  });

  await waitFor(() => {
    const removeButtons = screen.queryAllByText(/Remover/i);
    expect(removeButtons).toHaveLength(9);

    expect(() => {
      screen.getByText(/React Aprenda Praticando/i);
    }).toThrow();
  });
});

test('Testando a edição de um livro', async () => {
  render(<App />);

  await waitFor(() => {
    const editButtons = screen.queryAllByText(/Editar/i);
    expect(editButtons).toHaveLength(10);

    const firstTitle = screen.getByText(/React Aprenda Praticando/i);
    expect(firstTitle).toBeInTheDocument();

    fireEvent.click(editButtons[0]);

    const updatedTitleInput = screen.getByLabelText(/Título/i);
    expect(updatedTitleInput).toHaveValue('React Aprenda Praticando');

    const updatedAuthorInput = screen.getByLabelText(/Autor/i);
    expect(updatedAuthorInput).toHaveValue('Mauricio Samy Silva');

    const updatedImgInput = screen.getByLabelText(/Link da Imagem/i);
    expect(updatedImgInput).toHaveValue('http://books.google.com/books/content?id=MWkOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');

    const updatedDescriptionInput = screen.getByLabelText(/Descrição/i);
    expect(updatedDescriptionInput).toHaveValue('React é uma biblioteca para a criação de sites, interfaces gráficas e aplicações web, criada pelo Facebook, e seu uso tem crescido muito, sendo usada por grandes empresas, como Netflix, Walmart e The New York Times. Neste livro, eminentemente prático, Maujor, com sua reconhecida didática, fornece ao leitor uma visão detalhada dos conceitos básicos e recursos da biblioteca React. Você aprenderá a desenvolver aplicativos React completos, passo a passo, desde o zero até a hospedagem em um servidor remoto. Cada capítulo apresenta um novo recurso do React, com exercícios práticos para consolidar os conceitos estudados. Destina-se a desenvolvedores com conhecimentos básicos de HTML, CSS3 e JavaScript, interessados na criação de sites tanto na área de design quanto na de desenvolvimento e programação. O livro também poderá ser útil como material de referência do React. A estrutura de pastas dos projetos desenvolvidos no livro encontra-se em https://github.com/Maujor/livro-react e o respectivo material de apoio aos projetos está disponível no site do livro em https://kwz.me/h1m.');

    const addBook = screen.queryAllByText(/Adicionar Livro/i);
    fireEvent.click(addBook[0]);

    expect(screen.getByText(/React Aprenda Praticando/i)).toBeInTheDocument();
    expect(screen.getByText(/Mauricio Samy Silva/i)).toBeInTheDocument();
    expect(screen.getByText(/React é uma biblioteca para a criação de sites,/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Imagem do livro: React Aprenda Praticando/i)).toHaveAttribute('src', 'http://books.google.com/books/content?id=MWkOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
  });
});
