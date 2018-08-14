<template>
  <div>
    <h2 class="text-center" v-html="titlePage"></h2>
    
    <div class="alert alert-success" v-if="Object.keys(myWallet).length > 0">
      <p class="mb-0"><strong>Well done!</strong> You successfully import your wallet.</p>
      <br>
      <ul>
          <li><strong>Address: </strong>{{ myWallet.address }}</li>
          <!-- <li><strong>Public Key: </strong>{{ myWallet.publicKey }}</li> -->
          <li class="eye-txt-box">
            <strong>Private Key: </strong>
            <span class="txt-hide">***********************</span>
            <span class="txt-show">{{ myWallet.privateKey }}</span>
            <a href="" @click="seeText($event)" v-bind:class="{ '' : 'disable'}" class="eye-icon"></a>
          </li>
          <li class="mywalllet-json">
            <strong>Key Store: </strong><a v-bind:href="myWallet.keyStoreDownload" download="keyStore.json">Click to Download</a>
          </li>
      </ul>
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

    <form @submit.prevent v-if="Object.keys(myWallet).length <= 0">
      <div class="form-group">
        <input type="text" name="name" v-model="name" class="form-control" placeholder="Name">
        <p class="help-block">Default: {{ nameDef }}</p>
      </div>
      <div class="form-group">
        <input type="file" class="form-control" name="keystore" id="keystore" ref="keystoreFile" v-on:change="keystoreOnChange">
      </div>
      <div class="form-group">
        <input type="password" name="password" class="form-control" placeholder="Password" v-model="password">
      </div>
      <div class="form-group text-center">
        <button type="submit" class="btn btn-info" @click="importWallet" :disabled="submitted == 1">Submit</button>
      </div>
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
      let accounts = new Array()
      if (localStorage.getItem("accounts") !== null) {
        accounts = JSON.parse(localStorage.getItem("accounts"))
      }

      return {
        myWallet: {},
        errors: [],
        keystore: null,
        password: '',
        formData: new FormData(),
        titlePage: 'Import Wallet',
        submitted: false,
        name: '',
        nameDef: 'Account '+(accounts.length+1)
      }
    },
    methods: {
      validate() {
          this.errors = [];

          if(this.keystore) return true;
          if(!this.keystore) this.errors.push("The keystore is required.");
          return false;
      },
      keystoreOnChange(e) {
        this.keystore = true;
        e.preventDefault();
        var files = this.$refs.keystoreFile.files;
        if (this.formData.has('keystore')) {
          this.formData.delete('keystore');
        }
        this.formData.append('keystore', files[0]);
      },
      importWallet() {
        this.submitted = true;
        this.myWallet = {};
        var valid = this.validate();
        var self = this;
        if(valid) {
          let uri = '/api/wallet/import';
          if (self.formData.has('password')) {
            self.formData.delete('password');
          }
          self.formData.append('password', self.password);

          self.$root.pageLoading = true

          axios['post'](uri, self.formData)
            .then(response => {
              if (typeof response.data.data === 'object') {
                self.myWallet = response.data.data;
                let obj = self.myWallet.keyStore;
                let objStringify = JSON.stringify(obj)
                self.myWallet.keyStoreDownload = 'data:'+"text/json;charset=utf-8," + encodeURIComponent(objStringify);

                let accounts = new Array()
                if (localStorage.getItem("accounts") !== null) {
                  accounts = JSON.parse(localStorage.getItem("accounts"))

                  // remove old this account in accounts
                  let index = accounts.map(function(o) { return o.ethAddress; }).indexOf(self.myWallet.address.slice(2))
                  if (typeof accounts[index] != 'undefined')
                    accounts.splice(index, 1)
                }
                let account = {}
                account.name = self.name || self.nameDef
                account.ethAddress = self.myWallet.address.slice(2)
                account.keystore = objStringify
                account.nanj = self.myWallet.nanj
                accounts.push(account)
                localStorage.setItem('accounts', JSON.stringify(accounts))

                self.$parent.accounts = JSON.parse(localStorage.getItem("accounts"))
                self.$parent.accountActived = self.myWallet.address.slice(2)

                // set to localStore
                if (localStorage.getItem("nanjKeystore") !== null) {
                  localStorage.removeItem('nanjKeystore')
                }
                localStorage.setItem('nanjKeystore', objStringify)

                self.$root.keyStoreDownload = 'data:'+"text/json;charset=utf-8," + encodeURIComponent(objStringify)


                if (localStorage.getItem("nanjAddress") !== null) {
                  localStorage.removeItem('nanjAddress')
                }
                localStorage.setItem('nanjAddress', self.myWallet.nanj)

                self.formData = new FormData();
                self.$refs.keystoreFile.value = '';
                self.password = '';
                self.titlePage = 'Your wallet';
                self.is_account = true;

                self.$root.pageLoading = false
              }
            })
            .catch(error => {
              self.$root.pageLoading = false
              self.submitted = false;
              if (typeof error.response.data === 'object') {
                  self.errors = _.flatten(_.toArray(error.response.data));
              } else {
                  self.errors = ['Something went wrong. Please try again.'];
              }
            });
        } else {
          self.submitted = false;
        }
      },
      seeText(event) {
        if (event) event.preventDefault();
        $('.eye-txt-box').toggleClass('open');
      }
    } //end methods
  }
