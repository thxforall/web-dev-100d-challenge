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

  async signUp() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      fullName: this.fullName,
      address: this.address,
    });
  }

  async userCheck() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const existingUser = await getDb().collection('users').findOne({
      email: this.email,
      password: hashedPassword,
    });

    // user check id and password return home
    if(!existingUser) {
        return;
    }


    // session
  }

    // logout
    
    // user check with signup

    
}

export default User;
