use anchor_lang::prelude::*;

declare_id!("5Dy4o72t49Mvv9nQbajT8EhLuyfXafAzQcANnEDczZMS");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: u64,
    pub topics: String,
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
