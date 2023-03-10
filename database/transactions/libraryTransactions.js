const {
  selectAsync,
  findOneAsync,
  FadabHelper
} = require('fadab-mysql-helper');

class LibraryTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblLibrary';
    this.vwName = 'vwUsersLibrariesList';
  }
  async selectViewAsync(selectOptions = null) {
    return selectAsync(this.vwName, selectOptions);
  }
  async findViewAsync(where) {
    return findOneAsync(this.vwName, where);
  }
}

module.exports = LibraryTransactions;
