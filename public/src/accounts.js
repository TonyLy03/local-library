function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return [...accounts].sort((a, b) => a.name.last.localeCompare(b.name.last));
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((totalBorrows, book) => {
    return totalBorrows + book.borrows.filter(borrow => borrow.id === accountId).length;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  return books.filter(book => {
    const currentBook = book.borrows[0];
    return currentBook.id === accountId && !currentBook.returned;
  }).map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return { ...book, author };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
