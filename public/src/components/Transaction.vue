<template>
  <div>
    <h2 class="text-center">Transaction List</h2>
    
    <div class="accordion" id="accordionTransaction" v-if="transactions.length">
      <div class="card" v-for="(item, index) in transactions">
        <div class="card-header" v-bind:id="'heading-'+doMath(index)">
          <h5 class="mb-0">
            <template v-if="doMath(index) === 1">
              <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse-'+doMath(index)" aria-expanded="true" :aria-controls="'collapse-'+doMath(index)">
                {{ item.TxHash }}
              </button>
              <a v-bind:href="txHashLink(item.TxHash)" target="_blank" class="view-on-eth">View on Etherscan</a>
            </template>
            <template v-else>
              <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse-'+doMath(index)" aria-expanded="false" :aria-controls="'collapse-'+doMath(index)">
                {{ item.TxHash }}
              </button>
              <a v-bind:href="txHashLink(item.TxHash)" target="_blank" class="view-on-eth">View on Etherscan</a>
            </template>
          </h5>
        </div>
        <div v-bind:id="'collapse-'+doMath(index)" class="collapse" v-bind:class="{'show': doMath(index)===1}" :aria-labelledby="'heading-'+doMath(index)" data-parent="#accordionTransaction">
          <div class="card-body">
            <p>From: {{ item.from }}</p>
            <p>To: {{ item.to }}</p>
            <p>Amount: {{ item.value }}</p>
            <p>Message: {{ item.message }}</p>
            <p>Created At: {{ item.created_at }}</p>
          </div>
        </div>
      </div>
      <div class="transaction-more" v-if="is_loadmore">
        <div class="loader" v-show="load_loading"></div>
        <a href="" @click="loadMore($event)" class="btn btn-primary">Load more</a>
      </div>
    </div>

    <div class="accordion" v-if="!transactions.length && !pageLoading">
      <h6 class="text-center">Transaction not found.</h6>
    </div>

    <div class="page-loading" v-if="pageLoading"></div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import _ from 'lodash';
  import axios from 'axios';
  import nanj from 'nanjs';

  export default {
    data() {
      let keyJson = localStorage.getItem('nanjKeystore')
      keyJson = JSON.parse(keyJson)

      return {
        is_loadmore: true,
        load_loading: false,
        transactions: [],
        pageLoading: true,
        sender: '0x'+keyJson.address,
        nanjAddress: localStorage.getItem("nanjAddress"),
        transAdd: '',
        maxPage: 0,
        curPage: 0,
      }
    },
    mounted() {
      const self = this 
      let page = 1

      nanj.transaction.history(self.sender, page).then(response => {
        if (response.statusCode === 200) {
          const data = response.data
          if (data.total > 0) {
            self.transAdd = self.sender
            self.maxPage = parseInt(data.max_page)
            self.curPage = parseInt(data.page)
            self.transactions = data.items
            self.pageLoading = false
            self.checkLoadmore()
            return
          }

          if (self.nanjAddress.length) {
            nanj.transaction.history(self.nanjAddress, page).then(res => {
              const data = res.data 
              if (data.total > 0) {
                self.transAdd = self.nanjAddress
                self.maxPage = parseInt(data.max_page)
                self.curPage = parseInt(data.page)
                self.transactions = data.items
                self.pageLoading = false
                self.checkLoadmore()
                return
              }

              self.checkLoadmore()
              self.pageLoading = false
            })
          }
        }

        self.pageLoading = false
      }, function(err) {
        self.pageLoading = false
      })
    },
    methods: {
      doMath(index) {
        return index+1
      },
      txHashLink(hash) {
        return this.$root.HTTP_TX+'/tx/'+hash
      },
      checkLoadmore() {
        if (this.curPage == this.maxPage) {
          this.is_loadmore = false
        }
      },
      loadMore: function(event) {
        if (event) event.preventDefault();
        this.load_loading = true
        if (this.curPage == this.maxPage) {
          this.load_loading = false
          return
        }

        const self = this

        let getPage = parseInt(self.curPage)+1
        self.curPage = getPage

        nanj.transaction.history(self.transAdd, page).then(res => {
              const data = res.data 
              if (data.total > 0) {

                if (data.items.length) {
                  for (var k in data.items) { 
                    self.transactions.push(data.items[k]);
                  }
                }
                
                self.pageLoading = false
                self.getTxLink = self.sender
                self.checkLoadmore()
                this.load_loading = false
                return
              }

              self.checkLoadmore()
              self.pageLoading = false
              this.load_loading = false
            })
      }
    } //end methods
  }
</script>

<style>
  .card-header button, .card-header button:hover {color: #060C12;font-weight: 700;}
  .card-body {color: #172a3d}
  .page-item a {position: relative; display: block; padding: .5rem .75rem; margin-left: -1px; line-height: 1.25; color: #007bff; background-color: #fff; border: 1px solid #dee2e6; }
  .page-item a:focus {outline: none;}
  .page-item:first-child a {margin-left: 0; border-top-left-radius: .25rem; border-bottom-left-radius: .25rem; }
  .page-item:last-child a {border-top-right-radius: .25rem; border-bottom-right-radius: .25rem; }
  .navigation-box {text-align: center; margin-top: 15px;}
  nav.navigation {display: inline-block;width: auto;}
  .page-item.active a {z-index: 1; color: #fff; background-color: #007bff; border-color: #007bff; }
  .view-on-eth{color: #255987; font-size: 0.7em; float: right; margin-top: 10px; }
  .transaction-more {text-align: center; padding: 20px 0;}
</style>