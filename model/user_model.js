/** implementing a user class  */

const { PrismaClient, Prisma } = require("@prisma/client");

// using prisma to access the db
const prisma = new PrismaClient();

// modules
const { GenerateUserToken } = require("../utils/jwt");

class User {
  fullName;
  lastName;
  phoneNumber;
  emailAddress;
  #password;

  constructor(fullname, lastname, phone_num, email_address, password) {
    this.fullName = fullname;
    this.lastName = lastname;
    this.phoneNumber = phone_num;
    this.emailAddress = email_address;
    this.#password = password;
  }

  /** generating the user token inside this private class and i used the user's email since it will be unqiue throughout db*/
  #generateUserToken() {
    return GenerateUserToken(this.email);
  }

  // hashing the user passwords
  #hash_password() {
    
  }

  signup_new_user() {
    return this.#generateUserToken();
  }
}

module.exports = { User };
