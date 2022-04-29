const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.API_PORT;

// Load routes
const userRoutes = require('./src/routes/user.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});