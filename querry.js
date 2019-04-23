const SPACE = " ";

class QueryMessage {
  constructor() {
    this.NameOfTable = "users";
    this.amount = "amount";
    this.username = "username";
    this.password = "password";
    this.name = "name";
    this.initialAmount = 0;
  }

  updateAmount(newAmount, username) {
    const result = [];
    result.push(`UPDATE ${this.NameOfTable}`);
    result.push(`SET ${this.amount} = ${newAmount}`);
    result.push(`WHERE ${this.username} = "${username}";`);
    return result.join(SPACE);
  }

  requestAmount(username) {
    const result = [];
    result.push(`SELECT ${this.amount} FROM ${this.NameOfTable}`);
    result.push(`WHERE ${this.username} = "${username}";`);
    return result.join(SPACE);
  }

  requestPassword(username) {
    const result = [];
    result.push(`SELECT ${this.password} FROM ${this.NameOfTable}`);
    result.push(`WHERE ${this.username} = "${username}";`);
    return result.join(SPACE);
  }

  checkUsername(username) {
    const result = [];
    result.push(`SELECT ${this.username} FROM ${this.NameOfTable}`);
    result.push(`WHERE ${this.username} = "${username}";`);
    return result.join(SPACE);
  }

  insertCredentials(username, password, name) {
    const result = [];
    result.push(`INSERT INTO ${this.NameOfTable}`);
    result.push(
      `(${this.username}, ${this.password}, ${this.name}, ${this.amount})`
    );
    result.push(
      `VALUES ("${username}", "${password}", "${name}", ${this.initialAmount})`
    );

    return result.join(SPACE);
  }

  queryProfileDetails(username) {
    const result = [];
    result.push(`SELECT ${this.name}, ${this.amount} FROM ${this.NameOfTable}`);
    result.push(`WHERE ${this.username} = "${username}";`);
    return result.join(SPACE);
  }
}

module.exports = new QueryMessage();
