<style lang="sass" scoped>
</style>

<template>
  <div style="border:2px solid blue;" id="{{iframeContainerId}}"></div>
</template>

<script>
  export default{
      props: ['height'],
      data() {
        return {
          iframe: null,
          iframeContainerId: 'iframeContainer'+this._uid
        }
      },
      watch: {
        'code': function(){
          console.log("Preview detects code update")
          this.updatePreview();
        }
      },
      methods: {
        insertIframe: function(){
            this.iframe = document.createElement('iframe');
            document.querySelector('#'+this.iframeContainerId).appendChild(this.iframe);
        },
        updatePreview: function(){
          let html = `<!DOCTYPE html>
                           <meta charset="utf-8">
                           <title>Preview</title>
                           <body>
                            ${this.code.htmlmixed}
                             <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"><\/script>
                             <script>d3.select("body").append("p").text("New paragraph!");
                          <\/script>
                           </body>
                           `;
          this.iframe.contentWindow.document.open();
          this.iframe.contentWindow.document.write(html);
          this.iframe.contentWindow.document.close();
        }
      },
      ready(){
        // TODO: make vue directive to handle MDL dynamic insertions
        // Currently used to render tabs properly
        this.insertIframe();
      },
      vuex: {
        getters:{
          code: state => state.editor.code
        }
      },
      components:{
      }
  }
</script>
