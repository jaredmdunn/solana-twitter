import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaTwitter } from "../target/types/solana_twitter";
import * as assert from "assert";

describe("solana-twitter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;

  it('can send a new tweet', async () => {
    const tweet = anchor.web3.Keypair.generate();

    // New syntax?
    await program.methods.sendTweet('moonshot', 'Making Solana Twitter!').accounts({
      tweet: tweet.publicKey, // tweet account public key
      author: program.provider.publicKey, // author account public key
      systemProgram: anchor.web3.SystemProgram.programId, // system program id
    }).signers([tweet]).rpc();

    // Old syntax?
    // await program.rpc.sendTweet('moonshot', 'Making Solana Twitter!', {
    //   accounts: {
    //     // Accounts here...
    //     tweet: tweet.publicKey, // tweet account public key
    //     author: program.provider.publicKey, // author account public key
    //     systemProgram: anchor.web3.SystemProgram.programId, // system program id
    //   },
    //   signers: [
    //     tweet
    //   ],
    // });

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    console.log(tweetAccount);

    assert.equal(tweetAccount.author.toBase58(), program.provider.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'moonshot');
    assert.equal(tweetAccount.content, 'Making Solana Twitter!');
    assert.ok(tweetAccount.timestamp);

  });
});
