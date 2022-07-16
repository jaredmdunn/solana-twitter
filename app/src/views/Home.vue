<script setup>
import {ref, computed} from "vue";
import {fetchTweets, sendTweet} from "../tweets.js";
import {useWorkspace} from "@/workspace.js";

const {wallet} = useWorkspace();

const tweets = ref([]);
const loading = ref(true);

const topic = ref("");
const content = ref("");

fetchTweets().then(fetchedTweets => tweets.value = fetchedTweets).finally(() => loading.value = false);

const canTweet = computed(() => {
  return wallet && wallet.value && wallet.value.publicKey.toString() === "5bobMwjqaaydwBa3xSKLqLJjpZhJk11H3c8GtTcnsFca";
})

const send = async () => {
  const tweet = await sendTweet(topic.value, content.value);
  topic.value = "";
  content.value = "";
  tweets.value.push(tweet);
}

</script>


<template>
  <h1>Home</h1>
  <div v-if="loading">
    Tweets loading
  </div>
  <div v-else>
    <div class="flex flex-col" v-if="canTweet">
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
