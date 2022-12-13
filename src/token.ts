import {
  TokenTransfer,
  DelegateChanged,
  DelegateVotesChanged,
  FounderAllocationsCleared,
  MintScheduled,
  MintUnscheduled,
  TokenOwnerUpdated,
} from "../generated/ManagerImpl/Token";

export function handleTokenTransfer(event: TokenTransfer): void {}
export function handleDelegateChanged(event: DelegateChanged): void {}
export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {}
export function handleFounderAllocationsCleared(
  event: FounderAllocationsCleared
): void {}
export function handleMintScheduled(event: MintScheduled): void {}
export function handleMintUnscheduled(event: MintUnscheduled): void {}
export function handleTokenOwnerUpdated(event: TokenOwnerUpdated): void {}
