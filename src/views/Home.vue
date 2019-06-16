<template>
  <div class="home">
    <ClipLoader :loading="loading" />
    <ul>
      <li
        v-for="post in posts"
        v-bind:key="post.data.name"
      >
        <router-link :to="post.data.permalink">{{ post.data.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import kebabCase from 'lodash-es/kebabCase'
import orderBy from 'lodash-es/orderBy'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { getAuthorizationHeaders, renewTokens } from '../utils/auth'

export default {
  name: 'home',
  components: {
    ClipLoader
  },
  data () {
    return {
      loading: false,
      posts: []
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      fetch(`${process.env.VUE_APP_REDDIT_ENDPOINT}/r/startups/search?q=share your startup&limit=100`, {
        headers: {
          'Authorization': getAuthorizationHeaders()
        }
      })
        .then(res => res.json())
        .then(res => {
          this.loading = false
          this.posts = res.data.children
          this.posts = orderBy(this.posts, ['data.created'], ['desc'])
        })
        .catch(error => console.log(error))
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  }
}
</script>

<style>
ul {
  list-style-type: none;
  padding: 15px;
}
ul li {
  padding: 10px 0;
}
</style>
