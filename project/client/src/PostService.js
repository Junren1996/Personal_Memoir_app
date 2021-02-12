import axios from "axios";

const url = "http://localhost:5000/api/posts/";


//create class to get data from serve
class PostService {
  // get posts
  static getPosts() {
    return new Promise ((resolve,reject) => {
        axios.get(url).then((res) => {
            const data = res.data;
            resolve(
                data.map(post => ({ //json for each element
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


  //Create post
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }

  //delete post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

//export class
export default PostService;