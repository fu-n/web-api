'use strict'
// import 'bootstrap/dist/css/bootstrap.min.css';
window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js')
require('bootstrap')

import 'bootstrap/dist/css/bootstrap.css';

import env from '../../.env.js'

$('.collapse').collapse();

import Vue from 'vue'
import App from './components/App.vue'
import VueQRCodeComponent from 'vue-qrcode-component'

import VuejsDialog from "vuejs-dialog"

Vue.use(VuejsDialog)

Vue.config.devtools = false

Vue.component('qr-code', VueQRCodeComponent)

new Vue({
  el: 'app',
  data() {
    var _keyStore = null
    if (localStorage.getItem("nanjKeystore") !== null) {
      _keyStore = 'data:'+"text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem("nanjKeystore"))
    }

    return {
      keyStoreDownload: _keyStore,
      pageLoading: false,
      CLIENT_ID: env.CLIENT_ID,
      SECRET_KEY: env.SECRET_KEY,
      NANJ_HOST: env.NANJ_HOST,
      HTTP_TX: env.HTTP_TX,
    }
    
  },
  filters: {
    toNumber: {
      read (val) {
        return Number(val)
      },
      write (val) {
        return Number(val)
      }  
    }
  },
  created: function () {
    // console.log('root instance was created')
  },
  components: {App}
})
