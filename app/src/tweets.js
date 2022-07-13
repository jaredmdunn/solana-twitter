import { web3 } from '@project-serum/anchor';
import { useWorkspace } from "./workspace";

const preflightCommitment = 'processed';
const commitment = 'processed';

export const fetchTweets = async () => {
  const { program } = useWorkspace();
  const tweets = program.value.account.tweet.all();
  return tweets;
};

// 1. Define the sendTweet endpoint.
export const sendTweet = async (topic, content) => {
  const { wallet, program } = useWorkspace();

  // 2. Generate a new Keypair for our new tweet account.
  const tweet = web3.Keypair.generate();

  // 3. Send a "SendTweet" instruction with the right data and the right accounts.
  const response = await program.value.methods.sendTweet(topic, content).accounts({
    author: wallet.value.publicKey, // author account public key
    tweet: tweet.publicKey, // tweet account public key
    systemProgram: web3.SystemProgram.programId, // system program id
  }).signers([tweet]).rpc({ preflightCommitment, commitment });

  // 4. Fetch the newly created account from the blockchain.
  const tweetAccount = await program.value.account.tweet.fetch(tweet.publicKey, "recent");
  return tweetAccount;
};