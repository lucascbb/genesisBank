import React from 'react';
import userEvent from '@testing-library/user-event';
import { getBooks } from '../services/api/api';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import mockBook from './mockBook';

describe('BookList - tests', () => {
  test('Verificando se pagina inicial esta renderizando da forma correta', async () => {
    render(<App />);

    const loadingSpinner = screen.getByRole('progressbar');
    const loadingText = screen.getByText('Carregando');

    expect(loadingSpinner).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});

describe('Book List Page - Testes', () => {
  test('Testando se o título H1 esta presente na tela', () => {
    const { getByText } = render(<App />);

    const titleElement = getByText(/Book House/i);
    expect(titleElement).toBeInTheDocument();
  });
});

describe('Initial Page', () => {
  it('should render the header elements correctly', async () => {
    const { getByAltText, getByText } = render(<App />);

    await waitFor(() => {
      const logoImage = getByAltText('Logo do site');
      const heading = getByText('Book House');

      expect(logoImage).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
    });
  });
});

describe('FETCH - API', () => {
  it('Verificando se o FETCH da API esta funcionando correttamente', () => {
    expect(typeof getBooks).toBe('function');
  });

  it('Verificando se a API retorna os dados corretos.', async () => {
    expect(await getBooks().items).toEqual(mockBook[0]);
  });

  it('Verificando se a API retorna todos os books', async () => {
    expect(await getBooks().items).not.toEqual(mockBook);
  });

  it('Verificando se a API retorna todos os books', async () => {
    expect(await getBooks().items).not.toEqual(mockBook);
  });
});

test('Testando se os livros sao renderizados na tela', async () => {
  render(<App />);

  await waitFor(() => {
    const firstTitle = screen.getByText(/React Aprenda Praticando/i);
    expect(firstTitle).toBeInTheDocument();

    const firstAuthor = screen.getByText(/Mauricio Samy Silva/i);
    expect(firstAuthor).toBeInTheDocument();
  });
});
