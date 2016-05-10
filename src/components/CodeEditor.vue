<style lang="sass" scoped>
  $borderColor: red;
  #codemirror{
    border: 2px solid $borderColor;
    width: 500px;
  }

  .flex-center{
    display: flex;
    flex-flow: row;
  }
</style>

<template>
  <div id='codemirror'></div>
</template>

<script>
    import CodeMirror from 'codemirror';
    import "codemirror/mode/javascript/javascript.js";

    export default{
        props: {

        },
        data() {
            return {
              cm: {
                type: Object
              }
            };
        },
        methods: {

        },
        ready(){
          this.cm = CodeMirror(document.getElementById('codemirror'), {
            value: 'function setup() {\n  print("hello from codemirror");\n}',
            mode: 'javascript',
            lineNumbers: true
          });
        },
        components:{

        }
    }
</script>
