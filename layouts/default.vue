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
