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
  import { mapActions } from 'vuex'
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
      ...mapActions(['CREAT_GIST']),
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
      onSubmit () {
        const file = `${this.title.toLowerCase().replace(/\s/g, '-')}.md`

        const gist = {
          description: this.title,
          files: {}
        }
        gist.files[file] = { content: this.input }

        this.$store.dispatch('CREAT_GIST', gist)
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

