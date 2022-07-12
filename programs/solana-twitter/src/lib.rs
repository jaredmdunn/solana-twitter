use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("5Dy4o72t49Mvv9nQbajT8EhLuyfXafAzQcANnEDczZMS");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn send_tweet(ctx: Context<SendTweet>, topic: String, content: String) -> Result<()> {
        // access tweet account
        let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet;
        // access author account
        let author: &Signer = &ctx.accounts.author;
        // get Rust Clock object to get current timestamp
        let clock: Clock = Clock::get().unwrap();

        // check that topic is less than 50 chars
        if topic.chars().count() > 50 {
            // might need `return Err(error!(ErrorCode::TopicTooLong));` instead
            return Err(ErrorCode::TopicTooLong.into());
        }

        // check that content is less than 280 chars
        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into());
        }

        // * dereferences author.key
        // set tweet author
        tweet.author = *author.key;
        // set tweet timestamp
        tweet.timestamp = clock.unix_timestamp;
        // set topic and content
        tweet.topic = topic;
        tweet.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

// discriminator stores the type (8 bytes)
const DISCRIMINATOR_LENGTH: usize = 8;
// public key has a max size of 32 bytes
const PUBLIC_KEY_LENGTH: usize = 32;
// timestamp is 64 bits (8 bytes)
const TIMESTAMP_LENGTH: usize = 8;
// Strings store their length at the beginning in 4 bytes
const STRING_LENGTH_PREFIX: usize = 4;
// A String is a Vector of unkown length --> topics can only be 50 characters long
// each char can be up to 4 bytes --> (50 x 4)
const MAX_TOPIC_LENGTH: usize = 50 * 4;
// Content can be 280 characters (280 * 4)
const MAX_CONTENT_LENGTH: usize = 280 * 4;

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH // discriminator 
        + PUBLIC_KEY_LENGTH // author
        + TIMESTAMP_LENGTH // timestampt
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // topic
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // content
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    // instruction on how to initialize tweet account
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    // author needs to be mutable because we will mutate the amount of money in the account
    #[account(mut)]
    pub author: Signer<'info>,
    // System variable ensures that system_program is official Solana System Program
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
