<template>
  <div>
    <h2 class="text-center">Transaction List</h2>
    
    <div class="accordion" id="accordionTransaction">
      <div class="card" v-for="(item, index) in transactions">
        <div class="card-header" v-bind:id="'heading-'+doMath(index)">
          <h5 class="mb-0">
          <template v-if="doMath(index) === 1">
            <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse-'+doMath(index)" aria-expanded="true" :aria-controls="'collapse-'+doMath(index)">
              {{ item.TxHash }}
            </button>
            <a v-bind:href="txHashLink(item.TxHash)" target="_blank">View etherscan</a>
          </template>
          <template v-else>
            <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse-'+doMath(index)" aria-expanded="false" :aria-controls="'collapse-'+doMath(index)">
              {{ item.TxHash }}
            </button>
            <a v-bind:href="txHashLink(item.TxHash)" target="_blank">View etherscan</a>
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

      <!-- <template>
        <div class="row">
          <div class="col-md-12 navigation-box">
            <nav aria-label="Page navigation example" class="navigation">
              <paginate v-model="page" :page-count="page" :container-class="pagination" :prev-text="prev" :next-text="next" :prev-class="'page-item'" :next-class="'page-item'" :page-class="'page-item'" :click-handler="pagiCallback" :active-class="'active'" :page-range="2"></paginate>
            </nav>
          </div>
        </div>
      </template> -->
      
    </div>

    <div class="page-loading" v-if="pageLoading"></div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import _ from 'lodash';
  import axios from 'axios';

  export default {
    data() {
      let keyJson = localStorage.getItem('nanjKeystore')
      keyJson = JSON.parse(keyJson)

      return {
        transactions: null,
        pageLoading: true,
        sender: '0x'+keyJson.address,
        nanjAddress: localStorage.getItem("nanjAddress"),
        page: 0,
        curPage: 0,
        getTxLink: '',
        pagination: 'pagination',
        prev: 'Previous',
        next: 'Next'
      }
    },
    mounted() {
      const self = this

      let page = 1
      let _urlSenderTrans = self.doURLGetTx(self.sender, page)
      let _urlNANJTrans = self.doURLGetTx(self.nanjAddress, page)

      const headers = { 'headers': { 'Client-ID': self.$root.CLIENT_ID, 'Secret-Key': self.$root.SECRET_KEY } }

      axios.get(_urlSenderTrans, headers).then(response => {
            const data = response.data.data
            if (data.total > 0) {
              self.page = data.max_page
              self.curPage = data.page
              let limit = data.limit

              self.transactions = data.items
              self.pageLoading = false
              self.getTxLink = self.sender
              return
            }

            axios.get(_urlNANJTrans, headers).then(res => {
              const data = res.data.data 
              if (data.total > 0) {
                self.page = data.max_page
                self.curPage = data.page
                let limit = data.limit

                self.transactions = data.items
                self.pageLoading = false
                self.getTxLink = self.nanjAddress
                return
              }
            })
          })
    },
    methods: {
      doMath(index) {
        return index+1
      },
      doURLGetTx(address, page) {
        return 'https://'+this.$root.NANJ_HOST+'/api/tx/list/'+address+'?limit=10&page='+page+'&order_by=desc'
      },
      txHashLink(hash) {
        return this.$root.HTTP_TX+'/tx/'+hash
      },
      pagiCallback: function(pageNum) {

        console.log('pageNum: '+pageNum)

        const self = this
        let _url = self.doURLGetTx(self.getTxLink, pageNum)
        const headers = { 'headers': { 'Client-ID': self.$root.CLIENT_ID, 'Secret-Key': self.$root.SECRET_KEY } }

        axios.get(_url, headers).then(res => {
              const data = res.data.data 
              if (data.total > 0) {
                self.page = data.max_page
                let currentPage = data.page
                let limit = data.limit

                self.transactions = data.items
                return
              }
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
</style>