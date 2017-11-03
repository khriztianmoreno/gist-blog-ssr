// Dynamic routes are ignored by the generate command.
const axios = require('axios')
const bodyParser = require('body-parser')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'gist-blog-ssr',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  css: ['~/assets/main.css'],

  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/bootstrap-vue'
  ],

  plugins: [
    '~plugins/filters.js',
    '~plugins/i18n.js'
  ],

  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // Api middleware
    '~/api'
  ],

  generate: {
    routes: function () {
      return axios.get('https://api.github.com/users/khriztianmoreno/gists')
        .then((res) => {
          return res.data.map((gist) => {
            return '/post/' + gist.id
          })
        })
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
