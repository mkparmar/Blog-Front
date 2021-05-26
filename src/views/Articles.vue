<template>
  <div class="articles">
    <h1>Articles</h1>
    <button class="button" style="margin: 1%" @click="newArticle()">+ Article</button>
    <table id="articles">
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Tags</th>
        <th>Status</th>
        <th>Action</th> 
      </tr>
       <tr v-for="article,index in articles" :key="index">
          <td>{{ article.id }}</td>
          <td>{{ article.title }}</td>
          <td>
            <label v-for="tag,index in getTags(article.tags)" :key="index" class="w3-tag w3-round w3-green" style="margin:3px">
              {{ tag }}
            </label>
          </td>
          <td>{{ article.status? 'Active' : 'Inactive' }}</td>
          <td> <button @click.prevent="viewArticle(article.id)">View</button> | <button @click.prevent="editArticle(article.id)">Edit</button> | <button @click="deleteArticle(article.id)">Delete</button></td>
        </tr>
    </table>
    <!-- Modal -->
    <div id="id01" class="w3-modal" :style="{'display': modal}">
      <div class="w3-modal-content">
        <div class="w3-container">
          <span @click="closeArticle()" class="w3-button w3-display-topright">&times;</span>
          <p><b>{{ article.title }}</b></p>
          <p>{{ article.body }}</p>
          <p>
            <label v-for="tag,index in article.tags" :key="index" class="w3-tag w3-round w3-green" style="margin:3px">
              {{ tag }}
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {  
      'articles': [],
      'modal': 'none',
      'article': {}
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      axios.post('/articles')
      .then((response) => {
          this.articles = response.data.data;
      })
      .catch(() => {
      });
    },
    logout() {
      this.$store.dispatch('logout')
    },
    newArticle() {
      this.$router.push({'name': 'NewArticle'});
    },
    deleteArticle(id) {
      axios.post('/delete-article', {'id': id})
      .then((response) => {
        if (response.status == 200) {
          this.$toastr.s('Article deleted succesfully');
          this.fetchArticles();
        } else {
          this.$toastr.e('Something went wrong');
        }  
      })
      .catch(() => {
      });
    },
    editArticle(id) {
      this.$router.push({'path': 'edit-article/'+id});
    },
    viewArticle(id) {
        axios.post('/get-article', {'id': id})
        .then((response) => {
          if (response.status == 200) {
              let article = response.data.data;
              this.article.title = article.title;
              this.article.body = article.body;
              this.article.tags = this.getTags(article.tags);
              this.modal = 'block';
          }
        })
        .catch(() => {
        });
        
    },
    closeArticle() {
      this.modal = 'none';
    },
    getTags(tags) {
      return tags.map(({tag}) => tag);
    }
  }
}
</script>

<style scoped>

</style>