import mongodb from 'mongodb';

import { getDb } from '../data/database.js';

const ObjectId = mongodb.ObjectId;

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAll() {
    const posts = await getDb().collection('posts').find().toArray();
    return posts;
  }

  async fetch() {
    if (!this.id) {
      return;
    }
    const postDocument = await getDb()
      .collection('posts')
      .findOne({ _id: this.id });
    this.title = postDocument.title;
    this.content = postDocument.content;
  }

  async save() {
    let result;
    if (this.id) {
      result = await getDb()
        .collection('posts')
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } },
        );
    } else {
      result = await getDb()
        .collection('posts')
        .insertOne({ title: this.title, content: this.content });
    }

    return result;
  }

  async delete() {
    if (!this.id) {
      return;
    }
    const result = await getDb()
      .collection('posts')
      .deleteOne({ _id: this.id });
    return result;
  }
}

export { Post };
