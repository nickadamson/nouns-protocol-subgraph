import { BigInt } from "@graphprotocol/graph-ts";
import { Proposal, TreasuryContract, TreasuryTransaction } from "../generated/schema";
import {
  DelayUpdated,
  GracePeriodUpdated,
  TransactionScheduled,
  TransactionCanceled,
  TransactionExecuted,
  TreasuryOwnerUpdated,
} from "../generated/templates/TreasuryContract/Treasury";

export function handleDelayUpdated(event: DelayUpdated): void {
  const treasuryAddr = event.address.toHexString();

  let treasury = TreasuryContract.load(treasuryAddr)!;
  treasury.delay = event.params.newDelay;
  treasury.save();
}

export function handleGracePeriodUpdated(event: GracePeriodUpdated): void {
  const treasuryAddr = event.address.toHexString();

  let treasury = TreasuryContract.load(treasuryAddr)!;
  treasury.gracePeriod = event.params.newGracePeriod;
  treasury.save();
}

export function handleTransactionScheduled(event: TransactionScheduled): void {
  const txHash = event.transaction.hash;
  const proposalId = event.params.proposalId.toHexString();

  let proposal = Proposal.load(proposalId)!;
  proposal.status = "QUEUED";
  proposal.save();

  let newTx = new TreasuryTransaction(proposalId);
  newTx.status = "SCHEDULED";
  newTx.etaTimestamp = event.params.timestamp;
  newTx.proposal = proposalId;
  newTx.treasuryContract = event.address.toHexString();
  newTx.creationTxHash = txHash;
  newTx.save();
}

export function handleTransactionCanceled(event: TransactionCanceled): void {
  const proposalId = event.params.proposalId.toHexString();

  let proposal = Proposal.load(proposalId)!;
  proposal.status = "CANCELLED";
  proposal.save();

  let tx = TreasuryTransaction.load(proposalId)!;
  tx.status = "CANCELLED";
  tx.etaTimestamp = BigInt.fromI32(0);
  tx.save();
}

export function handleTransactionExecuted(event: TransactionExecuted): void {
  const txHash = event.transaction.hash;
  const proposalId = event.params.proposalId.toHexString();

  let proposal = Proposal.load(proposalId)!;
  proposal.status = "EXECUTED";
  proposal.save();

  let tx = TreasuryTransaction.load(proposalId)!;
  tx.status = "EXECUTED";
  tx.executedHash = txHash;
  tx.executedTimestamp = event.block.timestamp;
  tx.save();
}

export function handleTreasuryOwnerUpdated(event: TreasuryOwnerUpdated): void {
  const treasuryAddr = event.address.toHexString();
  const newOwner = event.params.newOwner.toHexString();

  let treasury = TreasuryContract.load(treasuryAddr)!;
  treasury.owner = newOwner;
  treasury.save();
}
