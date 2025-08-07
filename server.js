require('dotenv').config();

const express = require('express');
const app = express();

const hostname = process.env.HOST;
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to pearl server!');
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Press Ctrl+C to stop the server.');
    console.log('Press Ctrl+R to restart the server.');
    console.log('Waiting for requests...');
})