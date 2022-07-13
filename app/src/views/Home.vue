<script setup>
import {ref} from "vue";
import {fetchTweets, sendTweet} from "../tweets.js";

const tweets = ref([]);
const loading = ref(true);

const topic = ref("");
const content = ref("");

fetchTweets().then(fetchedTweets => tweets.value = fetchedTweets).finally(() => loading.value = false);

const send = async () => {
  const tweet = await sendTweet(topic.value, content.value);
  console.log(tweet);
  topic.value = "";
  content.value = "";
}

</script>


<template>
  <h1>Home</h1>
  <div v-if="loading">
    Tweets loading
  </div>
  <div v-else>
    <div class="flex flex-col">
      <input id="topic" placeholder="topic" v-model="topic">
      <textarea id="content" placeholder="content" v-model="content"></textarea>
      <button @click="send">Submit</button>
    </div>
    Tweets loaded!
    <div v-for="tweet in tweets" :key="tweet.publicKey" class="m-10">
      <div>Author: {{tweet.account.author.toBase58()}}</div>
      <div>Topic: {{tweet.account.topic}}</div>
      <div>Content: {{tweet.account.content}}</div>
    </div>
  </div>
</template>
