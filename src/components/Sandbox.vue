<!-- This is the real entry component. -->
<style lang="sass" scoped>
  #editor{
    width: 100%;
  }
</style>

<template>
  <div style="border: 2px solid red;">
    <div><toolbar></toolbar></div>
    <split-pane :split="splitPercentEditorPreview">
      <!-- Editor -->
      <div slot="left" id="editor">
        <editor height="50%"></editor>
      </div>

      <!-- Preview iframe inserted here -->
      <div slot="right">
        <preview height="50%"></preview>
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
      props: ['project'],
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
        Preview
      },
      vuex: {
        getters: {
          splitPercentEditorPreview: state => state.editor.splitPercent.editorPreview
        }
      }
  }
</script>
