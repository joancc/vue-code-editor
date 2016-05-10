// main.js
var Vue = require('vue')
var VueResource = require('vue-resource')

Vue.use(VueResource);

var App = require('./src/components/App.vue')

// mount a root Vue instance
new Vue({
  el: '#vue-root',
  template: '<div><app></app></div>',
  components: {
    // include the required component
    // in the options
    app: App
  }
})
