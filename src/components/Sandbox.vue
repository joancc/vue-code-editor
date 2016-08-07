<!-- This is the real entry component. -->
<style lang="sass" scoped>
  #editor{
    width: 100%;
  }

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
  <div style="border: 2px solid red;">
    <div>
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
    </div>
    <split-pane :split="splitPercent">
      <!-- Editor -->
      <div slot="left" id="editor">
        <editor :height="height"></editor>
      </div>

      <!-- Preview iframe inserted here -->
      <div slot="right">
        <preview :height="height"></preview>
      </div>
    </split-pane>
  </div>
</template>

<script>
  import Editor from './Editor.vue';
  import Preview from './Preview.vue';
  import SplitPane from './SplitPane.vue';
  import JSZip from 'jszip';
  import FileSaver from 'file-saver/FileSaver.js';

  export default{
      props: ['project'],
      data() {
          return {
            splitPercent: 50,
            height: '450px'
          };
      },
      computed: {
      },
      methods: {
        exportProjectAsZip:function(){
          console.log('exporting');
          var zip = new JSZip();
          zip.file("index.html", this.code.htmlmixed);
          zip.file("main.js", this.code.javascript);
          zip.file("styles.css", this.code.css);
          zip.generateAsync({type:"blob"})
          .then(function(content) {
              try {
                  FileSaver.saveAs(content, "project.zip");
              } catch (e) {
                  alert("saveAs failed with " + e);
              }
          }).catch(function (e) {
              alert("JSZip failed with " + e);
          });
        },
        resizePreview: function(){
          console.log("resize")
          if (this.splitPercent == 50) {
            this.splitPercent = 0;
          }else{
            this.splitPercent = 50;
          }
        }
      },
      ready(){
      },
      vuex: {
        getters: {
          code: state => state.editor.code
        }
      },
      components:{
        SplitPane,
        Editor,
        Preview
      }
  }
</script>
