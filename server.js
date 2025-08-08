require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const hostname = process.env.HOST;
const port = process.env.PORT;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB ✅ 😊'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


const postSchema = new mongoose.Schema({
  caption:{type:String, required:true},
  imageUrl:{type:String, required:true},
});

const Post = mongoose.model('Post', postSchema);


app.get('/', (req, res) => {
  res.send('Welcome to pearl server!');
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { caption, imageUrl } = req.body;
  const newPost = new Post({ caption, imageUrl });
  await newPost.save();
  res.status(201).json(newPost);
});


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Press Ctrl+C to stop the server.');
    console.log('Press Ctrl+R to restart the server.');
    console.log('Waiting for requests...');
})