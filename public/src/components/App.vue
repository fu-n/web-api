<template>
  <div id="app">
    <div id="headerVideo">
        <div class="video">
            <video loop="true" muted="" playsinline="" autoplay="" src="https://nanjcoin.com/img/header_mov_01.mp4"></video>
        </div>  
    </div>

    <div class="container">
      <div class="row justify-content-center menu">
          <div class="col-11">
              <h1><a href=""><img src="https://nanjcoin.com/img/header_img_01.png" alt="NANJ"><span>NANJCOIN</span></a></h1>
              <ul class="nav d-none d-md-block">
                <li v-if="!this.$root.keyStoreDownload && this.$root.keyStoreDownload.length == 0"><a href="" @click="showCreateWalletForm($event)">Create Wallet</a></li>
                <li v-if="!this.$root.keyStoreDownload && this.$root.keyStoreDownload.length == 0"><a href="" @click="showImportWalletForm($event)">Import Wallet</a></li>
              </ul>
              
              <ul class="navbar-nav right-menu" v-if="this.$root.keyStoreDownload && this.$root.keyStoreDownload.length > 0">
                <li class="nav-item dropdown li-swicth-account">
                  <a id="navbarDropdown" class="nav-link dropdown-toggle swicth-account-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="swicth-account"></span></a> 
                  <div aria-labelledby="navbarDropdown" class="dropdown-menu dropdown-menu-right">
                    
                    <a href="" @click="showCreateWalletForm($event)" class="dropdown-item account">Create Wallet</a>
                    <a href="" @click="showImportWalletForm($event)" class="dropdown-item account">Import Wallet</a>
                  </div>
                </li>

                <li class="nav-item dropdown">
                  <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account <span class="caret"></span></a> 
                  <div aria-labelledby="navbarDropdown" class="dropdown-menu dropdown-menu-right">
                    <a v-bind:href="this.$root.keyStoreDownload" download="keyStore.json" class="dropdown-item account">Download Key Store File</a> 
                    <a href="" @click="myWallet($event)" class="dropdown-item account">Wallet Info</a>
                    <a href="" @click="makeTransaction($event)" class="dropdown-item account">Transaction</a>
                  </div>
                </li>
              </ul>
          </div>
      </div>

      <div class="row" id="content-home" v-if="is_home">
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
          <div class="col-11">
            <div v-if="is_create">
              <create-wallet></create-wallet>
            </div>
            <div v-if="is_import">
              <import-wallet></import-wallet>
            </div>
            <div v-if="is_trans">
              <transaction></transaction>
            </div>
            <div v-if="is_account">
              <my-account></my-account>
            </div>
          </div>
        </div>
      </div>
    </section> 

    <div class="page-loading" v-if="this.$root.pageLoading"></div>
    
  </div>
  <!-- /#app -->

</template>


<script>
  import CreateWallet from './CreateWallet.vue';
  import ImportWallet from './ImportWallet.vue';
  import Transaction from './Transaction.vue';
  import MyAccount from './MyAccount.vue';

  export default {
    name: 'app',
    props: ['show'],
    data() {
      return {
        is_home: true,
        is_create: false,
        is_import: false,
        is_trans: false,
        is_account: false
      }
    },
    components: {CreateWallet, ImportWallet, Transaction, MyAccount},
    methods: {
      close: function () {
        this.$emit('close');
      },
      showCreateWalletForm(event) {
        if (event) event.preventDefault();
        this.is_home = false;
        this.is_create = true;
        this.is_import = false;
        this.is_trans = false;
        this.is_account = false;
      },
      showImportWalletForm(event) {
        if (event) event.preventDefault();
        this.is_home = false;
        this.is_create = false;
        this.is_import = true;
        this.is_trans = false;
        this.is_account = false;
      },
      makeTransaction(event) {
        if (event) event.preventDefault();
        if (localStorage.getItem("nanjKeystore") === null) {
          this.$dialog.alert({title: 'Info', body: 'Please create or import your wallet!', buttonLabel: 'Yes'});
          return;
        }
        this.is_home = false;
        this.is_create = false;
        this.is_import = false;
        this.is_trans = true;
        this.is_account = false;
      },
      myWallet(event) {
        if (event) event.preventDefault();
        if (localStorage.getItem("nanjKeystore") === null) {
          this.$dialog.alert({title: 'Info', body: 'Please create or import your wallet!', buttonLabel: 'Yes'});
          return;
        }

        this.is_home = false;
        this.is_create = false;
        this.is_import = false;
        this.is_trans = false;
        this.is_account = true;
      }
    },
    mounted: function () {
      document.addEventListener("keydown", (e) => {
        if (this.show && e.keyCode == 27) {
          this.close();
        }
      });
    }
  }
