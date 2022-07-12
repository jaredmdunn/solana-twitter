import * as anchor from "@project-serum/anchor";
import { AnchorError, Program } from "@project-serum/anchor";
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

  it('can send a new tweet without a topic', async () => {
    const tweet = anchor.web3.Keypair.generate();

    await program.methods.sendTweet('', 'gm').accounts({
      tweet: tweet.publicKey, // tweet account public key
      author: program.provider.publicKey, // author account public key
      systemProgram: anchor.web3.SystemProgram.programId, // system program id
    }).signers([tweet]).rpc();

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    console.log(tweetAccount);

    assert.equal(tweetAccount.author.toBase58(), program.provider.publicKey.toBase58());
    assert.equal(tweetAccount.topic, '');
    assert.equal(tweetAccount.content, 'gm');
    assert.ok(tweetAccount.timestamp);

  });

  it('can send a new tweet without a topic', async () => {
    // set up otherUser account
    const otherUser = anchor.web3.Keypair.generate();
    // request money for other user
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    // confirm transaction to give money to other user
    // TODO: figure out what is current syntax
    await program.provider.connection.confirmTransaction(signature);

    // set up tweet account
    const tweet = anchor.web3.Keypair.generate();

    await program.methods.sendTweet('moonshot', 'Other users can tweet too!').accounts({
      tweet: tweet.publicKey, // tweet account public key
      author: otherUser.publicKey, // other user account public key
      systemProgram: anchor.web3.SystemProgram.programId, // system program id
    }).signers([otherUser, tweet]).rpc();

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    console.log(tweetAccount);

    assert.equal(tweetAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(tweetAccount.topic, 'moonshot');
    assert.equal(tweetAccount.content, 'Other users can tweet too!');
    assert.ok(tweetAccount.timestamp);

  });

  it('cannot provide a topic with more than 50 characters', async () => {
    try {
      // set up tweet account
      const tweet = anchor.web3.Keypair.generate();

      const topicWith51Chars: string = 'x'.repeat(51);

      await program.methods.sendTweet(topicWith51Chars, 'Topic too long').accounts({
        tweet: tweet.publicKey, // tweet account public key
        author: program.provider.publicKey, // other user account public key
        systemProgram: anchor.web3.SystemProgram.programId, // system program id
      }).signers([tweet]).rpc();

    } catch (error) {
      if (error instanceof AnchorError) {
        assert.equal(error.error.errorMessage, 'The provided topic should be 50 characters long maximum.');
      } else {
        assert.fail("The error was the wrong type.")
      }

      return;
    }

    assert.fail("The instruction should fail with a 51 char topic.")

  });

  it('cannot provide content with more than 280 characters', async () => {
    try {
      // set up tweet account
      const tweet = anchor.web3.Keypair.generate();

      const contentWith281Chars: string = 'x'.repeat(281);

      await program.methods.sendTweet('Content too long', contentWith281Chars).accounts({
        tweet: tweet.publicKey, // tweet account public key
        author: program.provider.publicKey, // other user account public key
        systemProgram: anchor.web3.SystemProgram.programId, // system program id
      }).signers([tweet]).rpc();

    } catch (error) {
      if (error instanceof AnchorError) {
        assert.equal(error.error.errorMessage, 'The provided content should be 280 characters long maximum.');
      } else {
        assert.fail("The error was the wrong type.")
      }

      return;
    }

    assert.fail("The instruction should fail with a 281 char content.")

  });

  it('can fetch all tweets', async () => {
    const tweets = await program.account.tweet.all();
    assert.equal(tweets.length, 3);
  })

  it('can filter tweets by author', async () => {
    const authorPublicKey = program.provider.publicKey
    const tweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: authorPublicKey.toBase58(),
        }
      }
    ]);

    assert.equal(tweetAccounts.length, 2);
    assert.ok(tweetAccounts.every(tweetAccount => {
      return tweetAccount.account.author.toBase58() === authorPublicKey.toBase58()
    }))
  });

});
