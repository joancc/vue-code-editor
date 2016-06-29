<style lang="sass" scoped>
#codeContainer{
    width: 100%;
  }
</style>

<template>
  <div>
    <split-pane :split="splitPercent">
      <!-- Editor and Controls -->
      <div slot="left">
        <div id="codeContainer">

          <div class="mdl-tabs__tab-bar">
              <a href="#tab1" class="mdl-tabs__tab is-active">tab1</a>
              <a href="#tab2" class="mdl-tabs__tab">tab2</a>
          </div>

          <div class="mdl-tabs__panel is-active" id="tab1">
            <editor mode="htmlmixed" height="300px"></editor>
          </div>
          <div class="mdl-tabs__panel" id="tab2">
            <editor mode="javascript" height="300px"></editor>
          </div>

        </div>
      </div>
      <!-- Preview iframe inserted here -->
      <div slot="right">
        <preview height="300px"></preview>
      </div>
    </split-pane>
  </div>
</template>

<script>
  import Editor from './Editor.vue';
  import Preview from './Preview.vue';
  import SplitPane from './SplitPane.vue';

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
        SplitPane,
        Editor,
        Preview
      }
  }
</script>
