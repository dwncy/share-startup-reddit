<template>
  <div class="detail">
    <ClipLoader :loading="loading" />
    <ul class="feed-list">
      <li
        v-for="feed in feeds"
        v-bind:key="feed.data.name"
        v-html="unescape(feed.data.body_html)"
        class="feed-item"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import unescape from 'lodash-es/unescape'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'detail',
  props: ['title'],
  components: {
    ClipLoader
  },
  data () {
    return {
      loading: false,
      feeds: []
    }
  },
  methods: {
    unescape(body) {
      return unescape(body)
    },
    fetchData() {
      this.loading = true

      fetch(`${process.env.VUE_APP_REDDIT_ENDPOINT}/${this.title}?limit=100`, {
        headers: {
          'Authorization': 'Bearer 287784095252-YSnTQlhMwFYrXDMvrl4-NdZaLJs'
        }
      })
        .then(res => res.json())
        .then(res => {
          this.loading = false
          this.feeds = res[1].data.children
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
.feed-list {
  list-style-type: none;
  padding: 15px;
}
.feed-item {
  padding: 30px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
.feed-item p {
  margin: 0;
}
</style>
