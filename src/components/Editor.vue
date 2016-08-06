<style lang="sass" scoped>
</style>

<template>
  <div>
    <nav class="nav" role="navigation" title="editor language selector">
      <ul>
        <li class="mdl-button mdl-js-button">
          <a @click="">
            HTML
          </a>
        </li>
        <li class="mdl-button mdl-js-button" @click="">
          <a>
            CSS
          </a>
        </li>
        <li class="mdl-button mdl-js-button" @click="">
          <a>
            JS
          </a>
        </li>
      </ul>
      <!-- <ul className="nav__items-right" title="user-menu">
        <li className="nav__item">
          {props.user.authenticated && <p>Hello, {props.user.username}!</p>}
          {!props.user.authenticated && <p><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>}
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
              }
            };
        },
        computed: {
          mode: function(){
            let filename = this.file.name;
            let extension = /[^.]+$/.exec(filename)[0];

            switch (extension) {
              case 'js':
                return 'javascript';
              case 'html':
                return 'htmlmixed';
              case 'css':
                return 'text/css';
              default:
                return null;
            }

          },
          code: function(){
            if(this.file){
              return this.file.code;
            }else{
              return '';
            }
          }
        },
        watch: {
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
              this.updateCode('javascript', this.code);
            }

          },
          initCodeMirror: function(){
            // Init CM
            this.cm = CodeMirror(
              this.$els.codemirror,
              {
              // mode: this.mode,
              lineNumbers: true,
              theme: 'monokai'
            });
            this.cm.setSize('100%', this.editorHeight);
          },
          loadFile: function(){
            this.cm.setOption('mode', this.mode);

            // Create debounce func for code validation
            if(this.mode == 'javascript'){
              let _validateJS = _.debounce(this.validateJS, 500);
              this.cm.on("change", function(cm, change) {
                let code = cm.getValue();
                _validateJS(code);
              }.bind(this));
            }

            this.cm.setValue(this.code);
          }
        },
        watch: {
          'file': function(){
            this.loadFile();
          }
        },
        ready(){
          this.initCodeMirror();
          this.loadFile();
        },
        components:{

        },
        vuex: {
          getters:{
            editor: state => state.editor,
            file: state => state.editor.fileSelected
          },
          actions:{
            updateCode: updateCode
          }
        }
    }
</script>
