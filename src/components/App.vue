<style lang="sass" scoped>
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
      <code-editor mode="javascript"></code-editor>
    </div>
  </div>

</template>

<script>
  import CodeEditor from './CodeEditor.vue';
  import SplitPane from './SplitPane.vue';

  export default{
      props: {

      },
      data() {
          return {

          };
      },
      methods: {

      },
      ready(){

      },
      components:{
        CodeEditor,
        SplitPane
      }
  }
</script>
