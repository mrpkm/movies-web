const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MRpk@8065',
    database: 'movies'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
console.log("err of connecting database")
    }else{
        console.log('Connected to MySQL database');
    }
});

// Create favorites table if not exists
connection.query(`CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  year VARCHAR(10),
  type VARCHAR(50),
  poster VARCHAR(255)
)`, (err, result) => {
    if (err) throw err;
    console.log('Favorites table created');
});

// Add favorite movie/TV show to the database
const addFavorite = (movie) => {
    const { title, year, type, poster } = movie;
    const sql = 'INSERT INTO favorites (title, year, type, poster) VALUES (?, ?, ?, ?)';
    connection.query(sql, [title, year, type, poster], (err, result) => {
        if (err) throw err;
        console.log('Favorite added:', result);
    });
};

// Get all favorite movies/TV shows from the database
const getFavorites = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM favorites';
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = { addFavorite, getFavorites };
