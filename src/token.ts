import { BigInt } from "@graphprotocol/graph-ts";
import { Token, TokenContract } from "../generated/schema";
import {
  Transfer,
  DelegateChanged,
  // DelegateVotesChanged,
  FounderAllocationsCleared,
  MintScheduled,
  // MintUnscheduled,
  OwnerUpdated,
} from "../generated/templates/TokenContract/Token";
import {
  findOrCreateAccount,
  findOrCreateDelegation,
  findOrCreateToken,
  handleFoundersUpdated,
  handleNewFounderMint,
  handleTokenTotalSupply,
} from "../utils/helpers";

export function handleTokenTransfer(event: Transfer): void {
  const tokenContractAddr = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const newOwner = event.params.to.toHexString();

  let token = findOrCreateToken(tokenContractAddr, tokenId);
  token.owner = newOwner;
  token.save();
}

export function handleDelegateChanged(event: DelegateChanged): void {
  const tokenContractAddr = event.address.toHexString();
  const voterAddr = event.params.from.toHexString();
  const delegatedToAddr = event.params.to.toHexString();

  const delegatedToAccount = findOrCreateAccount(delegatedToAddr);

  let delegation = findOrCreateDelegation(tokenContractAddr, voterAddr, delegatedToAddr);
  delegation.delegatedTo = delegatedToAccount.id;
  delegation.save();
}

// TODO not sure if necessary
// export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
//   const tokenContractAddr = event.address.toHexString();
//   const delegate = event.params.delegate;
//   const newTotal = event.params.newTotalVotes;
//   const prev = event.params.prevTotalVotes;
// }

export function handleMintScheduled(event: MintScheduled): void {
  const tokenContractAddr = event.address.toHexString();
  const newFounderStruct = event.params.founder;

  handleNewFounderMint(newFounderStruct, tokenContractAddr);
  // handleTokenTotalSupply(tokenContractAddr);
}

// most daos havent upgraded to this version yet
export function handleFounderAllocationsCleared(event: FounderAllocationsCleared): void {
  const newFounders = event.params.newFounders;
  const tokenContractAddr = event.address.toHexString();

  let tokenContract = TokenContract.load(tokenContractAddr)!;
  handleFoundersUpdated(newFounders, tokenContract);
}

export function handleTokenOwnerUpdated(event: OwnerUpdated): void {
  const tokenContractAddr = event.address.toHexString();
  const newOwner = event.params.newOwner.toHexString();

  let tokenContract = TokenContract.load(tokenContractAddr)!;
  tokenContract.owner = newOwner;
  tokenContract.save();
}
