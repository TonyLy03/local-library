function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => count + (book.borrows.some(borrow => !borrow.returned) ? 1 : 0), 0);
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((counts, book) => {
    book.genre in counts ? counts[book.genre].count++ : (counts[book.genre] = { name: book.genre, count: 1 });
    return counts;
  }, {});

  const sortedGenres = Object.values(genreCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedGenres;
}

function getMostPopularBooks(books) {
  const sortedBooks = books
    .map(book => ({ name: book.title, count: book.borrows.length })) // Exclude unwanted properties
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedBooks;
}

function getMostPopularAuthors(books, authors) {
  const authorBorrows = authors.map(author => {
    const authorBooks = books.filter(book => book.authorId === author.id);
    const count = authorBooks.reduce((count, book) => count + book.borrows.length, 0);
    return { name: `${author.name.first} ${author.name.last}`, count }; // Exclude unwanted properties
  });

  const sortedAuthors = authorBorrows.sort((a, b) => b.count - a.count).slice(0, 5);

  return sortedAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
