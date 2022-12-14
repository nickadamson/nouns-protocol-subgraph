import { TokenContract } from "../generated/schema";
import {
  TokenTransfer,
  DelegateChanged,
  DelegateVotesChanged,
  FounderAllocationsCleared,
  MintScheduled,
  MintUnscheduled,
  TokenOwnerUpdated,
} from "../generated/templates/TokenContract/Token";
import { handleNewFounders } from "../utils/helpers";

export function handleTokenTransfer(event: TokenTransfer): void {}

export function handleDelegateChanged(event: DelegateChanged): void {}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {}

export function handleFounderAllocationsCleared(
  event: FounderAllocationsCleared
): void {
  const newFounders = event.params.newFounders;
  const tokenContractAddr = event.address.toHexString();

  let tokenContract = TokenContract.load(tokenContractAddr)!;
  handleNewFounders(newFounders, tokenContract);
}

export function handleMintScheduled(event: MintScheduled): void {}

export function handleMintUnscheduled(event: MintUnscheduled): void {}

export function handleTokenOwnerUpdated(event: TokenOwnerUpdated): void {
  const tokenContractAddr = event.address.toHexString();
  const newOwner = event.params.newOwner.toHexString();

  let tokenContract = TokenContract.load(tokenContractAddr)!;
  tokenContract.owner = newOwner;
  tokenContract.save();
}
