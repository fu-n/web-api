'use strict'
// import 'bootstrap/dist/css/bootstrap.min.css';
window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js')
require('bootstrap')

import 'bootstrap/dist/css/bootstrap.css';

import Vue from 'vue'
import App from './components/App.vue'

new Vue({
  el: 'app',
  created: function () {
    // console.log('root instance was created')
  },
  components: {App}
})
