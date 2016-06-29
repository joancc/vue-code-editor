<style lang="sass" scoped>
#codeContainer{
    width: 100%;
  }
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--2-offset">

      <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">

        <split-pane :split="splitPercent">
          <!-- Editor and Controls -->
          <div slot="left">
            <div id="codeContainer">

              <div class="mdl-tabs__tab-bar">
                  <a href="#tab1" class="mdl-tabs__tab is-active">tab1</a>
                  <a href="#tab2" class="mdl-tabs__tab">tab2</a>
              </div>

              <div class="mdl-tabs__panel is-active" id="tab1">
                <editor mode="htmlmixed"></editor>
              </div>
              <div class="mdl-tabs__panel" id="tab2">
                <editor mode="javascript"></editor>
              </div>

            </div>
          </div>
          <!-- Preview iframe inserted here -->
          <div slot="right" id="iframeContainer"></div>
        </split-pane>

        <hr>
        <hr>

        <code-editor mode-init="javascript" :cloud-save="saveCode"></code-editor>

      </div>

    </div>
  </div>

</template>

<script>
  import CodeEditor from './CodeEditor.vue';
  import Editor from './Editor.vue';
  import SplitPane from './SplitPane.vue';

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
        SplitPane,
        Editor
      }
  }
</script>
