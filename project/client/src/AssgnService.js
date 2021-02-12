import axios from "axios";

const url = "http://localhost:5000/api/assdata/";

class AssgnService {
    // get posts
    static getPosts() {
      return new Promise ((resolve,reject) => {
          axios.get(url).then((res) => {
              const data = res.data;
              resolve(
                  data.map(post => ({
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

export default AssgnService;