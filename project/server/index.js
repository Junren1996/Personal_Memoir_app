const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());


//open url for letting user get data
const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

//open url for letting user get data
const userdata = require('./routes/api/userdata');
app.use('/api/userdata', userdata);

//open url for letting user get data
const imgdata = require('./routes/api/imgdata');
app.use('/api/imgdata', imgdata);

const assdata = require('./routes/api/assdata');
app.use('/api/assdata', assdata);


//open port
const port = process.env.PORT || 5000;
//listen localhost:5000
app.listen(port,()=> console.log(`Server started on port ${port}`));

