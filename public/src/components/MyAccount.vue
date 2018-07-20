<template>
  <section>
    <div class="col-xs-12">
      <h2>Wallet Info</h2>
      <div class="qr-box">
        <div class="row">
          <div class="col-md-12">
            <p><strong>Your Address</strong></p>
            <qr-code :text="address" :size="size" :bg-color="bgColor" :color="fgColor" error-level="L"></qr-code>
            <p>{{address}}</p>
          </div>
          <!-- <div class="col-md-6">
            <p><strong>Private Key (unencrypted)</strong></p>
            <qr-code :text="address" :size="size" :bg-color="bgColor" :color="fgColor" error-level="L"></qr-code>
          </div> -->
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
  import $ from 'jquery';
  import _ from 'lodash';
  import lightwallet from 'eth-lightwallet';

  export default {
    data() {
      let keyJson = localStorage.getItem('nanjKeystore')
      keyJson = JSON.parse(keyJson)
      return {
        address: '0x'+keyJson.address,
        bgColor: "#FFFFFF",
        fgColor: "#000000",
        size: 256
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
</style>