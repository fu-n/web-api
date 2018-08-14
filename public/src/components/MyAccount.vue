<template>
  <section>
    <div class="col-xs-12">
      <h2>Wallet Info</h2>
      <div class="qr-box">
        <div class="loader" v-if="loading"></div>
        <div class="row" v-if="mountDone">
          <template v-if="!nanj.length && hasNanj">
            <div class="col-md-12">
              <div class="loader"></div>
              <p><strong>Please waiting to check your NANJ Wallet.</strong></p>
            </div>
          </template>
          <template v-else>
            <template v-if="hasNanj">
              <div class="col-md-6">
                  <p><strong>Your Address (NANJ)</strong></p>
                  <qr-code :text="nanj" :size="size" :bg-color="bgColor" :color="fgColor" error-level="L"></qr-code>
                  <p class="nanj-address">{{nanj}}</p>
                  <template v-if="!loadingBalance">
                    <p>Balance: <span class="wave-dot"><span></span><span></span><span></span><span></span></span></p>
                  </template>
                  <template v-else>
                    <p>Balance: {{nanjBalance}}</p>
                  </template>
              </div>
              <div class="col-md-6">
                  <sendtransaction></sendtransaction>
              </div>
            </template>
            <template v-else>
              <div class="col-md-12">
                <h5>Your NANJ Address waiting to create on network.</h5>
                <h6>Please try again later!</h6>
              </div>
            </template>
          </template>
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
      let hasNanj = false
      if (localStorage.getItem("nanjAddress") !== null) {
        hasNanj = true
      }

      return {
        mountDone: false,
        loading: true,
        address: '',
        nanj: localStorage.getItem("nanjAddress"),
        hasNanj: hasNanj,
        nanjBalance: 0,
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        size: 256,
        loadingBalance: true
      }
    },
    mounted() {
      var self = this
      let keyJson = localStorage.getItem('nanjKeystore')
      keyJson = JSON.parse(keyJson)
      self.address = '0x'+keyJson.address

      if (localStorage.getItem("nanjAddress") !== null) {
        self.loadingBalance = false
        self.loading = false
        self.mountDone = true
      }

      axios.get('/api/wallet/check?address='+self.address).then(response => {
            if (response.data.data.address !== self.address) {
              self.hasNanj = true
              self.nanj = response.data.data.address
              localStorage.setItem('nanjAddress', self.nanj)
              self.nanjBalance = response.data.data.balanceNanj
              self.loadingBalance = true
              self.addFromNanj = self.nanj

              // update nanj to local accounts
              self.nanjAddressToAccounts(keyJson.address, self.nanj)

            } else {
              self.hasNanj = false
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
      nanjAddressToAccounts(ethAdd, nanjAdd) {
        let accounts = new Array()
        if (localStorage.getItem("accounts") !== null) {
          accounts = JSON.parse(localStorage.getItem("accounts"))
        }

        if (accounts.length) {
          let index = accounts.map(function(o) { return o.ethAddress; }).indexOf(ethAdd)
          accounts[index].nanj = nanjAdd
          localStorage.setItem('accounts', JSON.stringify(accounts))
        }
      }
    } //end methods
  }
</script>

<style>
  .qr-box {padding: 20px 0; background: #FFFFFF; color: #000; text-align: center;}
  .qr-box img {margin: 0 auto;}
  .qr-box p {margin: 10px 0;}
</style>