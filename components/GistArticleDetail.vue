<template>
  <div class="post blog-single-post">
    <article class="post post-large blog-single-post" v-if="gist">
      <div class="post-date">
        <span class="day"> {{ gist.created_at | date('D') }} </span>
        <span class="month">{{ gist.created_at | date('MMM') }}</span>
      </div>
      <div class="post-content">
        <h2>{{gist.description}}</h2>
        <!-- Content Raw -->
        <div v-html="compiledMarkdown"></div>
        <!-- /Content Raw -->
        <div class="post-meta">
          <span>
          <i class="fa fa-user"></i>
          {{ $t('POST.AUTHOR') }} <a :href="gist.owner.html_url" target="_blank">{{ gist.owner.login }}</a>
          </span>
          <span>
          <i class="fa fa-comments"></i>
          <a :href="gist.comments_url" target="_blank">{{ gist.comments }} {{ $t('POST.COMMENTS') }}</a>
          </span>
        </div>
        <div class="post-block post-author clearfix">
          <h3 class="heading-primary"><i class="fa fa-user"></i>{{ $t('POST.AUTHOR') }}</h3>
          <div class="img-thumbnail">
            <a href="blog-post.html">
            <img :src="gist.owner.avatar_url" alt="avatar">
            </a>
          </div>
          <p><strong class="name"><a :href="gist.owner.html_url" target="_blank">{{ gist.owner.login }}</a></strong></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius
            vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat,
            felis enim ornare nisi, vitae mattis nulla ante id dui.
          </p>
        </div>
        <Comment />
      </div>
    </article>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import marked from 'marked'

  import Comment from '~/components/Comment.vue'

  export default {
    components: {
      Comment
    },
    computed: {
      ...mapState([
        'gist'
      ]),
      compiledMarkdown () {
        if (this.gist && this.gist.files) {
          const key = Object.keys(this.gist.files).shift()
          const content = this.gist.files[key].content

          return marked(content, { sanitize: true })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $primary-color: #41b883;
  $secundary-color: #35495f;
  $hover-color: #3c8070;

  article.post-large .post-date {
    margin-left: -60px;
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

  .single-post article {
    border-bottom: 0;
    margin-bottom: 0;
  }

  article.blog-single-post .post-meta {
    margin-bottom: 20px;
  }


  /* Post Block */

  .post-block {
    border-top: 1px solid #DDD;
    margin: 15px 0 0 0;
    padding: 20px 0 15px 0;
    h3 {
      font-size: 1.8em;
      font-weight: 200;
      margin: 0 0 20px;
      text-transform: none;
      i {
        margin-right: 7px;
      }
    }
  }


  /* Post Author */

  .post-author {
    margin: 15px 0 0 0;
    img {
      max-height: 80px;
      max-width: 80px;
    }
    p {
      font-size: 0.9em;
      line-height: 22px;
      margin: 0;
      padding: 0;
      .name {
        font-size: 1.1em;
      }
    }
    .img-thumbnail {
      display: inline-block;
      float: left;
      margin-right: 20px;
    }
  }


  /* Post Share */

  .post-share {
    margin: 55px 0 0 0;
    padding-bottom: 0;
  }
</style>

