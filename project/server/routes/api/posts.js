const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

router.get('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send( await posts.find({ _id: new mongodb.ObjectID(req.params.id) }).toArray());
 // res.status(200).send({});
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017',
    {
      useNewUrlParser: true
    }
  );

  return client.db('test').collection('posts');
}

module.exports = router;