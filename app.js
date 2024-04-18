import express from 'express';

import { authRoutes } from './routes/auth.routes';

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Welcome to http://localhost:${PORT} 🚀`);
});