</script>

<style>
  .eye-txt-box {}
  .eye-txt-box .txt-hide {display: inline;}
  .eye-txt-box .txt-show {display: none;}
  .eye-txt-box.open .txt-hide {display: none;}
  .eye-txt-box.open .txt-show {display: inline;}
  .alert li {word-break: break-all;}
  .eye-icon {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABlklEQVQ4T73US8uPURQF8N/rkgGKZEC5fQC3JCNlQgZMJbmMZCJTEQNE5jJh5JLLWEIGZCJK+QTuMTAgxMC1VefoOJ73Hf17z+T07L3OOmuvvZ8zZsRrbMR8JpVwNjZjHRbgN97hEe7g81B1Qwrn4gj2YeY4lnzBeZzAhxbTE27AlaKo4n7hRflYxj82RfEO3K/glnAbLmN6c+NFHMLbEluIU9jTYL5jF64nVgnj1Q1Ma4CXsBvzsBNTkdh7XCi5Cv+BLfE2hEvwFHMasjRgMb7hScEk/RqrMQNvuvLj5coQpmObOvNfFZL9ONPlDpTYM8TTdt0M4QOs7xJREoVDhImdxXMs7c7dDuFaPCwetfmAP5WSq5KQrMEsvOxK/ohVtSlHcby7LV3bXrzNnnUNOXi15OqRn9iKW+3YnMPeAdKDRU1SaeDpjiwdzhhlfv/7lw/jWDc+tbvZF3UXZj4zUveGBrvGVpRfKnM1pSOon/E2FZ0sFvyFTfTa5EHYiOWYXx6HKHqMu/g6dNmkPl/jVDtxeOQK/wAHnU28KtDH5gAAAABJRU5ErkJggg==');
    width: 20px;
    height: 20px;
    background-size: cover;
    display: inline-block;
    margin-left: 10px;
  }
  .eye-txt-box.open .eye-icon {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAB2UlEQVQ4T83US6jNURQG8N9N5J0JhRKSx4Q8iiKRSKKLkAlCoZQJKVwkojwmhh5RBkqECXnLBOnmWV4DmXjEQKIrutLSOtqdnJPBGViz/3+t/a21vu/bu0mDo6nBeP4LwNUYiD34XL1hvQmHYyZGog+/t3mHBeiJDTjwL4ATsRuTi+JP6IaO+e8NhuJrPcBO2Id1+IbOeI2luI2DWJMAK3AM/bO+BT8iV1m5K85jKrZiQrFuM3ZkgzjzEGPRjnk4jcuYj7YA7JBg0zAXlxAr3sI23K9aazquYhieYzbO4AqaA3ALdiVYTBnxE9dxF5sLwIuYlZtF4xmZW4hTaAnANpxE8FKJ6ByklxFNRuEJ5mAvRhQFJ2KoALyZh0fjfRZsSqVLwMNYlUo/xtEUMWr64QEeBeAgtOIlgp8wayh8I8WJA2GPIenDtViM4Pw7euEaBmBcReVJKcaLVOtVAkSTiBBnJ7pgYxr6CwbjXA4Vw9wpb8p4nEWPFCn4WYa/mbh7enJ7bhTuuFf6sMJVb+zHksKjy3E8eVqEaBxKR+MQYj0+VgBq3eXgb0qQjDFp4nBCcPcMF3AET+tdvTJ3CCtzkvBbRJD+IW1WjfPnu95r0xdva56skWj4A/sLwQxjYa67PhQAAAAASUVORK5CYII=');
  }
</style>