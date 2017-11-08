# Build a Server Rendered Vue.js App with Nuxt and Vuex
Vue.js has a first-class ecosystem to help construct Vue.js apps. This includes Nuxt.js which enables server-rendered applications and a page-based approach.

This workshop will start with an empty app and walk through how to use Vue.js for building the app, Nuxt.js for organizing the app, and Vuex for managing state.

![Nuxt Gists](https://raw.githubusercontent.com/khriztianmoreno/gist-blog-ssr/master/VueNuxtGists.png "Nuxt Gists")

## Prerequisities

To start this workshop you must have previously installed on your computer [nodejs](https://www.nodejs.org/)

*Rate Limiting*

*For requests using Basic Authentication or OAuth, you can make up to 5000 requests per hour. Authenticated requests are associated with the authenticated user, regardless of whether Basic Authentication or an OAuth token was used. This means that all OAuth applications authorized by a user share the same quota of 5000 requests per hour when they authenticate with different tokens owned by the same user.*

*For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.*

```sh
curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com
```

## Translate
You can consult the guide in both Spanish and English.

- [Spanish](ES_README.md)
- [English](README.md)

## Workshop

This guide aims to be an aid to carry out the workshop autonomously.

1. [Setup Vue-CLI](#1-setup-vue-cli)
2. [Layout & Components](#2-layout--components)
3. [Pages & Routing](#3-pages--routing)
4. [Modules](#4-modules)
5. [Async Data](#5-async-data)
6. [Plugins](#6-plugins)
7. [Vuex Store](#7-vuex-store)
8. [ServerMiddleware vs Middleware](#8-servermiddleware-vs-middleware)
9. [Utils](#9-utils)
10. [Deployment](#10-deployment)
11. [Challenge](#11-mortar_board-challenge)
12. [Thanks](#12-thanks)


### 1. Setup Vue-CLI

The Vue-CLI helps you to quickly and easily setup new Vue projects. Nuxt.js is a library that helps you build server-rendered Vue.js applications. This lesson shows you how to use the nuxt/starter template with the Vue-CLI to quickly start a new project.

**Intall Vue-CLI**

```sh
$ npm install -g vue-cli
```

**Usage**

```sh
$ vue init <template-name> <project-name>
```

*Using the startup template of Nuxt.js*

```sh
$ vue init nuxt-community/starter-template gist-blog-ssr
```

then install the dependencies:

```sh
$ cd gist-blog-ssr
$ npm install
```

and launch the project with:

```sh
$ npm run dev
```

The application is now running on http://localhost:3000

*To see these steps complete, you can change to the `1-setup` branch in this repository.*

### 2. Layout & Components

You can isolate parts of templates you want to re-use into components, but you can also reuse those components across pages using layouts. This lesson walks you through creation a navigation component then extracting it out into the default layout. Este punto lo guía a través de la creación de un componente de `Header` y `Footer` para luego ser utilizado en el diseño predeterminado.

#### Header Component

In the `components` folder we will create a file `MyHeader.vue` with the following content:

``` vue
<template>
  <header class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="breadcrumb">
            <li><a href="#">Home</a></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h2>Welcome to Gist Blog!!</h2>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">

  .page-header {
    background-color: #35495f;
    border-bottom: 5px solid #3c8070;
    border-top: 5px solid #3c8070;
    margin: 0 0 35px 0;
    min-height: 50px;
    padding: 20px 0;
    position: relative;
    text-align: left;
    .breadcrumb {
      background: none;
      margin: -3px 0 0;
      padding: 0;
      > li {
        text-shadow: none;
      }
      &.breadcrumb-valign-mid {
        position: absolute;
        top: 40%;
        right: 20px;
      }
    }
    h2 {
      border-bottom: 5px solid #3c8070;
      color: #FFF;
      display: inline-block;
      font-weight: 200;
      margin: 0 0 -25px;
      min-height: 37px;
      font-size: 2.6em;
      line-height: 46px;
      padding: 0 0 17px;
      position: relative;
      span {
        color: #999da3;
        display: block;
        font-size: 0.6em;
        font-weight: 300;
        margin: -10px 0 0;
      }
    }
  }

  .page-header-no-title-border h1 {
    border: 0;
  }

  /* Page Header - More Padding */

  .page-header-more-padding {
    padding: 35px 0;
  }

  /* Page Header - Color */

  .page-header-color {
    background-color: #F7F7F7;
    border-bottom: 5px solid #F4F4F4;
    border-top: none;
    h1 {
      border-bottom: none;
      color: #1d2127;
      font-size: 2.3em;
      span {
        opacity: 0.65;
      }
    }
    .breadcrumb > .active {
      opacity: 0.65;
    }
  }

  /* Page Header - Light */

  .page-header-light {
    background-color: #F7F7F7;
    border-bottom: 5px solid #F4F4F4;
    border-top: none;
    h1 {
      border-bottom: none;
      color: #1d2127;
      font-size: 2.3em;
    }
  }

  /* Page Header - Reverse */

  .page-header-reverse {
    text-align: right;
    .breadcrumb {
      float: left;
      left: 20px;
      right: auto;
      margin-top: -10px;
      &.breadcrumb-valign-mid {
        float: left;
        left: 20px;
        right: auto;
        margin-top: -10px;
      }
    }
  }

  /* Page Header - Parallax */

  .page-header.parallax {
    margin: 0 0 35px;
    padding: 180px 0 60px;
  }

  .page-header-center {
    text-align: center;
    .breadcrumb {
      margin: 15px 0 0;
    }
  }

  /* Page Header Custom Background */

  .page-header-custom-background {
    padding: 45px 0;
    background-repeat: repeat;
    background-color: transparent;
    border-top: 0;
    border-bottom: 0;
    h1 {
      color: #FFF;
      border: 0;
      span {
        color: #FFF;
        opacity: 0.7;
      }
    }
    .breadcrumb.breadcrumb-valign-mid {
      top: 36%;
      li.active {
        color: #FFF;
        opacity: 0.7;
      }
      a {
        color: #FFF;
      }
    }
  }

  /* Page Header Custom - Create your Own */

  .page-header.custom-product {
    // background-image: url('./assets/img/custom-header-bg.jpg');
    background-repeat: repeat;
    background-color: #999;
    border-top: 5px solid #888;
    overflow: hidden;
    .row {
      position: relative;
    }
    p.lead {
      color: #E8E8E8;
    }
    img {
      bottom: -47px;
      position: relative;
    }
    h1 {
      color: #FFF;
      margin-bottom: 10px;
      margin-top: 30px;
      border: 0;
    }
  }

  /* Responsive */

  @media (max-width: 991px) {
    .page-header .breadcrumb {
      float: none !important;
      position: static !important;
    }
  }

  @media (max-width: 479px) {
    .page-header {
      padding: 16px 0;
      h1 {
        line-height: 37px;
      }
    }
  }
</style>
```

#### Footer Component

In the same folder `components` we create the file `MyFooter.vue` with the following content:

``` vue
<template>
  <footer id="footer">
    <div class="footer-copyright">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <p>
              <a href="http://twitter.com/jsconfco">@jsconfco</a> ©
              Copyright 2017. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>


<style lang="scss" scoped>
  #footer {
    font-size: 1.1em;
    clear: both;
    .logo {
      display: block;
      &.mb-xl {
        margin-bottom: 12px;
      }
    }
    .footer-copyright {
      background-color: #35495f;
      border-top: 5px solid #3c8070;
      margin-top: 40px;
      padding: 30px 0 10px;
      p {
        color: #ffffff;
        margin: 0;
        padding: 0;
      }
    }
  }
</style>
```

#### Default Layout

Now we are going to use these two components created previously in our default design, in the `layouts` folder we find the file `default.vue` we overwrite the whole file with the following content:

``` vue
<template>
  <div class="body">
    <div role="main" class="main">
      <!-- header component -->
      <my-header />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nuxt/>
          </div>
        </div>
      </div>
    </div>
    <!-- footer component -->
    <my-footer />
  </div>
</template>

<script>
  import MyHeader from '~/components/MyHeader.vue'
  import MyFooter from '~/components/MyFooter.vue'

  export default {
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>

```

*Important:*

It is necessary to install the dependencies `sass-loader` and ` node-sass` in order to use *SASS* as a css preprocessor in our project, inside the project root in a terminal run: `npm i -D sass-loader node-sass`

*To see these steps complete, you can change to `2-layout-components` branch in this repository.*

### 3. Pages & Routing

**Nuxt.js** automatically generates the [vue-router](https://github.com/vuejs/vue-router) configuration based on your file tree of Vue files inside the pages directory.

We are going to have this file tree in our application:

```
pages/
--| post/
-----| _id.vue
-----| index.vue
-----| create.vue
--| index.vue
```

will automatically generate:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'post-id',
      path: '/post/:id?',
      component: 'pages/post/_id.vue'
    },
    {
      name: 'post',
      path: '/post',
      component: 'pages/post/index.vue'
    },
    {
      name: 'post-create',
      path: '/post/create',
      component: 'pages/post/create.vue'
    }
  ]
}
```

#### Pages Index

Vue-CLI creates by default an `index.vue` file in the `pages` folder, we will overwrite its contents with the following:

``` vue
<template>
  <article class="post post-large">
    <div>
      <div class="post-date">
        <span class="day">27</span>
        <span class="month">Sep</span>
      </div>
      <div class="post-content">
        <h2>
          <a href="/post/1" class="">Talk: Estructurando la base de nuestro proyecto</a>
        </h2>
        <p>Talk: Estructurando la base de nuestro proyecto</p>
        <div class="post-meta">
          <span>
            <i class="fa fa-user"></i>
            By
            <a href="https://github.com/khriztianmoreno" target="_blank">khriztianmoreno</a>
          </span>
          <span>
            <i class="fa fa-comments"></i>
            <a href="#" target="_blank">0 Comments</a>
          </span>
          <a href="/post/1" class="btn btn-xs btn-primary pull-right">Read More...</a>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  $primary-color: #41b883;

  .pagination {
    margin: -10px 0 20px;
  }

  .btn-primary {
    background-color: $primary-color;
    border-color: $primary-color;
  }

  article {
    border-bottom: 1px solid #DDD;
    margin-bottom: 50px;
    padding-bottom: 10px;

    &.post {
      h2 a {
        text-decoration: none;
      }
      .post-meta {
        font-size: 0.9em;
        margin-bottom: 7px;
        >span {
          display: inline-block;
          padding-right: 8px;
        }
        i {
          margin-right: 3px;
        }
      }
      .post-date {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        float: left;
        margin-right: 10px;
        text-align: center;
        .month {
          background-color: $primary-color;
          border-radius: 0 0 2px 2px;
          box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.07) inset;
          color: #FFF;
          font-size: 0.9em;
          padding: 0 10px 2px;
        }
        .day {
          background: #F4F4F4;
          border-radius: 2px 2px 0 0;
          color: $primary-color;
          display: block;
          font-size: 16px;
          font-weight: 500;
          font-weight: bold;
          padding: 10px;
        }
      }
    }
    &.post-large {
      margin-left: 60px;
      h2 {
        margin-bottom: 5px;
      }
      .post-date {
        margin-left: -60px;
      }
    }
  }
</style>
```

#### Pages Post - Index

Create a `post` folder inside `pages` and create the file `index.vue` that will have the same content of the `index.vue` of the root, only for practical purposes:

``` vue
<template>
  <article class="post post-large">
    <div>
      <div class="post-date">
        <span class="day">27</span>
        <span class="month">Sep</span>
      </div>
      <div class="post-content">
        <h2>
          <a href="/post/1" class="">Talk: Estructurando la base de nuestro proyecto</a>
        </h2>
        <p>Talk: Estructurando la base de nuestro proyecto</p>
        <div class="post-meta">
          <span>
            <i class="fa fa-user"></i>
            By
            <a href="https://github.com/khriztianmoreno" target="_blank">khriztianmoreno</a>
          </span>
          <span>
            <i class="fa fa-comments"></i>
            <a href="#" target="_blank">0 Comments</a>
          </span>
          <a href="/post/1" class="btn btn-xs btn-primary pull-right">Read More...</a>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  $primary-color: #41b883;

  .pagination {
    margin: -10px 0 20px;
  }

  .btn-primary {
    background-color: $primary-color;
    border-color: $primary-color;
  }

  article {
    border-bottom: 1px solid #DDD;
    margin-bottom: 50px;
    padding-bottom: 10px;

    &.post {
      h2 a {
        text-decoration: none;
      }
      .post-meta {
        font-size: 0.9em;
        margin-bottom: 7px;
        >span {
          display: inline-block;
          padding-right: 8px;
        }
        i {
          margin-right: 3px;
        }
      }
      .post-date {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        float: left;
        margin-right: 10px;
        text-align: center;
        .month {
          background-color: $primary-color;
          border-radius: 0 0 2px 2px;
          box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.07) inset;
          color: #FFF;
          font-size: 0.9em;
          padding: 0 10px 2px;
        }
        .day {
          background: #F4F4F4;
          border-radius: 2px 2px 0 0;
          color: $primary-color;
          display: block;
          font-size: 16px;
          font-weight: 500;
          font-weight: bold;
          padding: 10px;
        }
      }
    }
    &.post-large {
      margin-left: 60px;
      h2 {
        margin-bottom: 5px;
      }
      .post-date {
        margin-left: -60px;
      }
    }
  }
</style>
```

#### Pages Post - Create

Inside the `post` folder create the file `create.vue` and add the following content:

``` vue
<template>
  <div>
    <form name="form">
      <div class="form-group">
        <label for="name">Title</label>
        <input type="text" id="name" placeholder="Enter title" required="required" value="" class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <div class="row">
          <div class="col-sm-6">
            <textarea name="description" rows="10" value="# hello"></textarea>
          </div>
          <div class="col-sm-6">
            <div id="editor-result">
              <h1 id="hello">hello</h1>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  #editor {
    margin: 0;
    height: 100%;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;

    &-result {
      border: 1px solid;
      height: 100%;
      padding: 10px;
    }
  }

  textarea,
  #editor div {
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: "Monaco", courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }
</style>
```

#### Pages Post - Detail

To define a dynamic route with a param, you need to define a .vue file OR a directory prefixed by an underscore. That's why we're going to create the `_id.vue` file with an empty template for now.

``` vue
<template>
  <h1>Detalle</h1>
</template>
```

*To see these steps complete, you can change to the `3-pages-routing` branch in this repository.*

### 4. Modules

Nuxt provides a higher-order module system that makes it easy to extend the core. Modules are simply functions that are called sequentially when booting Nuxt. The framework waits for each module to finish before continuing. In this way, modules can customize almost any aspect of Nuxt. Thanks to Nuxt's modular design (based on webpack's Tapable), modules can easily register hooks for certain entry points like builder initialization. Modules can also override templates, configure webpack loaders, add CSS libraries, and perform any of a number of other useful tasks.

Best of all, Nuxt modules can be incorporated into npm packages. This makes them easy to reuse across projects and to share with the Nuxt community, helping create an ecosystem of high-quality Nuxt add-ons.

For this point we will add 2 simple modules that will help us in the appearance of our site as they are [Bootstrap-vue](https://github.com/nuxt-community/modules/tree/master/packages/bootstrap-vue) and [Font Awesome](https://github.com/nuxt-community/modules/tree/master/packages/font-awesome)

#### Install and configure community modules

To install these 2 modules we run the following instruction in our terminal: `npm i -S @nuxtjs/font-awesome @nuxtjs/bootstrap-vue` 

Now it is necessary to configure these modules in the `nuxt.config.js` file located in the root of our project in order to be loaded at the time of running the Nuxt server.

```js
// Add after the key loading

modules: [
  '@nuxtjs/font-awesome',
  '@nuxtjs/bootstrap-vue'
]
```

*To see these steps complete, you can change to the `4-modules` branch in this repository.*


### 5. Async Data

You may want to fetch data and render it on the server-side. Nuxt.js adds an `asyncData` method to let you handle async operations before setting the component data.

#### Dummy Gists

In our page `index.vue` we will add the `script` where we will work all our javascript code:

``` vue
<script>
  const gistsLocal = [
    {
      'url': 'https://api.github.com/gists/51891107b240fbd61c3c3fd725a6bf4a',
      'commits_url': 'https://api.github.com/gists/51891107b240fbd61c3c3fd725a6bf4a/commits',
      'id': '51891107b240fbd61c3c3fd725a6bf4a',
      'git_pull_url': 'https://gist.github.com/51891107b240fbd61c3c3fd725a6bf4a.git',
      'git_push_url': 'https://gist.github.com/51891107b240fbd61c3c3fd725a6bf4a.git',
      'html_url': 'https://gist.github.com/51891107b240fbd61c3c3fd725a6bf4a',
      'files': {
        'talk-nodeJS-medellin.md': {
          'filename': 'talk-nodeJS-medellin.md',
          'type': 'text/plain',
          'language': 'Markdown',
          'raw_url': 'https://gist.githubusercontent.com/khriztianmoreno/51891107b240fbd61c3c3fd725a6bf4a/raw/fd1420ae3a3e352c23fd84090a891f9b84cdee09/talk-nodeJS-medellin.md',
          'size': 9082
        }
      },
      'public': true,
      'created_at': '2017-09-28T03:16:39Z',
      'updated_at': '2017-10-26T03:53:24Z',
      'description': 'Talk: Estructurando la base de nuestro proyecto',
      'comments': 0,
      'user': null,
      'comments_url': 'https://api.github.com/gists/51891107b240fbd61c3c3fd725a6bf4a/comments',
      'owner': {
        'login': 'khriztianmoreno',
        'id': 1481964,
        'avatar_url': 'https://avatars1.githubusercontent.com/u/1481964?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/khriztianmoreno',
        'html_url': 'https://github.com/khriztianmoreno',
        'followers_url': 'https://api.github.com/users/khriztianmoreno/followers',
        'following_url': 'https://api.github.com/users/khriztianmoreno/following{/other_user}',
        'gists_url': 'https://api.github.com/users/khriztianmoreno/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/khriztianmoreno/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/khriztianmoreno/subscriptions',
        'organizations_url': 'https://api.github.com/users/khriztianmoreno/orgs',
        'repos_url': 'https://api.github.com/users/khriztianmoreno/repos',
        'events_url': 'https://api.github.com/users/khriztianmoreno/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/khriztianmoreno/received_events',
        'type': 'User',
        'site_admin': false
      },
      'truncated': false
    },
    {
      'url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648',
      'forks_url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648/forks',
      'commits_url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648/commits',
      'id': '08b5102c533d489d25db8e467b207648',
      'git_pull_url': 'https://gist.github.com/08b5102c533d489d25db8e467b207648.git',
      'git_push_url': 'https://gist.github.com/08b5102c533d489d25db8e467b207648.git',
      'html_url': 'https://gist.github.com/08b5102c533d489d25db8e467b207648',
      'files': {
        'GIF-Screencast-OSX.md': {
          'filename': 'GIF-Screencast-OSX.md',
          'type': 'text/plain',
          'language': 'Markdown',
          'raw_url': 'https://gist.githubusercontent.com/khriztianmoreno/08b5102c533d489d25db8e467b207648/raw/fa006ed2e0f785f778b58545861583bd0c4393c8/GIF-Screencast-OSX.md',
          'size': 2817
        },
        'Performance-vs-quality.md': {
          'filename': 'Performance-vs-quality.md',
          'type': 'text/plain',
          'language': 'Markdown',
          'raw_url': 'https://gist.githubusercontent.com/khriztianmoreno/08b5102c533d489d25db8e467b207648/raw/9868405d0b45a6e78774c7b2cab704464ddaeef7/Performance-vs-quality.md',
          'size': 3703
        }
      },
      'public': true,
      'created_at': '2017-09-08T17:00:06Z',
      'updated_at': '2017-09-08T17:00:06Z',
      'description': 'OS X Screencast to animated GIF',
      'comments': 0,
      'user': null,
      'comments_url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648/comments',
      'owner': {
        'login': 'khriztianmoreno',
        'id': 1481964,
        'avatar_url': 'https://avatars1.githubusercontent.com/u/1481964?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/khriztianmoreno',
        'html_url': 'https://github.com/khriztianmoreno',
        'followers_url': 'https://api.github.com/users/khriztianmoreno/followers',
        'following_url': 'https://api.github.com/users/khriztianmoreno/following{/other_user}',
        'gists_url': 'https://api.github.com/users/khriztianmoreno/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/khriztianmoreno/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/khriztianmoreno/subscriptions',
        'organizations_url': 'https://api.github.com/users/khriztianmoreno/orgs',
        'repos_url': 'https://api.github.com/users/khriztianmoreno/repos',
        'events_url': 'https://api.github.com/users/khriztianmoreno/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/khriztianmoreno/received_events',
        'type': 'User',
        'site_admin': false
      },
      'truncated': false
    }
  ]
</script>
```

#### Method

Nuxt.js offers you different ways to use asyncData. Choose the one you're the most familiar with: `Promise`, `async/await` o `callback`

``` vue
<script>
  // ... const gistsLocal

  export default {
    data () {
      return { gists: gistsLocal }
    },
    asyncData () {
      return gistsLocal
    }
  }
</script>

```

#### Refactor Page

We are going to make an improvement to our current main page to use a component that we can reuse later, that's why in the `components` folder we created the file `GistArticle.vue` with the following content:

``` vue
<template>
  <article class="post post-large">
    <div v-if="gist">
      <div class="post-date">
        <span class="day">{{ gist.created_at | date('D') }}</span>
        <span class="month">{{ gist.created_at | date('MMM') }}</span>
      </div>
      <div class="post-content">
        <h2>
          <nuxt-link :to="{ path: '/post/'+ gist.id }">{{gist.description}}</nuxt-link>
        </h2>
        <!-- Content Raw -->
        <p>{{gist.description}}</p>
        <!-- /Content Raw -->
        <div class="post-meta">
          <span>
          <i class="fa fa-user"></i>
          By <a :href="gist.owner.html_url" target="_blank">{{ gist.owner.login }}</a>
          </span>
          <span>
          <i class="fa fa-comments"></i>
          <a :href="gist.comments_url" target="_blank">{{ gist.comments }} Comments</a>
          </span>
          <a :href="'/post/'+ gist.id +''" class="btn btn-xs btn-primary pull-right">Read more...</a>
        </div>
      </div>
    </div>
  </article>
</template>


<script>
  export default {
    props: ['gist']
  }
</script>

<style lang="scss" scoped>
  $primary-color: #41b883;
  $secundary-color: #35495f;
  $hover-color: #3c8070;

  .pagination {
    margin: -10px 0 20px;
  }

  .btn-primary {
    background-color: $primary-color;
    border-color: $primary-color;

    &:hover {
      background-color: $hover-color;
      border-color: $hover-color;
    }
  }

  article {
    border-bottom: 1px solid #DDD;
    margin-bottom: 50px;
    padding-bottom: 10px;

    &.post {
      h2 a {
        text-decoration: none;
      }
      .post-meta {
        font-size: 0.9em;
        margin-bottom: 7px;
        >span {
          display: inline-block;
          padding-right: 8px;
        }
        i {
          margin-right: 3px;
        }
      }
      .post-date {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        float: left;
        margin-right: 10px;
        text-align: center;
        .month {
          background-color: $primary-color;
          border-radius: 0 0 2px 2px;
          box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.07) inset;
          color: #FFF;
          font-size: 0.9em;
          padding: 0 10px 2px;
        }
        .day {
          background: #F4F4F4;
          border-radius: 2px 2px 0 0;
          color: $primary-color;
          display: block;
          font-size: 16px;
          font-weight: 500;
          font-weight: bold;
          padding: 10px;
        }
      }
    }
    &.post-large {
      margin-left: 60px;
      h2 {
        margin-bottom: 5px;
      }
      .post-date {
        margin-left: -60px;
      }
    }
  }
</style>
```

And now our main page `index.vue` should be as follows:

``` vue
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
  import GistArticle from '~/components/GistArticle.vue'

  const gistsLocal = [
    {
      'url': 'https://api.github.com/gists/51891107b240fbd61c3c3fd725a6bf4a',
      'commits_url': 'https://api.github.com/gists/51891107b240fbd61c3c3fd725a6bf4a/commits',
      'id': '51891107b240fbd61c3c3fd725a6bf4a',
      'git_pull_url': 'https://gist.github.com/51891107b240fbd61c3c3fd725a6bf4a.git',
      'git_push_url': 'https://gist.github.com/51891107b240fbd61c3c3fd725a6bf4a.git',
      'html_url': 'https://gist.github.com/51891107b240fbd61c3c3fd725a6bf4a',
      'files': {
        'talk-nodeJS-medellin.md': {
          'filename': 'talk-nodeJS-medellin.md',
          'type': 'text/plain',
          'language': 'Markdown',
          'raw_url': 'https://gist.githubusercontent.com/khriztianmoreno/51891107b240fbd61c3c3fd725a6bf4a/raw/fd1420ae3a3e352c23fd84090a891f9b84cdee09/talk-nodeJS-medellin.md',
          'size': 9082
        }
      },
      'public': true,
      'created_at': '2017-09-28T03:16:39Z',
      'updated_at': '2017-10-26T03:53:24Z',
      'description': 'Talk: Estructurando la base de nuestro proyecto',
      'comments': 0,
      'user': null,
      'comments_url': 'https://api.github.com/gists/51891107b240fbd61c3c3fd725a6bf4a/comments',
      'owner': {
        'login': 'khriztianmoreno',
        'id': 1481964,
        'avatar_url': 'https://avatars1.githubusercontent.com/u/1481964?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/khriztianmoreno',
        'html_url': 'https://github.com/khriztianmoreno',
        'followers_url': 'https://api.github.com/users/khriztianmoreno/followers',
        'following_url': 'https://api.github.com/users/khriztianmoreno/following{/other_user}',
        'gists_url': 'https://api.github.com/users/khriztianmoreno/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/khriztianmoreno/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/khriztianmoreno/subscriptions',
        'organizations_url': 'https://api.github.com/users/khriztianmoreno/orgs',
        'repos_url': 'https://api.github.com/users/khriztianmoreno/repos',
        'events_url': 'https://api.github.com/users/khriztianmoreno/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/khriztianmoreno/received_events',
        'type': 'User',
        'site_admin': false
      },
      'truncated': false
    },
    {
      'url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648',
      'forks_url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648/forks',
      'commits_url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648/commits',
      'id': '08b5102c533d489d25db8e467b207648',
      'git_pull_url': 'https://gist.github.com/08b5102c533d489d25db8e467b207648.git',
      'git_push_url': 'https://gist.github.com/08b5102c533d489d25db8e467b207648.git',
      'html_url': 'https://gist.github.com/08b5102c533d489d25db8e467b207648',
      'files': {
        'GIF-Screencast-OSX.md': {
          'filename': 'GIF-Screencast-OSX.md',
          'type': 'text/plain',
          'language': 'Markdown',
          'raw_url': 'https://gist.githubusercontent.com/khriztianmoreno/08b5102c533d489d25db8e467b207648/raw/fa006ed2e0f785f778b58545861583bd0c4393c8/GIF-Screencast-OSX.md',
          'size': 2817
        },
        'Performance-vs-quality.md': {
          'filename': 'Performance-vs-quality.md',
          'type': 'text/plain',
          'language': 'Markdown',
          'raw_url': 'https://gist.githubusercontent.com/khriztianmoreno/08b5102c533d489d25db8e467b207648/raw/9868405d0b45a6e78774c7b2cab704464ddaeef7/Performance-vs-quality.md',
          'size': 3703
        }
      },
      'public': true,
      'created_at': '2017-09-08T17:00:06Z',
      'updated_at': '2017-09-08T17:00:06Z',
      'description': 'OS X Screencast to animated GIF',
      'comments': 0,
      'user': null,
      'comments_url': 'https://api.github.com/gists/08b5102c533d489d25db8e467b207648/comments',
      'owner': {
        'login': 'khriztianmoreno',
        'id': 1481964,
        'avatar_url': 'https://avatars1.githubusercontent.com/u/1481964?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/khriztianmoreno',
        'html_url': 'https://github.com/khriztianmoreno',
        'followers_url': 'https://api.github.com/users/khriztianmoreno/followers',
        'following_url': 'https://api.github.com/users/khriztianmoreno/following{/other_user}',
        'gists_url': 'https://api.github.com/users/khriztianmoreno/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/khriztianmoreno/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/khriztianmoreno/subscriptions',
        'organizations_url': 'https://api.github.com/users/khriztianmoreno/orgs',
        'repos_url': 'https://api.github.com/users/khriztianmoreno/repos',
        'events_url': 'https://api.github.com/users/khriztianmoreno/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/khriztianmoreno/received_events',
        'type': 'User',
        'site_admin': false
      },
      'truncated': false
    }
  ]

  export default {
    data () {
      return { gists: gistsLocal }
    },
    asyncData () {
      return gistsLocal
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
```

*To see these steps complete, you can change to the `5-async-data` branch in this repository.*

### 6. Plugins

Nuxt.js allows you to define JavaScript plugins to be run before instantiating the root vue.js application. This is especially helpful when using your own libraries or external modules.

#### Custom Plugin

So far we have seen how to load an array in our main view, but if we look at the browser console in the developer tools we will notice that we have an error `[Vue warn]: Failed to resolve filter: date` this happens because in our component `GistArticle.vue` uses a filter to improve the readability of the created date of the article. Let's now create a custom filter to solve this.

- The first thing is to install `moment.js` to support us from this library and make the development faster: `npm i -S moment`
- Then in the folder `plugins` we create the file `filters.js` with the following content:

```js
import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (value, format) => {
  if (value) {
    return moment(String(value)).format(format)
  }
})
```
- Finally we must add our filter in the configuration file of `nuxt.config.js`

```js
// Add after the key modules

plugins: [
  '~plugins/filters.js'
],
```

#### External Packages

We may want to use external packages/modules in our application, one great example is axios for making HTTP request for both server and client. We install it via npm: `npm i --S axios`

*Note*

Axios could be added as a module as we saw in `4. Modules` but for example purposes we are going to use it as an external plugin.

In our main page `index.vue` we are going to change a bit the response of the `asyncData` method to use an asynchronous call to the API of [GitHub](https://developer.github.com/v3/gists/).

``` vue
  // Add
  import axios from 'axios'

  // Remove
  const gists ...

  export default {
    // Modificar
    data () {
      return { gists: [] }
    },


    // Change
    async asyncData ({ params }) {
      const { data } = await axios.get('https://api.github.com/users/khriztianmoreno/gists')
      return { gists: data }
    }

    ...
  }

```

#### Client-side only

Some plugins might work only for the browser, you can use the `ssr: false` option in `plugins` to run the file only on the client-side.

Example: `nuxt.config.js`

```js
module.exports = {
  plugins: [
    { src: '~plugins/ga.js', ssr: false },
  ]
}
```

*It is necessary to have in the `qa.js` file in the 
`plugins` folder*

```js 
/* eslint-disable */

export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return
  /*
  ** Include Google Analytics Script
  */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /*
  ** Set the current page
  */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  /*
  ** Every time the route changes (fired on initialization too)
  */
  app.router.afterEach((to, from) => {
    /*
    ** We tell Google Analytics to add a `pageview`
    */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

*To see these steps complete, you can change to the `6-plugins` branch in this repository.*

### 7. Vuex Store

Using a store to manage the state is important to every big application, that's why nuxt.js implement [Vuex](https://vuex.vuejs.org/en/) in its core.

#### Activate the Store

Nuxt.js will look for the `store` directory, if it exists, it will:

- Import Vuex, 
- Add `vuex` module in the vendors bundle
- Add the `store` option to the root Vue instance.

```js
import Vuex from 'vuex'
import axios from 'axios'

const API = 'https://api.github.com'

const createStore = () => {
  return new Vuex.Store({
    state: {
      gists: []
    },
    mutations: {
      SET_GISTS_LIST (state, gists) {
        state.gists = gists
      }
    },
    actions: {
      async LOAD_GIST_LIST ({ commit }, username) {
        try {
          const { data } = await axios.get(`${API}/users/${username}/gists`)
          commit('SET_GISTS_LIST', data)
        } catch (error) {
          console.log('ERROR', error)
        }
      }
    }
  })
}

export default createStore
```

#### The fetch Method

The `fetch` method is used to fill the store before rendering the page, it's like the `asyncData` method except it doesn't set the component data.

In `index.vue` we are going to replace the way we check the data of the GitHub API to use `Vuex`. Eliminate the dependence of `axios` and `asyncData` method, replace them with `fetch`, and we will help you with a couple of `vuex` functions to bring the same data.

``` vue
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
```

*To see these steps complete, you can change to the `7-vuex-store` branch in this repository.*


### 8. ServerMiddleware vs Middleware

#### Middleware

The middleware allows you to define custom functions that can be executed before rendering a page or a group of pages.

Each middleware must be placed in the middleware / directory. The name of the file will be the name of the middleware(`middleware/i18n.js`).

We will use this concept to add the internalization of our site using [vue-i18n](https://github.com/kazupon/vue-i18n). 

- Run in terminal: `npm i -S vue-i18n`
- We create a middleware called `i18n.js` with the following content that will be executed before rendering any page

```js
export default function ({ app, store, params, error }) {
  // Get locale from params
  const locale = params.lang || 'en'
  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
}
```

- We add a plugin `i18n.js` and register it in `nuxt.config.js`
```js

import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      'en': require('~/locales/en.json'),
      'es': require('~/locales/es.json')
    }
  })
}
```
- We create the `json` files that will have our translation in the `local` folder for both the English language `en.json` and Spanish `es.json`:
```json
{
  "LINKS": {
    "HOME": "Home",
    "POST": "Post"
  },
  "HOME": {
    "TITLE": "Home",
    "INTRODUCTION": "Welcome to Gixt Blog!!",
    "BY": "By",
    "COMMENTS": "Comments",
    "READ_MORE": "Read More",
    "SEARCH": "Search"
  },
  "POST": {
    "TITLE": "Post",
    "AUTHOR": "Author",
    "COMMENTS": "Comments"
  }
}
```
- And finally in our `store` we add the necessary elements for the correct functioning of the internalization
```js
const createStore = () => {
  return new Vuex.Store({
    state: {
      gists: [],
      // add
      locales: ['en', 'es'],
      locale: 'en'
    },
    ...
    mutations: {
      ...
      // add
      SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      ...
    }
```
- Now it's just changing the texts present in the `GistArticle.vue` component by the `t()` function of `i18n`
``` vue
<template>
  <article class="post post-large">
    <div v-if="gist">
      <div class="post-date">
        <span class="day">{{ gist.created_at | date('D') }}</span>
        <span class="month">{{ gist.created_at | date('MMM') }}</span>
      </div>
      <div class="post-content">
        <h2>
          <nuxt-link :to="{ path: '/post/'+ gist.id }">{{gist.description}}</nuxt-link>
        </h2>
        <!-- Content Raw -->
        <p>{{gist.description}}</p>
        <!-- /Content Raw -->
        <div class="post-meta">
          <span>
          <i class="fa fa-user"></i>
          {{ $t('HOME.BY') }} <a :href="gist.owner.html_url" target="_blank">{{ gist.owner.login }}</a>
          </span>
          <span>
          <i class="fa fa-comments"></i>
          <a :href="gist.comments_url" target="_blank">{{ gist.comments }} {{ $t('HOME.COMMENTS') }}</a>
          </span>
          <a :href="'/post/'+ gist.id +''" class="btn btn-xs btn-primary pull-right">{{ $t('HOME.READ_MORE') }}...</a>
        </div>
      </div>
    </div>
  </article>
</template>
```

#### ServerMiddleware

Are just running in server side before vue-server-renderer and can be used for server specific tasks like handling API requests or serving assets.

To better demonstrate this property, let's use the `post/create` page by creating a simple API in `Express.js` that allows us to create a Gist directly on GitHub.

- **serverMiddleware** in file `nuxt.config.js`

```js
const bodyParser = require('body-parser')

module.exports = {
  ...
  // Agregar
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // Api middleware
    '~/api'
  ],
}
```

We are going to have this file tree in our api folder (in the root of the project):

```
api/
--| gist.js
--| index.js
```
- Install the necessary dependencies for our api with express.js

```sh
$ npm i -S body-parser express request-promise
```

- `gist.js`
```js
const { Router } = require('express')
const request = require('request-promise')

const router = Router()

// Personal access tokens: https://github.com/settings/tokens
const TOKEN_GITHUB = '3ab7b782c21a3b3f329129654494dc5ca79e977c'

function create (req, res, next) {
  const gist = {
    description: req.body.description,
    public: true,
    files: req.body.files
  }

  const options = {
    url: 'https://api.github.com/gists',
    method: 'POST',
    headers: {
      'Authorization': `token ${TOKEN_GITHUB}`,
      'User-Agent': 'khriztianmoreno'
    },
    json: true,
    body: gist
  }

  return request(options)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
}

router.post('/gist/', create)

module.exports = router
```

*It is necessary to create a **GitHub personal access tokens** in order to create the gist associated with a user, otherwise it would be created anonymously* [GitHub personal access tokens](https://github.com/settings/tokens)


- `index.js`
```js
const express = require('express')
const gist = require('./gist')

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add Gist Routes
router.use(gist)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
```

To achieve an appearance of editor markdown in our form we are going to install these libraries

```sh
$ npm i -S marked lodash
```

- Finally our creation form of a new Gist `pages/post/create.vue` would look like this:

``` vue
<template>
  <div>
    <form name="form" @submit.prevent="onSubmit()">
      <div class="form-group">
        <label for="name">Title</label>
        <input type="text" v-model.trim="title" class="form-control" id="name" placeholder="Enter title" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <div class="row">
          <div class="col-sm-6">
            <textarea :value="input" @input="update" name="description" rows="10">
            </textarea>
          </div>
          <div class="col-sm-6">
            <div id="editor-result" v-html="compiledMarkdown"></div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" >Guardar</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import marked from 'marked'
  import _ from 'lodash'

  export default {
    data () {
      return {
        input: '# hello',
        title: ''
      }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
      async onSubmit () {
        const file = `${this.title.toLowerCase().replace(/\s/g, '-')}.md`

        const gist = {
          description: this.title,
          files: {}
        }
        gist.files[file] = { content: this.input }

        try {
          await axios.post('/api/gist', gist)
          alert('Yeah!!')
        } catch (error) {
          console.log('Error', error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #editor {
    margin: 0;
    height: 100%;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;

    &-result {
      border: 1px solid;
      height: 100%;
      padding: 10px;
    }
  }

  textarea,
  #editor div {
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: "Monaco", courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }
</style>
```

*To see these steps complete, you can change to the `8-serverMiddleware-middleware` branch in this repository.*

### 9. Utils

#### The head Method
Nuxt.js use [vue-meta](https://github.com/declandewet/vue-meta) to update the headings and html attributes of your application.

Use the head method to set the HTML `Head` tags for the current page. Your component data are available with this in the head method, you can use set custom meta tags with the page data.

``` vue
<script>
  export default {
    ...
    // add
    head () {
      return {
        title: 'Nuxt Blog with Gist API || @KHRIZTIANMORENO',
        meta: [
          { hid: 'description', name: 'description', content: 'A blog server side render using Gist as API' }
        ]
      }
    },
    
    ...
  }
</script>
```

#### Assets

By default, Nuxt uses vue-loader, file-loader and url-loader webpack loaders for strong assets serving. You can also use Static directory for static assets.

```
-| assets/
----| image.png
----| main.css
```

- Routes Transitions `assets/main.css`
```css
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
```

- Add the css to `nuxt.config.js`
```js
module.exports = {
  css: ['~/assets/main.css']
}
```

*To see these steps complete, you can change to the `9-utils` branch in this repository.*


### 10. Deployment

Nuxt.js comes with a set of useful commands, both for development and production purpose. Nuxt.js lets your choose between three modes to deploy your application: Server Rendered, SPA or Static Generated.

#### Server Rendered Deployment (Universal)

To deploy, instead of running `nuxt`, you probably want to build ahead of time. Therefore, building and starting are separate commands:

```sh
$ nuxt build
$ nuxt start
```

The `package.json` like follows is recommended:

```json
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  }
}
```

¡Run [now](https://zeit.co/now) to deploy. Every time you run now, you get a new deployment!


#### Static Generated Deployment (Pre Rendered)

Nuxt.js gives you the ability to host your web application on any static hosting.

To generate our web application into static files:

```sh
$ nuxt generate
```

It will create a `dist` folder with everything inside ready to be deployed on a static hosting site.

As our project has dynamic routes, it is necessary to add a special configuration to our `nuxt.confi.js` file, particularly in this case our dynamic routes would be the details of each Gist.

```js
// Dynamic routes are ignored by the generate command.
const axios = require('axios')

module.exports = {
  generate: {
    routes: function () {
      return axios.get('https://api.github.com/users/khriztianmoreno/gists')
        .then((res) => {
          return res.data.map((gist) => {
            return '/post/' + gist.id
          })
        })
    }
  }
}
```

*To see these steps complete, you can change to the `10-deployment` branch in this repository.*

### 11. :mortar_board: Challenge

To be more fun and productive instance in this workshop, I invite you to build the gist detail page `post/_id.vue` with everything learned so far and also a search engine that allows you to write any `NickName` of github and drink his Gist.

*To see these steps complete, you can change to the `11-challenge` branch in this repository.*

### 12. Thanks

Thanks to [JSConf CO](https://jsconf.co/) for allowing me to share this workshop in the 2017 version.

## @khriztianmoreno
