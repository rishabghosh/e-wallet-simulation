class QueryMessage {
  constructor() {
    this.NameOfTable = "users";
    this.columnAmount = "amount";
    this.columnUsername = "username";
  }

  updateAmount(newAmount, username) {
    const result = [];
    result.push(`UPDATE ${this.NameOfTable}`);
    result.push(`SET ${this.columnAmount} = ${newAmount}`);
    result.push(`WHERE ${this.columnUsername} = "${username}";`);
    return result.join(" ");
  }

  requestAmount(username) {
    const result = [];
    result.push(`SELECT ${this.columnAmount} FROM ${this.NameOfTable}`);
    result.push(`WHERE ${this.columnUsername} = "${username}";`);
    return result.join(" ");
  }
}

module.exports = new QueryMessage();
