# Build a Server Rendered Vue.js App with Nuxt and Vuex
Vue.js tiene un ecosistema de primera clase para ayudar a construir aplicaciones Vue.js. Esto incluye Nuxt.js que permite rendirizar aplicaciones desde el servidor y un enfoque basado en páginas.

Este taller comenzará con una aplicación vacía y describirá cómo usar Vue.js para construir la aplicación, Nuxt.js para organizar la aplicación y Vuex para administrar el estado.

![Nuxt Gists](https://raw.githubusercontent.com/khriztianmoreno/gist-blog-ssr/master/VueNuxtGists.png "Nuxt Gists")

## Prerequisities

Para iniciar este taller debe tener instalado previamente en su computador [nodejs](https://www.nodejs.org/)

*Rate Limiting*

*For requests using Basic Authentication or OAuth, you can make up to 5000 requests per hour. Authenticated requests are associated with the authenticated user, regardless of whether Basic Authentication or an OAuth token was used. This means that all OAuth applications authorized by a user share the same quota of 5000 requests per hour when they authenticate with different tokens owned by the same user.*

*For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.*

```sh
curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com
```

## Translate
Puede consultar la guia tanto en español como en ingles

- [Español](ES_README.md)
- [Ingles](README.md)

## Workshop

Este guía pretende ser una ayuda para realizar el taller de forma autonoma.

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

Vue-CLI le ayuda a configurar rápida y fácilmente nuevos proyectos Vue. Nuxt.js es una biblioteca que te ayuda a crear aplicaciones Vue.js procesadas por el servidor. Esta lección le muestra cómo usar la plantilla nuxt / starter con Vue-CLI para comenzar rápidamente un nuevo proyecto.

**Instalar Vue-CLI**

```sh
$ npm install -g vue-cli
```

**Uso**

```sh
$ vue init <template-name> <project-name>
```

*Usando la plantilla de inicio de Nuxt.js*

```sh
$ vue init nuxt-community/starter-template gist-blog-ssr
```

Completa los pasos que CLI te muestra, luego instala las dependencias:

```sh
$ cd gist-blog-ssr
$ npm install
```

y lanza el proyecto con:

```sh
$ npm run dev
```

*Para ver completos estos pasos, puedes cambiarte al branch `1-setup` en este repositorio.*

### 2. Layout & Components

Puede aislar partes de las plantillas que desea reutilizar en los componentes, pero también puede reutilizar esos componentes en las páginas mediante diseños. Este punto lo guía a través de la creación de un componente de `Header` y `Footer` para luego ser utilizado en el diseño predeterminado.

#### Header Component

En la carpeta `components` vamos a crear un archivo `MyHeader.vue` con el siguiente contenido:

```
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

En la misma carpeta `components` creamos el archivo `MyFooter.vue` con el siguiente contenido:

```
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

Ahora vamamos a utilizar estos dos componentes creados anteriormente en nuestro diseño predeterminado, en la carpeta `layouts` encontramos el archivo `default.vue` sobrescribimos todo el archivo con el siguiente contenido:

```
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

*Importante:*

Es necesario instalar las dependencias `sass-loader` y `node-sass` para poder utilizar *SASS*  como preprocesador css en nuestro proyecto, dentro la raiz del proyecto en una terminal corre: `npm i -D sass-loader node-sass`

*Para ver completos estos pasos, puedes cambiarte al branch `2-layout-components` en este repositorio.*

### 3. Pages & Routing

**Nuxt.js** genera automáticamente la configuración del [vue-router](https://github.com/vuejs/vue-router) en función de su árbol de archivos Vue dentro del directorio de páginas.

Vamos a tener este árbol de archivos en nuestra aplicacion:

```
pages/
--| post/
-----| _id.vue
-----| index.vue
-----| create.vue
--| index.vue
```

generará automáticamente:

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

Vue-CLI crea por defecto un archivo `index.vue` en la carpeta `pages` vamos a sobrescribir su contenido con lo siguiente:

```
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

Crear dentro de `pages` una carpeta `post` y ahi crear el archivo `index.vue` que tendra el mismo contenido del `index.vue` de la raiz, solo para efectos practicos:

```
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

Dentro de la carpeta `post` crear el archivo `create.vue` y agregar el siguiente contenido:

```
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

Para definir una ruta dinámica con un parámetro, necesita definir un archivo .vue O un directorio con un guion bajo. Es por eso que vamos a crear el archivo `_id.vue` con un template vacio por ahora.

```
<template>
  <h1>Detalle</h1>
</template>
```

*Para ver completos estos pasos, puedes cambiarte al branch `3-pages-routing` en este repositorio.*

### 4. Modules

Nuxt proporciona un sistema de módulo de orden superior que facilita la ampliación del núcleo. Los módulos son simplemente funciones que se llaman secuencialmente al arrancar Nuxt. El marco espera a que termine cada módulo antes de continuar. De esta manera, los módulos pueden personalizar casi cualquier aspecto de Nuxt. Gracias al diseño modular de Nuxt (basado en webpack's Tapable), los módulos pueden registrar hooks fácilmente para ciertos puntos de entrada, como la inicialización del generador. Los módulos también pueden anular plantillas, configurar cargadores de paquetes web, agregar bibliotecas CSS y realizar cualquiera de una serie de otras tareas útiles.

Lo mejor de todo es que los módulos Nuxt se pueden incorporar a paquetes npm. Esto hace que sean fáciles de reutilizar en todos los proyectos y compartir con la comunidad Nuxt, lo que ayuda a crear un ecosistema de complementos Nuxt de alta calidad.

Para este punto vamos agregar 2 modulos sencillos que nos ayudará en la apariencia de nuestro sitio como lo son [Bootstrap-vue](https://github.com/nuxt-community/modules/tree/master/packages/bootstrap-vue) y [Font Awesome](https://github.com/nuxt-community/modules/tree/master/packages/font-awesome)

#### Install and configure community modules

Para instalar estos 2 modulos corremos en nuestra terminal la siguiente instruccion: `npm i -S @nuxtjs/font-awesome @nuxtjs/bootstrap-vue` 

Ahora es necesario configurar estos modulos en el archivo `nuxt.config.js` situado en la raiz de nuestro proyecto con el fin de que sean cargados en el momento de correr el servidor de Nuxt.

```js
// Agregar luego de la llave loading

modules: [
  '@nuxtjs/font-awesome',
  '@nuxtjs/bootstrap-vue'
]
```

*Para ver completos estos pasos, puedes cambiarte al branch `4-modules` en este repositorio.*


### 5. Async Data

Es posible que desee buscar datos y procesarlos en el lado del servidor. Nuxt.js agrega un método `asyncData` para permitirle manejar operaciones asíncronas antes de configurar los datos del componente. 

#### Dummy Gists

En nuestro pagina `index.vue` vamos agregar el `script` donde trabajaremos todo nuestro codigo javascript

```
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

Nuxt.js te ofrece diferentes formas de usar asyncData. Elija el que más le gusta: `Promise`, `async/await` o `callback`

```
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

Vamos a realizar una mejora a nuestra actual pagina principal para usar un componente que podamos reutilizar mas adelante, por eso en la carpeta `components` creamos el archivo `GistArticle.vue` con el siguiente contenido:

```
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

Y ahora nuestro pagina principla `index.vue` debe quedar de la siguiente manera: 

```
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

*Para ver completos estos pasos, puedes cambiarte al branch `5-async-data` en este repositorio.*

### 6. Plugins

Nuxt.js le permite definir complementos JavaScript para ejecutar antes de crear una instancia de la aplicación raíz vue.js. Esto es especialmente útil cuando usa sus propias bibliotecas o módulos externos.

#### Custom Plugin

Hasta ahora hemos visto como cargar un array en nuestra vista principal, pero si observamos la consola del navegador en las developer tools nos daremos cuenta que tenemos un error `[Vue warn]: Failed to resolve filter: date` esto sucede porque en nuestro componente `GistArticle.vue` utiliza un filtro para mejorar la legibilidad de la fecha de creado del articulo. Vamos ahora a crear un filtro personalizado para resolver esto. 

- Lo primero es instalar `moment.js` para apoyarnos de esta libreria y hacer mas rapido el desarrollo: `npm i -S moment`
- Luego en la carpeta `plugins` creamos el archivo `filters.js` con el siguiente contenido:

```js
import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (value, format) => {
  if (value) {
    return moment(String(value)).format(format)
  }
})
```
- Por ultimo debemos agregar nuestro filtro en el archivo de configuracion de `nuxt.config.js`

```js
// Agregar luego de la llave modules

plugins: [
  '~plugins/filters.js'
],
```

#### External Packages

Es posible que deseemos utilizar paquetes / módulos externos en nuestra aplicación, un gran ejemplo es axios para realizar solicitudes HTTP tanto para el servidor como para el cliente. Lo instalamos a través de npm: `npm i --S axios`

*Nota*

Axios pudó ser agregado como un modulo como lo vimos en `4. Modules` pero con fines de ejemplo vamos a utilizarlo como un plugin externo.

En nuestra pagina principal `index.vue` vamos a cambiar un poco la respuesta del metodo `asyncData` para utilizar un llamado asincrono a la API de [GitHub](https://developer.github.com/v3/gists/).

```
  // Agregar
  import axios from 'axios'

  // Eliminar
  const gists ...

  export default {
    // Modificar
    data () {
      return { gists: [] }
    },


    // Modificar
    async asyncData ({ params }) {
      const { data } = await axios.get('https://api.github.com/users/khriztianmoreno/gists')
      return { gists: data }
    }

    ...
  }

```

#### Client-side only

Algunos complementos pueden funcionar solo en el navegador, puede usar la opción `ssr: false` en `plugins` para ejecutar el archivo solo en el lado del cliente. 

Ejemplo: `nuxt.config.js`

```js
module.exports = {
  plugins: [
    { src: '~plugins/ga.js', ssr: false },
  ]
}
```

*Es necesario tener en el archivo `qa.js` en la carpeta `plugins`*

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

*Para ver completos estos pasos, puedes cambiarte al branch `6-plugins` en este repositorio.*

### 7. Vuex Store

Usar una store para administrar el estado es importante para cada gran aplicación, por eso nuxt.js implementa [Vuex](https://vuex.vuejs.org/en/) en su núcleo.

#### Activate the Store

Nuxt.js buscará el directorio `store`, si existe: 

- Importar Vuex, 
- Agregue el módulo vuex en el paquete de proveedores
- Agregue la opción `store` a la instancia raíz de Vue.

```js
/**
 * @author: Cristian Moreno <khriztianmoreno@gmail.com>
 */

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

El método `fetch` se usa para llenar la tienda antes de representar la página, es como el método de `data`, excepto que no establece los datos del componente.

En `index.vue` vamos a reemplazar la forma como consultamos los datos de la API de GitHub para utilizar `Vuex`. Eliminamos la dependencia de `axios` y metodo `asyncData` los remplazamos por `fetch` ademas nos ayudaremos de un par de funciones de `vuex` para traer los mismos datos.

```
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

*Para ver completos estos pasos, puedes cambiarte al branch `7-vuex-store` en este repositorio.*


### 8. ServerMiddleware vs Middleware

#### Middleware

El middleware le permite definir funciones personalizadas que se pueden ejecutar antes de representar una página o un grupo de páginas.

Cada middleware debe colocarse en el `middleware` / directorio. El nombre del archivo será el nombre del middleware (`middleware/i18n.js`).

Vamos a utilizar este concepto para agregar la internalizacion de nuestro sitio utilizando [vue-i18n](https://github.com/kazupon/vue-i18n). 

- Ejecutamos en nuestra terminal: `npm i -S vue-i18n`
- Creamos un middleware llamado `i18n.js` con el siguiente contenido que sera ejecutado ante de renderizar alguna pagina

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

- Agramos un plugin `i18n.js` y lo registramos en `nuxt.config.js`
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
- Creamos los archivos `json` que tendran nuestra traduccion en la carpeta `locales` tanto para el idioma ingles `en.json` como español `es.json`:
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
- Y por ultimo en nuestro `store` agregamos los elementos necesario para el correcto funcionamiento de la internalizacion
```js
const createStore = () => {
  return new Vuex.Store({
    state: {
      gists: [],
      // Agregar
      locales: ['en', 'es'],
      locale: 'en'
    },
    ...
    mutations: {
      ...
      // agregar
      SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      ...
    }
```
- Ahora solo es cambiar los textos presents en el componente `GistArticle.vue` por la funcion de `t()` de `i18n` 
```
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

Se está ejecutando en el lado del servidor antes de vue-server-renderer y se puede usar para tareas específicas del servidor, como el manejo de solicitudes API o el servicio de activos.

Para demostrar mejor esta propiedad, vamos a darle uso a la pagina `post/create` creando una simple API en `Express.js` que nos permita crear un Gist directamente en GitHub.

- **serverMiddleware** en el archivo `nuxt.config.js`

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

Vamos a tener este árbol de archivos en nuestra carpeta api (en la raiz del proyecto):

```
api/
--| gist.js
--| index.js
```
- Instalar las dependencias necesarias para nuestra api con express.js

```sh
$ npm i -S body-parser express request-promise
```

- `gist.js`
```js
const { Router } = require('express')
const request = require('request-promise')

const router = Router()

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

*Es necesario crear un **GitHub personal access tokens** para poder realizar la creacion de gist asociados a un usuario, de lo contrario este seria creado anonimamente*  [GitHub personal access tokens](https://github.com/settings/tokens)


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

Para lograr una apariencia de editor markdown en nuestro formulario vamos a instalar estas librerias

```sh
$ npm i -S marked lodash
```

- Finalmente nuestro fomulario de creacion de un nuevo Gist `pages/post/create.vue` quedaria asi:

```
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

*Para ver completos estos pasos, puedes cambiarte al branch `8-serverMiddleware-middleware` en este repositorio.*

### 9. Utils

#### The head Method
Nuxt.js usa [vue-meta](https://github.com/declandewet/vue-meta) para actualizar los encabezados y atributos html de su aplicación.

Use el método principal para establecer las etiquetas HTML `Head` para la página actual. Los datos de sus componentes están disponibles con esto en el método principal, puede usar establecer metaetiquetas personalizadas con los datos de la página.

```
<script>
  export default {
    ...
    // Agregar
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

De forma predeterminada, Nuxt utiliza cargadores vue-loader, file-loader y url-loader cargadores de activos fuertes que sirven. También puede usar el directorio estático para activos estáticos.

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

- Agregar el css a `nuxt.config.js`
```js
module.exports = {
  css: ['~/assets/main.css']
}
```

*Para ver completos estos pasos, puedes cambiarte al branch `9-utils` en este repositorio.*


### 10. Deployment

Nuxt.js viene con un conjunto de comandos útiles, tanto para fines de desarrollo como de producción. Nuxt.js le permite elegir entre tres modos para implementar su aplicación: Server Rendered, SPA o generado estático.

#### Server Rendered Deployment (Universal)

Para implementar, en lugar de ejecutar nuxt, es probable que desee construir antes de tiempo. Por lo tanto, construir y comenzar son comandos separados:

```sh
$ nuxt build
$ nuxt start
```

Se recomienda el siguiente `package.json`:

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

¡Entonces corre [now](https://zeit.co/now) y disfruta!


#### Static Generated Deployment (Pre Rendered)

Nuxt.js le da la capacidad de alojar su aplicación web en cualquier alojamiento estático. 

Para generar nuestra aplicación web en archivos estáticos:

```sh
$ nuxt generate
```

Creará una carpeta `dist` con todo lo que está dentro listo para implementarse en un sitio de alojamiento estático. 

Como nuestro  proyecto tiene rutas dinámicas, es necesario agregar una configuracion especial a nuestro archivo `nuxt.confi.js` particularmente en este caso nuestras rutas dinamicas serian los detalles de cada Gist

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

*Para ver completos estos pasos, puedes cambiarte al branch `10-deployment` en este repositorio.*

### 11. :mortar_board: Challenge

Para ser mas divertido y productivo la instancia en este taller, te invito a construir la pagina del detalle del gist `post/_id.vue` con todo lo aprendido hasta ahora y ademas un buscador que permita escribir cualquier `NickName` de github y trago sus Gist.

*Para ver completos estos pasos, puedes cambiarte al branch `11-challenge` en este repositorio.*

### 12. Thanks

Gracias a [JSConf CO](https://jsconf.co/) por permitirme compartir este taller en la version 2017.

## @khriztianmoreno
