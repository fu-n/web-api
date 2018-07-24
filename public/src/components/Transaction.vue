<template>
  <div>
    <h2 class="text-center">Transaction</h2>
    
    <div class="alert alert-success" v-if="txsSuccess">
      <p class="mb-0"><strong>Well done!</strong> Your transaction is successfully.</p>
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
  </div>
</template>

<script>
  import $ from 'jquery';
  import _ from 'lodash';
  import axios from 'axios';  
  import wallet from "./../wallet.js";

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
        submitted: false
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
          axios['post'](uri, data)
            .then(response => {
              if (typeof response.data.data === 'object') {
                self.transaction(response.data.data.privateKey);
              }
            })
            .catch(error => {
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
        var self = this;
        if (typeof privKey == 'undefined' || privKey === null) {
          self.errors = ['Private key not found. Please try again.'];
        }

        let uri = '/api/tx/relayTx';
        let data = {
          from: self.addFrom,
          to: self.addTo,
          value: self.sendAmount,
          privKey: privKey
        };

        axios['post'](uri, data)
          .then(response => {
            if (typeof response.data === 'object') {
              self.errors = [];
              self.password = null;
              self.sendToken = false;
              self.cfrPasspharse = false;
              self.addTo = null;
              self.sendAmount = null;
              self.txsSuccess = true;
            }
          })
          .catch(error => {
            self.submitted = false;
            if (typeof error.response.data === 'object') {
                self.errors = _.flatten(_.toArray(error.response.data));
            } else {
                self.errors = ['Something went wrong. Please try again.'];
            }
          });
      }
    } //end methods
  }
</script>

<style>

</style>