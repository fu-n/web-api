<template>
  <section>
    <div class="col-xs-12">
      <h2>Wallet Info</h2>
      <div class="qr-box">
        <div class="row">
          <div class="col-md-6">
            <p><strong>Your Address (ETH)</strong></p>
            <qr-code :text="address" :size="size" :bg-color="bgColor" :color="fgColor" error-level="L"></qr-code>
            <p>{{address}}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Your Address (NANJ)</strong></p>
            <div class="loader" v-if="loading"></div>
            <qr-code :text="nanj" :size="size" :bg-color="bgColor" :color="fgColor" error-level="L"></qr-code>
            <p>{{nanj}}</p>
            <p>Balance: {{nanjBalance}}</p>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
  import $ from 'jquery';
  import _ from 'lodash';
  import axios from 'axios';
  import lightwallet from 'eth-lightwallet';


  export default {
    data() {
      return {
        loading: true,
        address: '',
        nanj: '',
        nanjBalance: 0,
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        size: 256
      }
    },
    mounted() {
      var self = this
      let keyJson = localStorage.getItem('nanjKeystore')
      keyJson = JSON.parse(keyJson)
      self.address = '0x'+keyJson.address

      if (localStorage.getItem("nanjAddress") !== null) {
        self.nanj = localStorage.getItem('nanjAddress')
        self.loading = false
      } else {
        axios.get('/api/wallet/check?address='+self.address).then(response => {
              self.nanj = response.data.data.address
              self.nanjBalance = response.data.data.balanceNanj
              self.loading = false
              localStorage.setItem('nanjAddress', self.nanj)
          })
      }

    },
    methods: {

    } //end methods
  }
</script>

<style>
  .qr-box {padding: 20px 0; background: #FFFFFF; color: #000; text-align: center;}
  .qr-box img {margin: 0 auto;}
  .qr-box p {margin: 10px 0;}
  .loader {border: 4px solid #f3f3f3; /* Light grey */ border-top: 4px solid #0E1E2D; /* Blue */ border-radius: 50%; width: 20px; height: 20px; animation: spin 2s linear infinite; margin: 10px auto 10px auto}
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
</style>