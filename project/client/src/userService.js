import axios from "axios";

const url = "http://localhost:5000/api/userdata/";


//create class to get data from serve
class userService {
    // get posts
    static getPosts() {
      return new Promise ((resolve,reject) => {
          axios.get(url).then((res) => {
              const data = res.data;
              resolve(
                  data.map(post => ({ // for each json 
                      ...post,
                      createdAt: new Date(post.createdAt)
                  }))
              );
          })
          .catch((err)=> {
              reject(err);
          })
          
      });
  }

}

//export class
export default userService;