<template>
  <div class="send-transaction-box">
    <h4 class="text-center">Send Transaction</h4>
    
    <div class="alert alert-success" v-if="txsSuccess">
      <p class="mb-0"><strong>Well done!</strong> Your transaction is successfully.</p>
      <p class="mb-0 word-break-all"><strong>Txhash: </strong> <a v-bind:href="txHashLink" target="_blank">{{ txHash }}</a></p>
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
        <input type="text" class="form-control" name="addFrom" id="addFrom" placeholder="Send from address" readonly="readonly" v-bind:value="addFromNanj">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" name="addTo" id="addTo" placeholder="Send to address" v-model="addTo">
      </div>
      <div class="form-group">
        <input type="number" class="form-control" name="sendAmount" id="sendAmount" placeholder="Amount" v-model="sendAmount">
      </div>
      <div class="form-group">
        <textarea class="form-control" name="message" id="message" v-model="message" placeholder="Message"></textarea>
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
  import assign from 'object-assign'
  import nanj from  'nanj-web-api-sdk'

  export default {
    data() {
      let keyJson = localStorage.getItem('nanjKeystore')
      keyJson = JSON.parse(keyJson)
      return {
        errors: [],
        password: null,
        sendToken: true,
        cfrPasspharse: false,
        addFromNanj: localStorage.getItem("nanjAddress"),
        addFrom: '0x'+keyJson.address,
        addTo: null,
        sendAmount: null,
        message: null,
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

        var nanjTrans = nanj.transaction;

        nanjTrans.getRelayerTxHash(self.addFrom, self.addTo, self.sendAmount, self.message).then(function(txHash) {
            let data = txHash.data
            let hash = txHash.hash
            let destinationAddress = txHash.destinationAddress

            let dataHash = nanjTrans.getHashSign(data, hash, privKey, destinationAddress)

            nanjTrans.send(dataHash).then(function(response) {
              if ((typeof response != 'undefined') && (response.statusCode == 200)) {
                self.txHash = response.txHash
                self.txHashLink = self.$root.HTTP_TX+'/tx/'+self.txHash

                self.errors = [];
                self.password = null;
                self.sendToken = false;
                self.cfrPasspharse = false;
                self.addTo = null;
                self.message = null;
                self.sendAmount = null;
                self.txsSuccess = true;

                self.pageLoading = false
              } else {
                console.log(response)
                self.transactionError();
              }
            }, function(err) {
              self.transactionError();
            })
            
          }, function(err) {
            self.transactionError();
          })

      },
      transactionError() {
        this.pageLoading = false;
        this.submitted = false;
        this.sendToken = true;
        this.cfrPasspharse = false;
        this.errors = ['Transaction went wrong. Please try again.'];
      }
    } //end methods
  }
</script>

<style>
  .send-transaction-box {
    padding: 15px;
  }
  .alert-danger {
    text-align: left;
  }
  .word-break-all {
    word-break: break-all;
  }
</style>