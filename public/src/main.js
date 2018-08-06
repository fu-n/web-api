'use strict'
// import 'bootstrap/dist/css/bootstrap.min.css';
window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js')
require('bootstrap')

import 'bootstrap/dist/css/bootstrap.css';

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
      CLIENT_ID: '575958089608922877',
      SECRET_KEY: 'fF5MSugBFsUEoTiFIiRdUa1rFc5Y8119JVzyWUzJ',
      NANJ_HOST: 'staging.nanjcoin.com',
      HTTP_TX: 'https://ropsten.etherscan.io',
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
