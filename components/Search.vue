<template>
  <div class="row">
    <div class="col-md-12">
      <form name="searchForm" @submit.prevent="onSubmit(search)">
        <div class="input-group input-group-lg">
          <input name="search"  class="form-control" placeholder="Search..." v-model.trim="search" type="text">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-search"></i></button>
          </span>
        </div>
      </form>
      <hr class="taller">
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        search: null
      }
    },
    methods: {
      ...mapActions({
        onSubmit: 'LOAD_GIST_LIST'
      })
    }
  }
</script>


<style lang="scss" scoped>
  hr.taller {
    margin: 50px 0;
  }

  .btn-primary {
    background-color: #41b883;
    border-color: #41b883;

    &:hover {
      background-color: #3c8070;
      border-color: #3c8070;
    }
  }

  .form-control {
    &:focus { border-color: #41b883; }
  }
</style>
