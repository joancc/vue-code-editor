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
            <a v-for="editor in editors" href="#editor_{{editor.abbr}}" class="mdl-tabs__tab">{{editor.abbr}}</a>
              <!-- <a href="#editor1" class="mdl-tabs__tab">HTML</a>
              <a href="#editor2" class="mdl-tabs__tab is-active">JS</a> -->
          </div>

          <div v-for="editor in editors" class="mdl-tabs__panel is-active" id="editor_{{editor.abbr}}">
            <editor :mode="editor.mode" :src="editor.src" height="300px"></editor>
          </div>
          <!-- <div class="mdl-tabs__panel is-active" id="editor1">
            <editor mode="htmlmixed" height="300px"></editor>
          </div>
          <div class="mdl-tabs__panel" id="editor2">
            <editor mode="javascript" height="300px"></editor>
          </div> -->

        </div>
      </div>
      <!-- Preview iframe inserted here -->
      <div slot="right">
        <div id="controls">
          <button @click="resizePreview">Resize</button>
        </div>
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
      props: ['editors'],
      data() {
          return {
            splitPercent: 50
          };
      },
      computed: {
      },
      methods: {
        saveCode: function(){
          console.log("save code");
        },
        resizePreview: function(){
          if (this.splitPercent == 50) {
            this.splitPercent = 0;
          }else{
            this.splitPercent = 50;
          }
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
