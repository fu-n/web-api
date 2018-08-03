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
            <div v-if="mountDone">
              <qr-code :text="nanj" :size="size" :bg-color="bgColor" :color="fgColor" error-level="L"></qr-code>
              <p>{{nanj}}</p>
              <p>Balance: {{nanjBalance}} <button type="button" class="btn btn-info" @click="sendTransaction($event)">Send Transaction</button></p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div v-if="is_sendnanj">
              <sendtransaction></sendtransaction>
            </div>
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

  import Sendtransaction from './Sendtransaction.vue';

  export default {
    data() {
      return {
        is_sendnanj: false,
        mountDone: false,
        loading: true,
        address: '',
        nanj: localStorage.getItem("nanjAddress"),
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

      axios.get('/api/wallet/check?address='+self.address).then(response => {
            if (response.data.data.address !== self.address) {
              self.nanj = response.data.data.address

              if (localStorage.getItem("nanjAddress") !== null) {
                localStorage.removeItem('nanjAddress')
              }
              localStorage.setItem('nanjAddress', self.nanj)

              self.nanjBalance = response.data.data.balanceNanj
              self.loading = false
              self.mountDone = true
            }
          })

    },
    components: {Sendtransaction},
    methods: {
      sendTransaction(event) {
        if (event) event.preventDefault();
        if (localStorage.getItem("nanjKeystore") === null) {
          this.$dialog.alert({title: 'Info', body: 'Please create or import your wallet!', buttonLabel: 'Yes'});
          return;
        }
        this.is_sendnanj = true
        
      },
    } //end methods
  }
</script>

<style>
  .qr-box {padding: 20px 0; background: #FFFFFF; color: #000; text-align: center;}
  .qr-box img {margin: 0 auto;}
  .qr-box p {margin: 10px 0;}
  .loader {border: 4px solid #f3f3f3; /* Light grey */ border-top: 4px solid #0E1E2D; /* Blue */ border-radius: 50%; width: 20px; height: 20px; animation: spin 2s linear infinite; margin: 10px auto 10px auto}
</style>