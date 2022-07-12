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
