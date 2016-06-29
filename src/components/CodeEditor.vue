<!-- Based on vuejs tools -->
<style lang="sass" scoped>
  $borderColor: red;
  .code{
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

  <div>
    <div class="controls">
      <div>
        <button @click="play">Play</button>
        <button @click="save">Save</button>
        <button @click="resizePreview">Resize Preview</button>
      </div>
      <div>
        <button @click="changeMode('javascript')">JS</button>
        <button @click="changeMode('htmlmixed')">HTML</button>
        <button @click="changeMode('text/css')">CSS</button>
      </div>
    </div>
    <split-pane :split="splitPercent">
      <!-- Editor and Controls -->
      <div slot="left">
        <div id="codeContainer">
          <div v-el:codemirror class="code"></div>
        </div>
      </div>
      <!-- Preview iframe inserted here -->
      <div slot="right" id="iframeContainer"></div>
    </split-pane>
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

    import SplitPane from './SplitPane.vue';

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
    const p5Test = `function setup() {
    createCanvas(640, 500);
  }

  function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}`;
    export default{
        props: ['modeInit', 'cloudSave'],
        data() {
            return {
              cm: {
                type: Object
              },
              editorHeight: '550px',
              splitPercent: 50,
              html: '',
              css: '',
              js: p5Test,
              iframe: null,
              mode: this.modeInit
            };
        },
        methods: {
          resizePreview: function(){
            this.splitPercent = this.splitPercent > 0 ? 0 : 50;
          },
          insertIframe: function(){
            this.iframe = document.createElement('iframe');
            document.querySelector('#iframeContainer').appendChild(this.iframe);

            // TO SET IFRAME CONTENT CAN REF ANOTHER HTML FILE OR INJECT

            // OTHER FILE
            this.iframe.setAttribute('src', 'dist/preview.html');
            this.iframe.setAttribute('height', this.editorHeight);

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

                                <!-- D3 -->
                                <script src="https://d3js.org/d3.v4.0.0-alpha.40.min.js"><\/script>
                                <!-- P5 -->
                                <script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.0/p5.js"><\/script>

                               <script>
                                ${this.js}
                               <\/script>
                             </body>
                             `;

            this.iframe.contentWindow.document.open();
            this.iframe.contentWindow.document.write(html);
            this.iframe.contentWindow.document.close();
          },
          changeMode: function(mode){
            this.mode = mode;

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

            this.cm.setOption("mode", mode);
            this.cm.setValue(code);
          },
          save: function(){
            console.log("Saving mode: " + this.mode);

            if(this.cloudSave) this.cloudSave();

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
          this.cm.setSize('100%', this.editorHeight);

          this.insertIframe();

          this.changeMode('javascript');
        },
        components:{
          SplitPane
        }
    }
</script>
