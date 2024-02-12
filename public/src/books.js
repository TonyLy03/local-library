function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter(book => book.borrows.some(borrow => !borrow.returned));
  const returned = books.filter(book => book.borrows.every(borrow => borrow.returned));
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.map(borrow => {
    const account = accounts.find(acc => acc.id === borrow.id);
    return {
      ...borrow,
      ...account,
    };
  }).slice(0, 10); // Limit the list to ten borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
