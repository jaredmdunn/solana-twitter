<script setup>
// import { useRoute } from 'vue-router';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { initWallet } from 'solana-wallets-vue';
import { WalletMultiButton } from 'solana-wallets-vue';
import { initWorkspace, useWorkspace } from "./workspace.js";

// const route = useRoute();

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
];

initWallet({ wallets, autoConnect: true });
initWorkspace();

const { wallet } = useWorkspace();


</script>

<template>
  <WalletMultiButton />

  <div v-if="wallet">
    Connected! {{ wallet.publicKey.toBase58() }}
    <router-view></router-view>
  </div>
  <div v-else>
    Connect your wallet!
  </div>


</template>