</script>
<style>
  html, body {width: 100%; height: 100%; } body {background-color: #f5f8fa; }
  .loader {border: 4px solid #f3f3f3; border-top: 4px solid #0E1E2D; border-radius: 50%; width: 20px; height: 20px; animation: spin 2s linear infinite; margin: 10px auto 10px auto}
  #app {position: relative; width: 100%; height: 100%; position: relative; background: #000000; color: #ffffff; }
  #headerVideo {display: block; position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden; }
  #headerVideo:after {content: ""; display: block; position: relative; top: 0; left: 0; width: 100%; height: 100%; background: url(https://nanjcoin.com/img/headerVideo_bg_01.png) repeat left top; background-size: 2px 2px; }
  .video {width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
  .video video {width: 100%; height: auto; }
  .menu h1 {padding-top: 10px; }
  .menu h1 img {max-width: 44px; }
  .menu h1 span {font-family: 'Sarpanch', sans-serif; -webkit-transform: scaleY(0.75); transform: scaleY(0.75); -webkit-transform-origin: left top; transform-origin: left top; letter-spacing: 0.12em; display: inline-block; margin-left: 14px; font-size: 30px; line-height: 1em; color: #fff;}
  .nav {font-family: 'Sarpanch', sans-serif; -webkit-transform: scaleY(0.75); transform: scaleY(0.75); -webkit-transform-origin: left top; transform-origin: left top; letter-spacing: 0.12em; margin: 0; padding: 0; position: absolute; left: 285px; top: 30px; font-size: 13px; line-height: 1.4em; }
  .nav li {display: inline-block; margin-right: 10px; list-style: none; }
  .nav li a {text-transform: uppercase; color: #fff; }
  .fv .text {position: absolute; left: 110px; top: 200px; }
  .fv .text h2 {font-family: 'Sarpanch', sans-serif; -webkit-transform: scaleY(0.75); transform: scaleY(0.75); -webkit-transform-origin: left top; transform-origin: left top; letter-spacing: 0.12em; margin: 0; font-size: 60px; line-height: 1em; margin-bottom: -20px; }
  .fv .text h2 span {display: inline-block; margin-right: 15px; }
  .fv .image {position: absolute; right: 80px; top: 55px; z-index: 1;}
  .fv .image img {max-width: 402px; }
  section.content {padding: 40px 0; }
  section.content h2 {font-family: 'Sarpanch', sans-serif; -webkit-transform: scaleY(1); transform: scaleY(1); -webkit-transform-origin: left top; transform-origin: left top; letter-spacing: 0.12em; margin-left: 14px; font-size: 28px; line-height: 1.5em; }
  .create-wallet-form {display: none;}

  .nav-link.dropdown-toggle {display: inline-block; }
  .right-menu {font-family: 'Sarpanch', sans-serif; -webkit-transform: scaleY(0.75); transform: scaleY(0.75); -webkit-transform-origin: left top; transform-origin: left top; letter-spacing: 0.12em; margin: 0; padding: 0; position: absolute; right: 0; top: 30px; font-size: 13px; line-height: 1.4em; z-index: 99999}
  #navbarDropdown {font-size: 1em; color: #fff; text-transform: uppercase; padding: 0; }
  .dropdown-item.account {padding: 0.8rem 1.5rem; }
  .swicth-account-toggle:after {display: none;}
  .li-swicth-account {position: absolute; left: -40px; top: -15px;}
  .swicth-account{display: inline-block; background: url(/assets/images/switch_acc.svg) center center no-repeat transparent; height: 40px; width: 30px; }
  .swicth-account img{width: 100%;height: 100%;}
  .navbar-nav .dropdown-menu {z-index: 555;}
  .wave-dot span{transition: all 500ms ease; background: #4A72DA; box-shadow: 1px 2px 3px #999; height: 5px; width: 5px; display: inline-block; border-radius: 5px; animation: wave 2s ease  infinite; }
  .wave-dot span:nth-child(1){  animation-delay: 0; }
  .wave-dot span:nth-child(2){  animation-delay: 100ms; }
  .wave-dot span:nth-child(3){  animation-delay: 200ms; }
  .wave-dot span:nth-child(4){  animation-delay: 300ms; }
  @keyframes wave{0%, 40%, 100% {transform: translate(0, 0); background-color: #4A72DA; } 10% {transform: translate(0, -15px); background-color: red; } }
  @media only screen and (max-width: 768px) {
    #headerVideo, .fv .image, .menu h1 span {display: none;}
    #app {background: #3278AB}
    .fv .text {top: 100px;left: 50%; transform: translate(-50%);}
    .fv .text h2 {text-align: center;}
    .fv .text h2 span {margin-right: 0;}
    .page-loading:after {margin: 10px auto 10px -30px;}
    .card-header h5 { word-break: break-all;}
    .card-header h5 button {white-space: nowrap; height: 35px; overflow: hidden; text-overflow: ellipsis; display: block; width: 100%;} 
    section.content h2 {margin-left: 0}
    .view-on-eth {display: block; width: 100%; text-align: center;}
    .nanj-address {word-break: break-all;}
  }
</style>