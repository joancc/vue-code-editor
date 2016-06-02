<!-- Based on vuejs tools -->
<style lang="sass" scoped>
  $borderColor: red;
  .code{
    border: 2px solid $borderColor;
    // width: 500px;
    width: 100%;
  }
  .controls{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    border: 2px solid red;
  }

  #codeContainer{
    display: flex;
    flex-direction: row;
  }

  .flex-center{
    display: flex;
    flex-flow: row;
  }

  .flex-row-between{
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
</style>

<template>
  <!-- <div v-el:container style="display: flex; flex-flow: row;"> -->

  <!-- <div> -->
    <split-pane>
      <!-- Editor and Controls -->
      <div slot="left" style="width: 100%;">
        <div class="controls">
          <div>
            <button @click="play">Play</button>
            <button @click="save">Save</button>
          </div>
          <div>
            <button @click="changeMode('javascript')">JS</button>
            <button @click="changeMode('htmlmixed')">HTML</button>
            <button @click="changeMode('text/css')">CSS</button>
          </div>
        </div>
        <div id="codeContainer">
          <div v-el:codemirror class="code"></div>
          <!-- iframe gets inserted here -->
        </div>
      </div>
      <!-- Preview iframe inserted here -->
      <div slot="right" id="iframeContainer"></div>
    </split-pane>
  <!-- </div> -->

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

    import SplitPane from './SplitPane.vue';

    export default{
        props: ['mode'],
        data() {
            return {
              cm: {
                type: Object
              },

              html: '<div id="intro" style="width: 100px; height: 100px;"></div>',
              css: '',
              js: `d3.select("body")
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
                `,
              iframe: null
            };
        },
        methods: {
          insertIframe: function(){
            this.iframe = document.createElement('iframe');
            document.querySelector('#iframeContainer').appendChild(this.iframe);

            // TO SET IFRAME CONTENT CAN REF ANOTHER HTML FILE OR INJECT

            // OTHER FILE
            this.iframe.setAttribute('src', 'dist/preview.html');

            // INJECT
            // Note that the closing script tags forward slash must be escaped
            // let html = `<!DOCTYPE html>
            //                  <meta charset="utf-8">
            //                  <title>Preview</title>
            //                  <body>
            //                    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"><\/script>
            //                    <script>d3.select("body").append("p").text("New paragraph!");
            //                 <\/script>
            //                  </body>
            //                  `;
            // iframe.contentWindow.document.open();
            // iframe.contentWindow.document.write(html);
            // iframe.contentWindow.document.close();
          },
          play: function(){
            // INJECT
            // Note that the closing script tags forward slash must be escaped
            let html = `<!DOCTYPE html>
                             <meta charset="utf-8">
                             <title>Preview</title>
                             <body>
                                <style>${this.css}</style>
                                ${this.html}

                                <script src="https://d3js.org/d3.v4.0.0-alpha.40.min.js"><\/script>

                               <script>
                                ${this.js}
                               <\/script>
                             </body>
                             `;
            console.log(html);
            this.iframe.contentWindow.document.open();
            this.iframe.contentWindow.document.write(html);
            this.iframe.contentWindow.document.close();
          },
          changeMode: function(mode){
            this.mode = mode;
            this.cm.setOption("mode", mode);

            let code = '';
            switch(this.mode){
              case 'javascript':
                code = this.js;
                break;
              case 'htmlmixed':
                code = this.html;
                break;
              case 'text/css':
                code = this.css;
                break;
              default:
                console.log("Invalid mode");
            }
            this.cm.setValue(code);
          },
          save: function(){
            console.log("Saving mode: " + this.mode);
            switch(this.mode){
              case 'javascript':
                this.js = this.cm.getValue();
                break;
              case 'htmlmixed':
                this.html = this.cm.getValue();
                break;
              case 'text/css':
                this.css = this.cm.getValue();
                break;
              default:
                console.log("Invalid mode");
            }

          }
        },
        ready(){

          this.cm = CodeMirror(
            this.$els.codemirror,
            {
            mode: this.mode,
            lineNumbers: true,
            theme: 'monokai'
          });
          this.insertIframe();
        },
        components:{
          SplitPane
        }
    }
</script>
