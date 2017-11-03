<template>
  <gist-article-detail :gist='gist' />
</template>

<script>
  import { mapState } from 'vuex'

  import GistArticleDetail from '~/components/GistArticleDetail.vue'

  export default {
    components: {
      GistArticleDetail
    },
    head () {
      return {
        title: `${this.gist.description} || Gixt Blog`,
        meta: [
          { hid: 'description', name: 'description', content: 'A blog server side render using Gist as API' }
        ]
      }
    },
    computed: mapState([
      'gist'
    ]),
    async fetch ({ store, params }) {
      await store.dispatch('LOAD_GIST', params.id)
    }
  }
</script>

<style>

</style>
