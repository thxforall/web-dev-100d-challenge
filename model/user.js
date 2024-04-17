import mongodb from 'mongodb';
import { getDb } from '../data/database.js';

const ObjectId = mongodb.ObjectId;

class User {
  constructor(email, password, id) {
    (this.email = email), (this.password = password);
  }

  async getUserByEmail() {
    const user = await db
      .getDb()
      .collection('users')
      .findOne({ email: this.email });

    return user;
  }

  async userExists() {
    const existingUser = await this.getUserByEmail();
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  async signUp() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const result = await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
    });

    return result;
  }

  async login(comparePassword) {
    const passwordsAreEqual = await bcrypt.compare(
      this.password,
      comparePassword,
    );
    return passwordsAreEqual;
  }
}

export { User };
