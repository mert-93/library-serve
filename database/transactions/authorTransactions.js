const { FadabHelper } = require('fadab-mysql-helper');

class BookTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblAuthors';
  }
}

module.exports = BookTransactions;
