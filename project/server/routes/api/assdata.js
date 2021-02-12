const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

module.exports = router;


//get data from mongodb
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb://localhost:27017',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('test').collection('assignment');
  }
  