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
  import { mapState } from 'vuex'

  import GistArticle from '~/components/GistArticle.vue'

  export default {
    async fetch ({ store }) {
      await store.dispatch('LOAD_GIST_LIST', 'khriztianmoreno')
    },
    components: {
      GistArticle
    },
    computed: mapState([
      'gists'
    ])
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
