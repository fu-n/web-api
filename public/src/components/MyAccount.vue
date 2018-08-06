<template>
  <section>
    <div class="col-xs-12">
      <h2>Wallet Info</h2>
      <div class="qr-box">
        <div class="row">
          <div class="col-md-6">
            <p><strong>Your Address (NANJ)</strong></p>
            <div class="loader" v-if="loading"></div>
            <div v-if="mountDone">
              <qr-code :text="nanj" :size="size" :bg-color="bgColor" :color="fgColor" error-level="L"></qr-code>
              <p>{{nanj}}</p>
              <p>Balance: {{nanjBalance}}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div v-if="mountDone">
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
    created() {
      // console.log('created')
    },
    components: {Sendtransaction},
    methods: {
      updateComponent() {
        // Object.assign(this.$data, this.$options.data.call(this)) 
      },
      sendTransaction(event) {
        if (event) event.preventDefault();
        
        if (localStorage.getItem("nanjKeystore") === null) {
          this.$dialog.alert({title: 'Info', body: 'Please create or import your wallet!', buttonLabel: 'Yes'});
          return;
        }
      },
    } //end methods
  }
</script>

<style>
  .qr-box {padding: 20px 0; background: #FFFFFF; color: #000; text-align: center;}
  .qr-box img {margin: 0 auto;}
  .qr-box p {margin: 10px 0;}
</style>