const {
  selectAsync,
  findOneAsync,
  FadabHelper
} = require('fadab-mysql-helper');

class AuthorTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblBooks';
    this.vwName = 'vwBookList';
  }

  async selectViewAsync(selectOptions = null) {
    return await selectAsync(this.vwName, selectOptions);
  }

  async findViewAsync(where) {
    return findOneAsync(this.vwName, where);
  }
}

module.exports = AuthorTransactions;
