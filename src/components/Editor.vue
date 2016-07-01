<!-- Based on vuejs tools -->
<style lang="sass" scoped>
  // $borderColor: red;
  // .code{
  //   width: 100%;
  // }

  // .controls{
  //   display: flex;
  //   flex-flow: row;
  //   justify-content: space-between;
  //   border: 2px solid red;
  // }

  // #codeContainer{
  //   display: flex;
  //   flex-direction: row;
  // }

  // .flex-center{
  //   display: flex;
  //   flex-flow: row;
  // }

  // .flex-row-between{
  //   display: flex;
  //   flex-flow: row;
  //   justify-content: space-between;
  // }
</style>

<template>
  <!-- <div v-el:container style="display: flex; flex-flow: row;"> -->

  <div>
    <div v-el:codemirror class="code"></div>
  </div>

  <!-- </div> -->
</template>

<script>
    import CodeMirror from 'codemirror';
    // Load language modes
    import "codemirror/mode/javascript/javascript.js"; //javascript
    import "codemirror/mode/css/css.js"; //text/css
    import "codemirror/mode/htmlmixed/htmlmixed.js"; //htmlmixed
    // THEMES
    // import "codemirror/theme/monokai.css";

    import { updateCode } from '../vuex/actions'
    import {JSHINT} from 'jshint';
    import _ from 'lodash';

    const d3Test = `d3.select("body")
                    .append("svg")
                    .append("rect")
                    .attr('x', 10)
                    .attr('y', 10)
                    .attr('width', 10)
                    .attr('height', 10);
                    d3.select("body")
                    .append("svg")
                    .append("circle")
                    .attr('cx', 50)
                    .attr('cy', 50)
                    .attr('r', 50);
                `;
    const p5Test = `
                function setup() {
                  createCanvas(640, 500);
                }

                function draw() {
                  if (mouseIsPressed) {
                    fill(0);
                  } else {
                    fill(255);
                  }
                  ellipse(mouseX, mouseY, 80, 80);
                }

                `;

    export default{
        props: ['mode', 'height'],
        data() {
            return {
              cm: {
                type: Object
              },

              code: p5Test
            };
        },
        methods: {
          validateJS: function(code){
            console.log("jshint validation")
            JSHINT(code);
            for (var i = 0; i < JSHINT.errors.length; i++) {
              var err = JSHINT.errors[i];
              if (!err) continue;

              console.log(err.reason);
            }

            if(JSHINT.errors.length < 1){
              console.log("No errors found")
              this.code = code;
              this.save('javascript', this.code);
            }

          }
        },
        watch: {

        },
        ready(){
          // Init CM
          this.cm = CodeMirror(
            this.$els.codemirror,
            {
            mode: this.mode,
            lineNumbers: true,
            theme: 'monokai'
          });
          this.cm.setSize('100%', this.editorHeight);

          // Create debounce func for code validation
          if(this.mode == 'javascript'){
            let _validateJS = _.debounce(this.validateJS, 500);
            this.cm.on("change", function(cm, change) {
              let code = cm.getValue();
              _validateJS(code);
            }.bind(this))
          }
        },
        components:{

        },
        vuex: {
          actions:{
            save: updateCode
          }
        }
    }
</script>
