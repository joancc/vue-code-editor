<style lang="sass" scoped>
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
      <div id="container" style="width:800px;height:600px;border:1px solid grey"></div>
    </div>
  </div>

</template>

<script>
  // import vs from '/node_modules/monaco-editor/min/vs/editor/editor.main.js';
  require(['monaco-editor/vs/editor/editor.main'], function() {
        var editor = monaco.editor.create(document.getElementById('container'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        });
    });

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
        console.log("Monaco");
      },
      components:{

      }
  }
</script>
