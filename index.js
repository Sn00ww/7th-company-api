const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.API_PORT;

// Load routes
const userRoutes = require('./src/routes/user.route');
const discordRoutes = require('./src/routes/discord.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/discord/', discordRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});