import bcrypt from 'bcryptjs';

import { getDb } from '../data/database';

class User {
  constructor(email, password, fullName, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.address = {
      street,
      postal,
      city,
    };
  }

  async getUserWithSameEmail() {
    return await getDb().collection('users').findOne({ email: this.email });
  }

  async existingAlready() {
    const existingUser = await this.getUserWithSameEmail();
    return existingUser ? true : false;
  }

  async hasMatchingPassword(hashedPassword) {
    try {
      return await bcrypt.compare(this.password, hashedPassword);
    } catch (error) {
      throw new Error('Error comparing passwords: ' + error.message);
    }
  }

  async signUp() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      fullName: this.fullName,
      address: this.address,
    });
  }
}

export default User;
