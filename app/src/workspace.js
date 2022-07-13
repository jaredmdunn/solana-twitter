import { computed } from 'vue';
import { useAnchorWallet } from 'solana-wallets-vue';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
// import idl from '../../target/idl/solana_twitter.json';
import idl from './idl/solana_twitter.json';
// import { IDL } from "./idl/solana_twitter";

const programID = new PublicKey(idl.metadata.address);
// const programID = new PublicKey(IDL.);
let workspace = null;

const clusterUrl = process.env.VUE_APP_CLUSTER_URL;
const preflightCommitment = 'processed';
const commitment = 'processed';

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection(clusterUrl, commitment);
  const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment, commitment }));
  const program = computed(() => new Program(idl, programID, provider.value));

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};