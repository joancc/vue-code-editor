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
      methods: {
        insertIframe: function(){
            this.iframe = document.createElement('iframe');
            document.querySelector('#'+this.iframeContainerId).appendChild(this.iframe);

            // TO SET IFRAME CONTENT CAN REF ANOTHER HTML FILE OR INJECT

            // OTHER FILE
            // this.iframe.setAttribute('src', 'dist/preview.html');
            // this.iframe.setAttribute('height', this.height);

            // INJECT
            // Note that the closing script tags forward slash must be escaped
            let html = `<!DOCTYPE html>
                             <meta charset="utf-8">
                             <title>Preview</title>
                             <body>
                               <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"><\/script>
                               <script>d3.select("body").append("p").text("New paragraph!");
                            <\/script>
                             </body>
                             `;
            this.iframe.contentWindow.document.open();
            this.iframe.contentWindow.document.write(html);
            this.iframe.contentWindow.document.close();
          },
      },
      ready(){
        // TODO: make vue directive to handle MDL dynamic insertions
        // Currently used to render tabs properly
        this.insertIframe();
      },
      vuex: {
        getters:{
          editor: state => state.editor,
          file: state => state.editor.fileSelected
        }
      },
      components:{
      }
  }
</script>
