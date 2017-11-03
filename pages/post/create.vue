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
