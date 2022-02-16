/** implementing a user class  */
const { genSaltSync, hashSync } = require("bcryptjs");
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
  hash_password() {
    // generate a salt, which
    const salt = genSaltSync(parseInt(process.env.SALT));
    const hashPassword = hashSync(this.#password, salt);
    return hashPassword;
  }

  //add to db
  async #insert_to_database() {
    return await prisma.User.create({
      data: {
        fullName: this.fullName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        emailAddress: this.emailAddress,
        password: this.hash_password(),
      },
    });
  }

  async signup_new_user() {
    try {
      const user = await this.#insert_to_database();
      console.log(user);
      return {
        id: user.id,
        token: this.#generateUserToken(),
        email: this.emailAddress,
      }
    } catch (e) {
      return e;
    }
  }
}

module.exports = { User };
