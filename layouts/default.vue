<template>
  <div class="body">
    <div role="main" class="main">
      <my-header />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nuxt/>
          </div>
        </div>
      </div>
    </div>

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


<style lang="scss" >
  $primary-color: #41b883;
  $secundary-color: #35495f;
  $hover-color: #3c8070;

  html {
    direction: ltr;
    overflow-x: hidden;
  }

  body {
    background-color: #FFF;
    color: #777;
    font-family: "Open Sans", Arial, sans-serif;
    font-size: 14px;
    line-height: 22px;
    margin: 0;
    overflow-x: hidden;
    a {
      color: $primary-color;
      outline: none !important;

      &:hover { color: $hover-color; }
    }
  }

  li {
    line-height: 24px;
  }

  .main {
    min-height: 90vh;
  }

  /* Body */

  @media (max-width: 991px) {
    body > .body {
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  /* Responsive */

  @media (max-width: 479px) {
    body {
      font-size: 13px;
    }
  }
</style>
