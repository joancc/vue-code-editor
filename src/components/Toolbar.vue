<style lang="sass" scoped>
  ul.nav__items-left{
    display: flex;
    flex-flow: row;
    justify-content: space-between;

    list-style-type: none;

    .btn{
      min-width: 100px;
      background: gray;
      color: #666;
      display: block;
      text-align: center;
      text-decoration: none;
    }
    .btn:hover{
      cursor: pointer;
    }
  }
</style>

<template>
  <nav class="nav" role="navigation" title="editor-toolbar">
      <ul>
        <li class="mdl-button mdl-js-button">
          <a
            @click="createProject"
          >
            New
          </a>
        </li>
        <li class="mdl-button mdl-js-button">
          <a
            @click="saveProject"
          >
            Save
          </a>
        </li>
        <li class="mdl-button mdl-js-button">
          <a>
            Open
          </a>
        </li>
        <li class="mdl-button mdl-js-button">
          <a @click="exportProjectAsZip">
            Export (zip)
          </a>
        </li>
        <li class="mdl-button mdl-js-button" @click="cloneProject">
          <a>
            Clone
          </a>
        </li>
        <li class="mdl-button mdl-js-button" @click="resizePreview">
          <a>
            Resize
          </a>
        </li>
      </ul>
      <!-- <ul className="nav__items-right" title="user-menu">
        <li className="nav__item">
          {props.user.authenticated && <p>Hello, {props.user.username}!</p>}
          {!props.user.authenticated && <p><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>}
        </li>
      </ul> -->
    </nav>
</template>

<script>
  import { resize } from '../vuex/actions'

  export default{
      props: {

      },
      data() {
          return {

          };
      },
      methods: {
        resizePreview: function(){
          console.log("resize")
          if (this.splitPercentEditorPreview == 50) {
            // this.splitPercentFilesEditor = 0;
            this.resize('editorPreview', 0)
          }else{
            // this.splitPercentPreviewEditor = 50;
            this.resize('editorPreview', 50)
          }
        }
      },
      ready(){

      },
      components:{

      },
      vuex: {
        getters: {
          splitPercentEditorPreview: state => state.editor.splitPercent.editorPreview,
          splitPercentFilesEditor: state => state.editor.splitPercent.filesEditor
        },
        actions:{
          resize: resize
        }
      }
  }
</script>
