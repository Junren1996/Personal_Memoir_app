<template>

  <div class="container" >
    <h1> Personal Journal Web Application </h1>
     <!-- Show personal picture from folder -->
    <img alt="Vue logo" src="../assets/person.jpg">
     <!-- get data from table user -->
    <h1 v-for="ur in user" 
    v-bind:item="ur"
      v-bind:key="ur._id">Hi, {{ur.name}}</h1>
       <!-- click to show help describe -->
    <button v-on:click="gethelp" class="button"> FAQ (Introduce)</button>
    <ul v-for="(help, index) in helps"
    v-bind:item="help"
      v-bind:index="index"
      v-bind:key="help._id">
     <li>{{help.help}}</li>
     </ul>
    <div class="create-post">
       <!-- create new journal -->
      <label for="create-post">New Journal：</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a new journal">
      <button v-on:click="createPost" class="button button2"> Post</button>
    </div>

    <hr>
     <!-- showing journal -->
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deletePost(post._id)"
      >
      {{`${post.createdAt}`}}
      <p class="text">{{ post.text}} </p>
      </div>
    </div>

       <!-- create table for database assignment table -->
      <h2>CIS 4339 Assignment Reminder</h2>
    <table id="customers">
        <tr>
       <th>Homeworks......</th>
      <th>Due Date</th>
        <th>Score</th>
      </tr>
    </table>
 <!--for each element put in different rows  -->
      <div class="posts-container"
      v-for="(assignment1, index) in assignments"
      v-bind:item="assignment1"
      v-bind:index="index"
      v-bind:key="assignment1._id">
      <table id="customers">
      <tr>
       <th> {{assignment1.assignment}} </th>
      <th>{{assignment1.Due}}</th>
        <th>{{assignment1.score}}</th>
      </tr>
      
      </table>
       <!-- end table -->
    </div>
    <p></p>
     <!-- calculate the average score -->
    <button v-on:click="getScore" class="button button3"> Get Assignment Average</button>
    <p> 
    <span class="label11"
     v-if="average!=0">The Assignment average is {{average}} </span>
    </p>
  <div class="footer">
    <p>CIS 4339 Project</p>
  </div>

  </div>
  
</template>

<script>
//get classes
import PostService from '../PostService';
import userService from '../userService';
import AssgnService from '../AssgnService';

//default export
export default {
  name: 'PostComponent',
  data(){
    return{
      posts: [],
      error: '',
      text: '',
      helps:[],
      user: [],
      assignments: [],
      average:0
    }
  },
  async created(){ //default create data
    try{
      this.posts = await PostService.getPosts(); //get data from postservice
    }
    catch(err){
      this.error = err.message;
    }


    try{
      this.user = await userService.getPosts(); //get data from userservice
    }
    catch(err){
      this.error = err.message;
    }

    try{
      this.assignments = await AssgnService.getPosts(); //get data from assignment service
    }
    catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async getScore(){ //function to calculate assignment score average
      
      this.assignments = await AssgnService.getPosts();

    this.assignments.forEach(element => {
      this.average = (this.average + element.score);
    });
    this.average = this.average/6;
    },
    async gethelp(){//show help describe text
      this.helps = [
        {"help": "This is my personal web application for event reminder or personal journal."},
        {"help": "How to Create: Fill in the box and click post button."},
        {"help": "How to Delete: double clickthe post box to delete old post."},
        {"help": "How to calculate: click button to get assignment average"},
        {"help": "Why get error: Input empty journal will get an error, or Internet Dissconnect"}

      ];
    },
    async createPost(){
      if(this.text!=''){
      await PostService.insertPost(this.text);
      }else{
        this.error = "You must say something"; //error when input empty
      }
      this.posts = await PostService.getPosts();
    },
     async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts(); //delete post
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-position: inside;
  background: #ff9999;
  padding: 20px;
}

.label11 {
  background-color: #ff9800;
  color: white;
  padding: 8px;
  font-family: Arial;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}

/* Style the footer */
.footer {
  background-color: lightblue;;
  padding: 10px;
  text-align: center;
  color: white;
}

body
{
  background-image: url("../assets/bg.png");
} 
input[type=text], select {
  width: 75%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.button2 {background-color: #008CBA;} /* Blue */
.button3 {background-color: #f44336;} /* Red */ 
.button4 {background-color: #e7e7e7; color: black;} /* Gray */ 
.button5 {background-color: #555555;} /* Black */

div.container {
max-width: 800px;
margin: 0 auto;
}

p.error {
border: 1px solid #ff5b5f;
background-color: #ffc5c1;
padding: 10px;
margin-bottom: 15px;
}

div.post {
position: relative;
border: 1px solid #5bd658;
background-color: #FFFFE0;
padding: 10px 10px 30px 10px;
margin-bottom: 15px;
}

div.created-at {
position: absolute;
top: 0;
left: 0;
padding: 5px 15px 5px 15px;
background-color: darkgreen;
color: white;
font-size: 13px;
}

p.text {
font-size: 22px;
font-weight: 700;
margin-bottom: 0;
}
</style>
