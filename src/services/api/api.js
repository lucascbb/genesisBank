export async function getBooks () {
  try {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=programming';
    const response = await fetch(url);
    const booksApi = response.json();
    return booksApi;
  } catch (error) {
    console.error(`Erro na API(Error 500): ${error.message}`);
  }
}
