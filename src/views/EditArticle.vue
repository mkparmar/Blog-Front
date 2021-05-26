<template>
    <form @submit.prevent="submitArticle">

        <!-- <label for="title">Title*</label> -->
        <input type="text" id="title" name="title" placeholder="Title" v-model="article.title">

        <!-- <label for="body">Body*</label> -->
        <textarea type="text" id="body" name="body" placeholder="Body" v-model="article.body"></textarea>

        <input-tag v-model="article.tags" placeholder="Tags"></input-tag>
        
        <!-- <label for="country">Status*</label> -->
        <select id="status" name="status" v-model="article.status">
            <option value="1">Active</option>
            <option value="0">Inactive</option>
        </select>
        
        <button value="Back" class="flower" @click.prevent="back()">Back</button>
        <button value="Submit">Submit</button>

    </form>
</template>
<script>
import axios from 'axios'


export default {
  data() {
    return {  
      'article': {
        'title': '',
        'body': '',
        'tags': '',
        'status': 1
      }
    }
  },
  created() {
      this.getArticle();
  },
  methods: {
    getArticle() {
        axios.post('/get-article', {'id': this.$route.params.id})
        .then((response) => {
            if (response.status == 200) {
                let article = response.data.data;
                this.article.title = article.title;
                this.article.body = article.body;
                this.article.tags = article.tags.map(({tag}) => tag);
                this.article.status = article.status;
            }
        })
        .catch(() => {
        });
    },
    submitArticle() {
      if (!this.article.title || !this.article.body) {
        this.$toastr.e('Please fill all required fields');
        return false;
      }

      axios.post('/update-article', {'id': this.$route.params.id, 'details': this.article})
      .then((response) => {
        if (response.status == 200) {
          this.$toastr.s('Article updated succesfully');
          this.$router.push({'name': 'Articles'});
        }
      })
      .catch(() => {
      });
    },
    back() {
        this.$router.push({path: '/articles'});
    }
  }
}
</script>

<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 30%;
  background-color: #4CAF50;
  color: white;
  padding: 10px 10px;
  margin: 8px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.flower {
  background: cornflowerblue;
}
</style>