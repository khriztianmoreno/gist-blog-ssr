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
