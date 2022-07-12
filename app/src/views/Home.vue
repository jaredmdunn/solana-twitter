<script setup>
import {ref} from "vue";
import {fetchTweets} from "../workspace.js";

const tweets = ref([]);
const loading = ref(true);

fetchTweets().then(fetchedTweets => tweets.value = fetchedTweets).finally(() => loading.value = false);

</script>


<template>
  <h1>Home</h1>
  <div v-if="loading">
    Tweets loading
  </div>
  <div v-else>
    Tweets loaded!
    <div v-for="tweet in tweets" :key="tweet.publicKey" class="m-10">
      <div>Author: {{tweet.account.author.toBase58()}}</div>
      <div>Topic: {{tweet.account.topic}}</div>
      <div>Content: {{tweet.account.content}}</div>
    </div>
  </div>
</template>
