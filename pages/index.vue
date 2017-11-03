<template>
  <section>
    <div class="main-container">
      <div class="blog-posts">
        <gist-article :key="item.id" v-for="(item, index) in gists" :gist="item" />
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  import GistArticle from '~/components/GistArticle.vue'

  export default {
    data () {
      return { gists: [] }
    },
    async asyncData ({ params }) {
      const { data } = await axios.get('https://api.github.com/users/khriztianmoreno/gists')
      return { gists: data }
    },
    components: {
      GistArticle
    }
  }
</script>

<style>
  .main-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 30vh;
  }
</style>
