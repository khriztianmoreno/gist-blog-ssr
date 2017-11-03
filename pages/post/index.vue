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
