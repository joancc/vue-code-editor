<style lang="sass" scoped>
.selected{
  color: orange;
}
</style>

<template>
  <div>
    <nav class="nav" role="navigation" title="editor language selector">
      <button
        :class="{'selected': mode=='htmlmixed'}"
        class="mdl-button mdl-js-button mdl-button--raised"
        @click="setEditorMode('htmlmixed')"
        >HTML</button>
      <button
        :class="{'selected': mode=='javascript'}"
        class="mdl-button mdl-js-button mdl-button--raised"
        @click="setEditorMode('javascript')"
        >JS</button>
        <button
        :class="{'selected': mode=='css'}"
        class="mdl-button mdl-js-button mdl-button--raised"
        @click="setEditorMode('css')"
        >CSS</button>
      <!-- <ul>
        <li :class="{'selected': true}" class="mdl-button mdl-js-button" @click="setEditorMode('htmlmixed')">
          <a>
            HTML
          </a>
        </li>
        <li class="mdl-button mdl-js-button" @click="setEditorMode('css')">
          <a>
            CSS
          </a>
        </li>
        <li class="mdl-button mdl-js-button" @click="setEditorMode('javascript')">
          <a>
            JS
          </a>
        </li>
      </ul> -->
    </nav>
    <div v-el:codemirror class="code"></div>
  </div>
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

    export default{
        props: ['height'],
        data() {
            return {
              cm: {
                type: Object
              },
              mode: 'javascript',
              code: this.initCode
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
          setEditorMode: function(val){
            this.mode = val;
            this.setEditorContent();
          },
          // validateJS: function(code){
          //   console.log("jshint validation")
          //   JSHINT(code);
          //   for (var i = 0; i < JSHINT.errors.length; i++) {
          //     var err = JSHINT.errors[i];
          //     if (!err) continue;

          //     console.log(err.reason);
          //   }

          //   if(JSHINT.errors.length < 1){
          //     console.log("No errors found")
          //     this.code = code;
          //     this.updateCode('javascript', this.code);
          //   }

          // },
          validateCode: function(){
            // TODO: Perform code validations

            this.code[this.mode] = this.cm.getValue();
            this.updateCode(this.code);
          },
          initEditor: function(){
            // Init CM
            this.cm = CodeMirror(
              this.$els.codemirror,
              {
              // mode: this.mode,
              lineNumbers: true,
              theme: 'monokai'
            });
            this.cm.setSize('100%', this.height);

            // Create debounce func for code validation
            if(this.mode == 'javascript'){
              let validateCode = _.debounce(this.validateCode, 1000);
              this.cm.on("change", function(cm, change) {
                validateCode();
              }.bind(this));
            }
          },
          setEditorContent: function(){
            this.cm.setOption('mode', this.mode);

            this.cm.setValue(this.code[this.mode]);
          }
        },
        watch: {
        },
        ready(){
          this.initEditor();
          this.setEditorContent();
        },
        components:{

        },
        vuex: {
          getters:{
            initCode: state => state.editor.code
          },
          actions:{
            updateCode
          }
        }
    }
</script>
