<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <router-link to="/articles" v-if="isLogged">Articles</router-link> <template v-if="isLogged"> | </template> 
      <a type="button" @click.prevent="logout()" v-if="isLogged" style="cursor: pointer">
        Logout
      </a>
    </div>
    <center>
      <div class="container">
        <router-view/>
      </div>
    </center>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isLogged'
    ])
  },

  methods: {
    logout () {
      this.$store.dispatch('logout');
      this.$router.push({'name': 'Login'});
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
    width: 60%;
}
#articles {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#articles td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

#articles tr:nth-child(even){background-color: #f2f2f2;}

#articles tr:hover {background-color: #ddd;}

#articles th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4CAF50;
  color: white;
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
  cursor: pointer;
}

</style>