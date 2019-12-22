// Dynamic routes are ignored by the generate command.
const path = require('path')
const axios = require('axios')
const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
      }
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A blog server side render using Gist as API' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  css: [
    'assets/main.css'
  ],

  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/bootstrap-vue'
  ],

  plugins: [
    { src: '~plugins/ga.js', ssr: false },
    '~plugins/filters.js',
    '~plugins/i18n.js',
    '~/plugins/bootstrap-vue'
  ],

  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
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
