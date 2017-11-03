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
