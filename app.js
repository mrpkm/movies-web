const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('search', { movies: [], message: null });
});

app.post('/search', async (req, res) => {
  try {
    const { search } = req.body;
    const response = await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=YOUR_API_KEY`);
    const movies = response.data.Search || [];
    res.render('search', { movies, message: null });
  } catch (error) {
    res.render('search', { movies: [], message: 'Error fetching data. Please try again later.' });
  }
});

app.post('/favorite', (req, res) => {
  const { title, year, type, poster } = req.body;
  const movie = { title, year, type, poster };
  database.addFavorite(movie);
  res.redirect('/favorites');
});

app.get('/favorites', (req, res) => {
  const favorites = database.getFavorites();
  res.render('favorites', { favorites });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
