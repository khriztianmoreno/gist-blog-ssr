<template>
  <section>
    <Search />
    <div class="main-container">
      <div class="blog-posts">
        <gist-article :key="item.id" v-for="(item, index) in gists" :gist="item" />
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  import Search from '~/components/Search.vue'
  import GistArticle from '~/components/GistArticle.vue'

  export default {
    components: {
      Search,
      GistArticle
    },
    beforeMount () {
      this.$store.dispatch('LOAD_GIST_LIST', this.username ? this.username : 'khriztianmoreno')
    },
    computed: mapState([
      'gists',
      'username'
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
