<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="email" name="email" placeholder="Email" v-model="email">
      <br><br>
      <input type="password" name="password" placeholder="Password" v-model="password">
      <br><br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  beforeMount() {
    if(this.$store.state.user) {
      this.$router.push({ name: 'Articles' });
    } else {
      this.$router.push({ name: 'Login' });
    }
  },
  methods: {
    login () {
      
      if (!this.email || !this.password) {
        this.$toastr.e('Please fill all required fields');
        return false;
      }

      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          if(!this.$store.state.user) {
            this.$toastr.e('These credentials do not match our records');
          } else {
            this.$router.push({ name: 'Articles' });
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>