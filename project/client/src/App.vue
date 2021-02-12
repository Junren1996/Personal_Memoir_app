
<template>
 <!-- logo picture -->
  <div id="app">
    <img alt="Vue logo" src="./assets/uhlogo.jpg">
    <PostComponent />
  </div>
  
</template>

<script>

import PostComponent from './components/PostComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent
  }
}
</script>

<style>
body  {
  background-image: url("./assets/bg.jpg"); /*Background image */
  background-color: #cccccc;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
