import express from 'express';

import blogRoutes from '../../routes/blog.js';

const app = express();

// Activate EJS view ençgine
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static('public')); // Serve static files (e.g. CSS files)

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render('500');
});

app.listen(3000);
