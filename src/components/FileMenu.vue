<style lang="sass" scoped>
  .clickable:hover{
    cursor: pointer;
  }
</style>

<template>
  <nav class={sidebarClass} title="file-navigation" role="navigation">
      <div>
        <div>Files</div>
        <div style="display: flex; flex-flow: row; justify-content: space-between;">
          <a
            @click="newFile"
          >
            +
          </a>
          <a
            @click="toggleFileMenu"
            class="clickable"
            style="width: 1rem; text-align: center;"
          >
            {{fileMenuResizeIcon}}
          </a>
        </div>
      </div>
      <ul>
        <li v-for="file in files">
          <a
            @click="setSelectedFile(file.name)"
          >{{file.name}}</a>
        </li>
      </ul>
    </nav>
</template>

<script>
  import {resize, setSelectedFile} from '../vuex/actions'

  export default{
      props: {

      },
      data() {
          return {

          };
      },
      computed:{
        fileMenuResizeIcon: function(){
          if(this.splitPercentFilesEditor == 20){
            return '<';
          }else{
            return '>';
          }
        }
      },
      methods: {
        toggleFileMenu(){
          if (this.splitPercentFilesEditor == 20) {
            // this.splitPercentFilesEditor = 0;
            this.resize('filesEditor', 5)
          }else{
            // this.splitPercentPreviewEditor = 50;
            this.resize('filesEditor', 20)
          }
        }
      },
      ready(){

      },
      components:{

      },
      vuex:{
        getters: {
          files: state => state.editor.files,
          splitPercentFilesEditor: state => state.editor.splitPercent.filesEditor
        },
        actions:{
          resize: resize,
          setSelectedFile: setSelectedFile
        }
      }
  }
</script>
