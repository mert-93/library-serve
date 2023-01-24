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
  selectViewAsync(selectOptions = null) {
    return selectAsync(this.vwName, selectOptions);
  }
  findViewAsync(where) {
    return findOneAsync(this.vwName, where);
  }
}

module.exports = LibraryTransactions;
