<template>
  <div>
    <h2 class="text-center">Transaction</h2>
    
    <div class="alert alert-success" v-if="txsSuccess">
      <p class="mb-0"><strong>Well done!</strong> Your transaction is successfully.</p>
      <p class="mb-0"><strong>Txhash: </strong> <a v-bind:href="txHashLink" target="_blank">{{ txHash }}</a></p>
    </div>

    <div class="alert alert-danger" v-if="errors.length > 0">
      <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
      <br>
      <ul>
          <li v-for="error in errors">
              {{ error }}
          </li>
      </ul>
    </div>

    <form @submit.prevent v-if="sendToken">
      <div class="form-group">
        <input type="text" class="form-control" name="addFrom" id="addFrom" placeholder="Send from address" readonly="readonly" v-bind:value="addFrom">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" name="addTo" id="addTo" placeholder="Send to address" v-model="addTo">
      </div>
      <div class="form-group">
        <input type="number" class="form-control" name="sendAmount" id="sendAmount" placeholder="Amount" v-model="sendAmount">
      </div>
      <button type="submit" class="btn btn-info" @click="send">Send</button>
    </form>

    <form @submit.prevent v-if="cfrPasspharse">
      <div class="form-group">
        <input type="password" name="password" class="form-control" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-info" @click="confirmPassphrase" :disabled="submitted == 1">Confirm</button>
    </form>

    <div class="page-loading" v-if="pageLoading"></div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import _ from 'lodash';
  import axios from 'axios';  
  import wallet from "./../wallet.js";
  import utils from 'ethereumjs-util';

  export default {
    data() {
      let keyJson = localStorage.getItem('nanjKeystore')
      keyJson = JSON.parse(keyJson)
      return {
        errors: [],
        password: null,
        sendToken: true,
        cfrPasspharse: false,
        addFrom: '0x'+keyJson.address,
        addTo: null,
        sendAmount: null,
        txsSuccess: false,
        submitted: false,
        pageLoading: false,
        txHash: '',
        txHashLink: ''
      }
    },
    mounted() {
      
    },
    methods: {
      validate() {
          this.errors = [];

          if(this.addFrom && this.addTo && this.sendAmount) return true;

          if(!this.addFrom) this.errors.push("Address from is required.");
          if(!this.addTo) this.errors.push("Address to is required.");
          if(!this.sendAmount) this.errors.push("Amount is required.");
          return false;
      },
      validateConfirmPassphrase() {
        this.errors = [];
        if(this.password) return true;
        if(!this.password) this.errors.push("Password is required.");
        return false;
      },
      send() {
        var valid = this.validate();
        var self = this;
        if(valid) {
          self.sendToken = false;
          self.cfrPasspharse = true;
        }
      },
      confirmPassphrase() {
        if (this.validateConfirmPassphrase()) {
          let uri = '/api/wallet/import';
          let data = {
            password: this.password,
            keystore: localStorage.getItem('nanjKeystore')
          };

          var self = this;
          self.submitted = true;
          self.pageLoading = true;
          axios['post'](uri, data)
            .then(response => {
              self.pageLoading = false
              if (typeof response.data.data === 'object') {
                self.transaction(response.data.data.privateKey);
              }
            })
            .catch(error => {
              self.pageLoading = false
              self.submitted = false;
              if (typeof error.response.data === 'object') {
                self.errors = _.flatten(_.toArray(error.response.data));
              } else {
                  self.errors = ['Something went wrong. Please try again.'];
              }
            });
        }
      },
      transaction(privKey) {
        var self = this
        self.pageLoading = true
        var self = this;
        if (typeof privKey == 'undefined' || privKey === null) {
          self.errors = ['Private key not found. Please try again.'];
        }

        let uri = '/api/tx/getRelayerTxHash';
        let data = {
          from: self.addFrom,
          to: self.addTo,
          value: self.sendAmount
        };

        axios['post'](uri, data)
          .then(response => {
            if (typeof response.data === 'object') {

              let hashSign = self.utilSign(response.data.data, response.data.hash, privKey, response.data.destinationAddress)

              let _uri = '/api/tx/webRelayTx'
              let _dataTx = {
                hash: hashSign
              }

              return axios['post'](_uri, _dataTx);
            }
          })
          .then(res => {
            if (typeof res.data === 'object') {
              self.txHash = res.data.txHash
              self.txHashLink = 'https://ropsten.etherscan.io/tx/'+self.txHash

              self.errors = [];
              self.password = null;
              self.sendToken = false;
              self.cfrPasspharse = false;
              self.addTo = null;
              self.sendAmount = null;
              self.txsSuccess = true;

              self.pageLoading = false
            }
          })
          .catch(error => {

            console.log(error)

            self.pageLoading = false;
            self.submitted = false;
            self.sendToken = true;
            self.cfrPasspharse = false;
            if (typeof error.res.data === 'object') {
                self.errors = _.flatten(_.toArray(error.res.data));
            } else {
                self.errors = ['Something went wrong. Please try again.'];
            }
          });
      },
      utilSign(data, hash, privKey, destinationAddress) {
        let sig = utils.ecsign(new Buffer(utils.stripHexPrefix(hash), 'hex'), new Buffer(privKey, 'hex'))

        let retVal = {}
        retVal.r = '0x' + sig.r.toString('hex')
        retVal.s = '0x' + sig.s.toString('hex')
        retVal.v = sig.v //Q: Why is this not converted to hex?
        retVal.data = data
        retVal.hash = hash
        retVal.dest = destinationAddress
        return retVal
      }
    } //end methods
  }
</script>

<style>

</style>