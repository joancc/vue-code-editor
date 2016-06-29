// main.js
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

let App = require('./src/components/App.vue')

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
