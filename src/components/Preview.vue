<style lang="sass" scoped>
</style>

<template>
  <div style="border:2px solid blue;" id="iframeContainer"></div>
</template>

<script>
  export default{
      props: ['height'],
      data() {
        return {
          iframe: null
        }
      },
      methods: {
        insertIframe: function(){
            this.iframe = document.createElement('iframe');
            document.querySelector('#iframeContainer').appendChild(this.iframe);

            // TO SET IFRAME CONTENT CAN REF ANOTHER HTML FILE OR INJECT

            // OTHER FILE
            this.iframe.setAttribute('src', 'dist/preview.html');
            this.iframe.setAttribute('height', this.height);

            // INJECT
            // Note that the closing script tags forward slash must be escaped
            // let html = `<!DOCTYPE html>
            //                  <meta charset="utf-8">
            //                  <title>Preview</title>
            //                  <body>
            //                    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"><\/script>
            //                    <script>d3.select("body").append("p").text("New paragraph!");
            //                 <\/script>
            //                  </body>
            //                  `;
            // iframe.contentWindow.document.open();
            // iframe.contentWindow.document.write(html);
            // iframe.contentWindow.document.close();
          },
      },
      ready(){
        // TODO: make vue directive to handle MDL dynamic insertions
        // Currently used to render tabs properly
        this.insertIframe();
      },
      components:{
      }
  }
</script>
