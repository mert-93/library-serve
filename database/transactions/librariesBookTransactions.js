const {
  selectAsync,
  findOneAsync,
  FadabHelper
} = require('fadab-mysql-helper');

class LibrariesBookTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblLibrariesBooks';
    this.vwName = 'vwLibrariesBooksList';
  }

  async selectViewAsync(selectOptions = null) {
    return selectAsync(this.vwName, selectOptions);
  }

  async findViewAsync(where) {
    return findOneAsync(this.vwName, where);
  }
}

module.exports = LibrariesBookTransactions;
