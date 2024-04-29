import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

function createSessionStore() {
  const MongoDBStoreSession = MongoDBStore(session);

  const store = new MongoDBStoreSession({
    uri: 'mongodb://localhost:27017',
    databaseName: 'online-shop',
    collection: 'sessions',
  });

  return store;
}

export function createSessionConfig() {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}
