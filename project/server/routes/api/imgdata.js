const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path =require('path');
const fs = require('fs');
const mongodb = require('mongodb');
const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({extended:true}));
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fielddname+'-'+Date.now()+path.extname(file.originalname));
    }
})

var upload = multer({
    storage:storage
})

//mongodb

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url,{
    useUnifiedTopology:true,useNewUrlParser:true
},(err,client) =>{
    if(err) return console.log(err);

    db = client.db('img');
}
)


app.post("/uploadphoto",upload.single('myImage'),(req,res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');


    let buf;
    if (Buffer.from && Buffer.from !== Uint8Array.from) {
    buf = Buffer.from(encode_image,'base64');
    }else {
        if (typeof encode_image === 'number') {
          throw new Error('The "size" argument must be not of type number.');
        }
        buf = new Buffer(encode_image,'base64');
    }


    //define json object
    var finalImg ={
        contentType: req.file.mimetype,
        path:req.file.path,
        image:buf

    };

    //insert the image
    db.collection('image').insertOne(finalImg,(err,result)=>{
        console.log(result);

        if(err) return console.log(err);

        console.log("save to database");

        res.contentType(finalImg.contentType);

        res.send(finalImg.img);

    }
    )
    
})

router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
  });

  async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb://localhost:27017',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('test').collection('img');
  }


module.exports = router;