<style lang="sass" scoped>
  .preview{
    border:2px solid blue;
  }
</style>

<template>
  <div class="preview"  id="{{iframeContainerId}}"></div>
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
      computed:{
        iframeHeight: function(){
          // Account for the language tab selection above the edito 36px
          return parseInt(this.height) + 36;
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
            this.iframe.setAttribute('height', this.iframeHeight + 'px' )
            document.querySelector('#'+this.iframeContainerId).appendChild(this.iframe);
        },
        updatePreview: function(){
          let html = `<!DOCTYPE html>
                           <meta charset="utf-8">
                           <title>Preview</title>
                           <body>
                            <style>
                              ${this.code.css}
                            </style>
                            ${this.code.htmlmixed}
                             <script src="https://d3js.org/d3.v4.min.js"><\/script>
                             <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.2/p5.min.js"><\/script>
                             <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123548/p5.play.js"><\/script>
                             <script>${this.code.javascript}
                             <\/script>
                           </body>
                           `;

          console.log("updating iframe conteng;");
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
