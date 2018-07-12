<template>
  <div id="app">
    <div id="headerVideo">
        <div class="video">
            <video loop="true" muted="" playsinline="" autoplay="" src="https://nanjcoin.com/img/header_mov_01.mp4"></video>
        </div>  
    </div>

    <div class="container">
      <div class="row justify-content-center menu">
          <div class="col-10">
              <h1><img src="https://nanjcoin.com/img/header_img_01.png" alt="NANJ"><span>NANJCOIN</span></h1>
              <ul class="nav d-none d-md-block">
                  <li><a href="https://nanjcoin.com" target="_blank">ABOUT</a></li>
                  <li><a href="" @click="showCreateWalletForm($event)">Create Wallet</a></li>
                  <li><a href="" @click="showCreateWalletForm($event)">Import Wallet</a></li>
                  <li><a href="" @click="showCreateWalletForm($event)">Transaction</a></li>
              </ul>
          </div>
      </div>

      <div class="row" id="content-home">
          <div class="col-lg-12 fv">
              <div class="text">
                <h2><span>NANJ</span><span>COIN</span><span>SDK</span></h2>
              </div>
              <div class="image"><img src="https://nanjcoin.com/img/header_img_02.png" alt="NANJCOIN"></div>
          </div>
      </div>
    </div>

    <section class="content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8">
            <div class="create-wallet-form">
              <create-wallet></create-wallet>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
  import CreateWallet from './CreateWallet.vue';
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {CreateWallet},
    methods: {
      showCreateWalletForm(event) {
        if (event) event.preventDefault();
        $('#content-home').hide();
        $('.create-wallet-form').show();
      }
    }
  }
</script>
<style>
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    background-color: #f5f8fa;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    position: relative;
    background: #000000;
    color: #ffffff;
  }

  #headerVideo {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #headerVideo:after {
      content: "";
      display: block;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url(https://nanjcoin.com/img/headerVideo_bg_01.png) repeat left top;
      background-size: 2px 2px;
  }

  .video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .video video {
    width: 100%;
    height: auto;
  }

  .menu h1 {
    padding-top: 10px;
  }

  .menu h1 img {
    max-width: 44px;
  }

  .menu h1 span {
    font-family: 'Sarpanch', sans-serif;
    -webkit-transform: scaleY(0.75);
    transform: scaleY(0.75);
    -webkit-transform-origin: left top;
    transform-origin: left top;
    letter-spacing: 0.12em;
    display: inline-block;
    margin-left: 14px;
    font-size: 30px;
    line-height: 1em;
  }

  .nav {
    font-family: 'Sarpanch', sans-serif;
    -webkit-transform: scaleY(0.75);
    transform: scaleY(0.75);
    -webkit-transform-origin: left top;
    transform-origin: left top;
    letter-spacing: 0.12em;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 285px;
    top: 30px;
    font-size: 13px;
    line-height: 1.4em;
  }

  .nav li {
    display: inline-block;
    margin-right: 10px;
    list-style: none;
  }

  .nav li a {
    text-transform: uppercase;
    color: #fff;
  }

  .fv .text {
    position: absolute;
    left: 110px;
    top: 200px;
  }

  .fv .text h2 {
    font-family: 'Sarpanch', sans-serif;
    -webkit-transform: scaleY(0.75);
    transform: scaleY(0.75);
    -webkit-transform-origin: left top;
    transform-origin: left top;
    letter-spacing: 0.12em;
    margin: 0;
    font-size: 60px;
    line-height: 1em;
    margin-bottom: -20px;
  }

  .fv .text h2 span {
    display: inline-block;
    margin-right: 15px;
  }

  .fv .image {
    position: absolute;
    right: 80px;
    top: 55px;
  }

  .fv .image img {
    max-width: 402px;
  }

  section.content {
    padding: 40px 0;
  }
  section.content h2 {
    font-family: 'Sarpanch', sans-serif;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transform-origin: left top;
    transform-origin: left top;
    letter-spacing: 0.12em;
    margin-left: 14px;
    font-size: 28px;
    line-height: 1.5em;
  }
  .create-wallet-form {display: none;}
</style>