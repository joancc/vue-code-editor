<!-- This is the real entry component. -->
<style lang="sass" scoped>
  #editor{
    width: 100%;
  }
</style>

<template>
  <div>
    <div><toolbar></toolbar></div>
    <split-pane :split="splitPercentEditorPreview">
      <!-- Editor and Controls -->
      <div slot="left">
        <split-pane :split="splitPercentFilesEditor">
          <div slot="left">
            <file-menu></file-menu>
          </div>
          <div slot="right" id="editor">
            <editor height="300px"></editor>
          </div>
        </split-pane>
      </div>

      <!-- Preview iframe inserted here -->
      <div slot="right">
        <preview height="300px"></preview>
      </div>
    </split-pane>
  </div>
</template>

<script>
  import Editor from './Editor.vue';
  import Preview from './Preview.vue';
  import FileMenu from './FileMenu.vue';
  import Toolbar from './Toolbar.vue';
  import SplitPane from './SplitPane.vue';

  export default{
      props: [],
      data() {
          return {

          };
      },
      computed: {
      },
      methods: {

      },
      ready(){
      },
      components:{
        SplitPane,
        Editor,
        Toolbar,
        FileMenu,
        Preview
      },
      vuex: {
        getters: {
          splitPercentEditorPreview: state => state.editor.splitPercent.editorPreview,
          splitPercentFilesEditor: state => state.editor.splitPercent.filesEditor
        }
      }
  }
</script>
