<style lang="sass" scoped>
#codeContainer{
    width: 100%;
  }
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--2-offset">

      <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">

        <sandbox></sandbox>

        <hr>
        <hr>

        <code-editor mode-init="javascript" :cloud-save="saveCode"></code-editor>

      </div>

    </div>
  </div>

</template>

<script>
  import CodeEditor from './CodeEditor.vue';
  import Sandbox from './Sandbox.vue';

  import store from '../vuex/store'

  export default{
      props: {

      },
      data() {
          return {
            splitPercent: 50
          };
      },
      methods: {
        saveCode: function(){
          console.log("save code");
        }
      },
      ready(){
        // TODO: make vue directive to handle MDL dynamic insertions
        // Currently used to render tabs properly
        componentHandler.upgradeDom();
      },
      components:{
        CodeEditor,
        Sandbox
      },
      store
  }
</script>
