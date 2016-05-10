<style lang="sass" scoped>
  $borderColor: red;
  #codemirror{
    border: 2px solid $borderColor;
    width: 500px;
  }

  #codeContainer{
    display: flex;
    flex-direction: row;
  }

  .flex-center{
    display: flex;
    flex-flow: row;
  }
</style>

<template>
  <div id="codeContainer" v-el>
    <div id='codemirror'></div>
  </div>
</template>

<script>
    import CodeMirror from 'codemirror';
    import "codemirror/mode/javascript/javascript.js";

    export default{
        props: [],
        data() {
            return {
              cm: {
                type: Object
              },
              defaultCode: "function setup() {\n  print('hello from codemirror');\n}"
            };
        },
        methods: {
          insertIframe: function(){
            let iframe = document.createElement('iframe');

            this.$el.appendChild(iframe);
            iframe.setAttribute('src', 'dist/preview.html');
          }
        },
        ready(){

          this.cm = CodeMirror(document.getElementById('codemirror'), {
            value: this.defaultCode,
            mode: 'javascript',
            lineNumbers: true
          });
          this.insertIframe();
        },
        components:{

        }
    }
</script>
