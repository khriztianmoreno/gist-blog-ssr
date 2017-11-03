<template>
  <div class="post-block post-comments clearfix" v-show="comments.length > 0">
    <h3 class="heading-primary"><i class="fa fa-comments"></i>{{ $t('POST.COMMENTS') }} ({{ comments.length }})</h3>
      <ul class="comments" :key="comment.id" v-for="(comment, index) in comments">
      <li>
        <div class="comment">
          <div class="img-thumbnail">
            <img class="avatar" alt="Avatar" :src="comment.user.avatar_url">
          </div>
          <div class="comment-block">
            <div class="comment-arrow"></div>
            <span class="comment-by">
              <strong>
                <a :href="comment.user.html_url" target="_blank">{{ comment.user.login }}</a>
              </strong>
            </span>
            <p>{{ comment.body }}</p>
            <span class="date pull-right">{{ comment.created_at | date('MMM M, YYYY') }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState([
      'comments'
    ])
  }
</script>

<style lang="scss">

  .post-comments {
    margin-top: 45px;

    ul.comments {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        clear: both;
        padding: 10px 0 0 115px;
        img.avatar {
          height: 80px;
          width: 80px;
        }
        ul.reply {
          margin: 0;
        }
        a {
          text-decoration: none;
        }
        .img-thumbnail {
          margin-left: -115px;
          position: absolute;
        }
        .comment {
          margin-bottom: 10px;
        }
      }
      .comment-arrow {
        border-bottom: 15px solid transparent;
        border-right: 15px solid #F4F4F4;
        border-top: 15px solid transparent;
        height: 0;
        left: -15px;
        position: absolute;
        top: 28px;
        width: 0;
      }
      .comment-block {
        background: #F4F4F4;
        border-radius: 5px;
        padding: 20px 20px 30px;
        position: relative;
        p {
          font-size: 0.9em;
          line-height: 21px;
          margin: 0;
          padding: 0;
        }
        .comment-by {
          display: block;
          font-size: 1em;
          line-height: 21px;
          margin: 0;
          padding: 0 0 5px 0;
        }
        .date {
          color: #999;
          font-size: 0.9em;
        }
      }
    }

    /* Responsive */

    @media (max-width: 479px) {
      ul.comments {
        li {
          border-left: 8px solid #DDDDDD;
          clear: both;
          padding: 0 0 0 10px;
          .img-thumbnail {
            display: none;
          }
        }
        .comment-arrow {
          display: none;
        }
      }
    }
  }


</style>

